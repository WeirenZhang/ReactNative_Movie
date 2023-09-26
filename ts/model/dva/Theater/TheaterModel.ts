import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { ITheater } from '@/model/Theater';
import { ITapbox } from '@/model/Theater';
import { ITheater_time } from '@/model/Theater';
import DOMParser from "advanced-html-parser";

const Theater_URL = '/theater_result.html/id=';

export interface ITheaterState {
  refreshing: boolean;
  theaterList: ITheater[];
}

export interface TheaterModel extends Model {
  namespace: 'theater';
  state: ITheaterState;
  reducers: {
    setState: Reducer<ITheaterState>;
  };
  effects: {
    onRefresh: Effect;
  };
}

const initialState: ITheaterState = {
  refreshing: true,
  theaterList: [],
};

const TheaterModel: TheaterModel = {
  namespace: 'theater',
  state: initialState,
  reducers: {
    setState(state = initialState, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *onRefresh({ payload }, { call, put }) {
      try {
        const itemList: ITheater[] = [];

        yield put({
          type: 'setState',
          payload: {
            refreshing: true,
            theaterList: itemList,
          },
        });

        const { data } = yield call(axios.get, Theater_URL + payload.id);
        if (data) {
          let doc = DOMParser.parse(data, {
            ignoreTags: ["script", "style", "head"],
            onlyBody: true
          });
          const data1 = doc.documentElement.querySelectorAll("ul.release_list > li");
          var area = Array.from(data1);
          for (let index = 0; index < area.length; index++) {

            const a = {} as ITheater;
            console.log(area[index].querySelector("div.theaterlist_name > a")?.textContent);
            a.theaterlist_name = area[index].querySelector("div.theaterlist_name > a")?.textContent!;

            console.log(area[index].querySelector("div.en > a")?.textContent);
            a.en = area[index].querySelector("div.en > a")?.textContent!;

            const str = area[index].querySelector("div.theaterlist_name > a")?.getAttribute("href")!;
            const id = str.split('-');
            console.log(id[id.length - 1]);
            a.id = id[id.length - 1];

            console.log(area[index].querySelector("div.release_foto > a > img")?.getAttribute("src"));
            a.release_foto = area[index].querySelector("div.release_foto > a > img")?.getAttribute("src")!;

            console.log(area[index].querySelector("div.release_info > div[class^='icon']")?.getAttribute('class'));
            a.icon = area[index].querySelector("div.release_info > div[class^='icon']")?.getAttribute('class')!;

            const data2 = area[index].querySelectorAll("div.tapbox > div");
            var level_name_box = Array.from(data2);
            const tapbox: ITapbox[] = [];
            for (let index1 = 0; index1 < level_name_box.length; index1++) {
              const b = {} as ITapbox;
              if (level_name_box[index1]?.textContent != "") {
                console.log(level_name_box[index1]?.textContent);
                b.name = level_name_box[index1]?.textContent!;
                tapbox.push(b);
              }
            }
            a.tapbox = tapbox;

            const data3 = area[index].querySelectorAll("ul.theater_time > li");
            var theater_times = Array.from(data3);
            const theater_time: ITheater_time[] = [];
            for (let index1 = 0; index1 < theater_times.length; index1++) {
              const b = {} as ITheater_time;
              if (theater_times[index1]?.textContent != "") {
                console.log(theater_times[index1]?.textContent);
                b.name = theater_times[index1]?.textContent!;
                theater_time.push(b);
              }
            }
            a.theater_time = theater_time;

            itemList.push(a);
          }

          //console.log('#####' + tabList.length);
          for (let index = 0; index < itemList.length; index++) {
            console.log('#' + itemList[index].id);
            console.log('#' + itemList[index].theaterlist_name);
            console.log('#' + itemList[index].en);
            console.log('#' + itemList[index].release_foto);
            console.log('#' + itemList[index].icon);
            for (let index1 = 0; index1 < itemList[index].tapbox.length; index1++) {
              console.log(' ##' + itemList[index].tapbox[index1].name);
            }
            for (let index1 = 0; index1 < itemList[index].theater_time.length; index1++) {
              console.log('  ###' + itemList[index].theater_time[index1].name);
            }
          }
        }

        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
            theaterList: itemList,
          },
        });
      } catch (error) {
        //Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
          },
        });
      }
    },
  },
};

export default TheaterModel;

import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { IArea } from '@/model/Area';
import { ITheater } from '@/model/Area';
import DOMParser from "advanced-html-parser";

const Area_URL = 'macros/s/AKfycbwwB2Ke85PFeQqt2P9BRZFOxWif6JI4_ImblPyfFlP-VTJLkJJ6sZkCMD4tPhF_g8yT/exec?type=Area';

export interface IAreaState {
  refreshing: boolean;
  theaterList: IArea[];
}

export interface AreaModel extends Model {
  namespace: 'area';
  state: IAreaState;
  reducers: {
    setState: Reducer<IAreaState>;
  };
  effects: {
    onRefresh: Effect;
  };
}

const initialState: IAreaState = {
  refreshing: true,
  theaterList: [],
};

const AreaModel: AreaModel = {
  namespace: 'area',
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
    *onRefresh(_, { call, put }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            refreshing: true,
          },
        });

        const itemList: IArea[] = [];
        const { data } = yield call(axios.get, Area_URL);
        /*
        if (data) {
          let doc = DOMParser.parse(data, {
            ignoreTags: ["script", "style", "head"],
            onlyBody: true
          });
          const data1 = doc.documentElement.querySelectorAll("div.theater_content");
          var area = Array.from(data1);
          for (let index = 0; index < area.length; index++) {

            const a = {} as IArea;
            console.log(area[index]?.getAttribute("data-area"));
            a.id = area[index]?.getAttribute("data-area");
            console.log(area[index].querySelector("div.theater_top")?.textContent);
            a.area = area[index].querySelector("div.theater_top")?.textContent!;
            const data2 = area[index].querySelectorAll("ul > li:not(.tab)");
            var theater = Array.from(data2);

            const itemList1: ITheater[] = [];
            for (let index1 = 0; index1 < theater.length; index1++) {
              const b = {} as ITheater;
              const str = theater[index1].querySelector("div.name > a")?.getAttribute("href")!;
              const id = str.split('=');
              console.log(id[id.length - 1]);
              b.id = id[id.length - 1];
              console.log(theater[index1].querySelector("div.name")?.textContent);
              b.name = theater[index1].querySelector("div.name")?.textContent!;
              console.log(theater[index1].querySelector("div.adds")?.textContent);
              b.adds = theater[index1].querySelector("div.adds")?.textContent!;
              console.log(theater[index1].querySelector("div.tel")?.textContent);
              b.tel = theater[index1].querySelector("div.tel")?.textContent!;
              itemList1.push(b);
            }
            a.data = itemList1;

            itemList.push(a);
          }
        }
        */
        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
            theaterList: data,
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

export default AreaModel;

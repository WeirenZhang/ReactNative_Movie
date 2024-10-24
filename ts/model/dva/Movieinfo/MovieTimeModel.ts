import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import { IMovieDateTab } from '@/model/MovieTime';
import DOMParser from "advanced-html-parser";

const MovieTime_URL = 'macros/s/AKfycbzNPN95_VIeYPTKF85yVS5oml_lUiVL0TUlQvuNj1krEUjUQFtBq_BY6eraap6zW2ZI/exec?type=MovieTime&movie_id=';

export interface IMovieTimeState {
  showLoading: boolean;
  tabList: IMovieDateTab[];
}

export interface MovieTimeModel extends Model {
  namespace: 'movieTime';
  state: IMovieTimeState;
  reducers: {
    setState: Reducer<IMovieTimeState>;
  };
  effects: {
    getTabList: Effect;
  };
}

const initialState: IMovieTimeState = {
  showLoading: true,
  tabList: [],
};

const MovieTimeModel: MovieTimeModel = {
  namespace: 'movieTime',
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
    *getTabList({ payload }, { call, put }) {
      try {

        yield put({
          type: 'setState',
          payload: {
            showLoading: true,
          },
        });

        const { data } = yield call(axios.get, MovieTime_URL + payload.id);

        /*
        const { view } = data;
        if (view) {
          //console.log('view ' + view);
 
          let doc = DOMParser.parse(view, {
            ignoreTags: ["script", "style", "head"],
            onlyBody: true
          });
 
          const area = doc.documentElement.querySelectorAll("div.area_timebox");
          var areaArr = Array.from(area);
          //console.log(areaArr.length);
          for (let index = 0; index < areaArr.length; index++) {
            var a = {} as IMovieTimeTab;
            //console.log(areaArr[index].querySelector("div.area_title")?.textContent);
            a.id = index;
            a.area = areaArr[index].querySelector("div.area_title")?.textContent!;
 
            var theater = areaArr[index].querySelectorAll("ul");
            var theaterArr = Array.from(theater);
 
            //console.log("theaterArr" + theaterArr.length);
            const resulList: IMovieTimeResult[] = [];
            for (let index1 = 0; index1 < theaterArr.length; index1++) {
              const b = {} as IMovieTimeResult;
              var str = theaterArr[index1].querySelector("li.adds > a")?.getAttribute("href")!;
              var id = str.split('=');
              //console.log(' ' + id[id.length - 1]);
              b.id = id[id.length - 1];
              //console.log(' ' + theaterArr[index1].querySelector("li.adds > a")?.textContent);
              b.theater = theaterArr[index1].querySelector("li.adds > a")?.textContent!;
              b.tel = theaterArr[index1].querySelector("li.adds > span")?.textContent!;
 
              var taps = theaterArr[index1].querySelectorAll("li.taps");
              var typesArr = Array.from(taps);
              //console.log("typeArr" + typeArr.length);
              const types: Types[] = [];
              for (let index2 = 0; index2 < typesArr.length; index2++) {
                const _types = {} as Types;
 
                var type1 = typesArr[index2].querySelectorAll("span");
                var typeArr = Array.from(type1!);
 
                const _itypes: ITypes[] = [];
                for (let index3 = 0; index3 < typeArr.length; index3++) {
                  const t = {} as ITypes;
                  //console.log('   ' + typeArr[index2]?.textContent);
                  if (typeArr[index3]?.textContent != "") {
                    t.type = typeArr[index3]?.textContent;
                    _itypes.push(t);
                  }
                }
 
                var times1 = typesArr[index2].querySelector(" ~ li");
                var time1 = times1?.querySelectorAll("label");
                var timeArr = Array.from(time1!);
 
                const _itimes: ITimes[] = [];
                for (let index3 = 0; index3 < timeArr.length; index3++) {
                  const t = {} as ITimes;
                  //console.log('   ' + timeArr[index2]?.textContent);
                  if (timeArr[index3]?.textContent != "") {
                    t.time = timeArr[index3]?.textContent;
                    _itimes.push(t);
                  }
                }
 
                _types.types = _itypes;
                _types.times = _itimes;
                types.push(_types);
              }
              b.types = types;
              resulList.push(b);
            }
            a.data = resulList;
            tabList.push(a);
          }
 
          //console.log('#####' + tabList.length);
          for (let index = 0; index < tabList.length; index++) {
            console.log('#######' + tabList[index].id);
            console.log(' #####' + tabList[index].area);
            for (let index1 = 0; index1 < tabList[index].data.length; index1++) {
              console.log('  ####' + tabList[index].data[index1].theater);
              console.log('  ####' + tabList[index].data[index1].tel);
              for (let index2 = 0; index2 < tabList[index].data[index1].types.length; index2++) {
                for (let index3 = 0; index3 < tabList[index].data[index1].types[index2].types.length; index3++) {
                  console.log('    ##' + tabList[index].data[index1].types[index2].types[index3].type);
                }
                for (let index3 = 0; index3 < tabList[index].data[index1].types[index2].times.length; index3++) {
                  console.log('    ##' + tabList[index].data[index1].types[index2].times[index3].time);
                }
              }
            }
          }
        }
        */
        yield put({
          type: 'setState',
          payload: {
            showLoading: false,
            tabList: data,
          },
        });
      } catch (error) {
        console.log('error');
        //Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            showLoading: false,
          },
        });
      }
    },
  },
};

export default MovieTimeModel;

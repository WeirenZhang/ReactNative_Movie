import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import { RefreshState } from 'react-native-refresh-list-view';
import { IReleaseList } from '@/model/ReleaseList';
import { RootState } from '@/model/dva/Models';
import Toast from 'react-native-root-toast';
import DOMParser from "advanced-html-parser";

export function FormatString(str: string, ...val: string[]): string {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}

export interface IMovieListModelState {
  dataList: IReleaseList[];
  refreshState: number;
  page: number;
}

export interface MovieListModel extends Model {
  namespace: 'movieList';
  state: IMovieListModelState;
  reducers: {
    setState: Reducer<IMovieListModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: IMovieListModelState = {
  dataList: [],
  refreshState: RefreshState.Idle,
  page: 1,
};

const MovieListModel: MovieListModel = {
  namespace: 'movieList',
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
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.HeaderRefreshing,
          },
        });

        const itemList: IReleaseList[] = [];
        const { data } = yield call(axios.get, FormatString("macros/s/AKfycbzNPN95_VIeYPTKF85yVS5oml_lUiVL0TUlQvuNj1krEUjUQFtBq_BY6eraap6zW2ZI/exec?type=MovieList&tab={0}&page={1}", payload.tab, "1"));
        /*
        if (data) {
          let doc = DOMParser.parse(data, {
            ignoreTags: ["script", "style", "head"],
            onlyBody: true
          });
          const attr = doc.documentElement.querySelectorAll("ul.release_list > li");
          var btnsArr = Array.from(attr);
          for (let index = 0; index < btnsArr.length; index++) {
            const a = {} as IReleaseList;
            console.log(btnsArr[index].querySelector("div.release_movie_name > a")?.textContent);
            a.release_movie_name = btnsArr[index].querySelector("div.release_movie_name > a")?.textContent!;

            const str = btnsArr[index].querySelector("div.release_movie_name > a")?.getAttribute("href")!;
            const id = str.split('-');
            console.log(id[id.length - 1]);
            a.id = id[id.length - 1];

            console.log(btnsArr[index].querySelector("div.en > a")?.textContent);
            a.en = btnsArr[index].querySelector("div.en > a")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_movie_time")?.textContent);
            a.release_movie_time = btnsArr[index].querySelector("div.release_movie_time")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src'));
            a.cover = btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src')!;
            itemList.push(a);
          }
        }
        */
        console.log(data.length);

        yield put({
          type: 'setState',
          payload: {
            dataList: data,
            page: 2,
            withRefresh: true,
            refreshState: RefreshState.Idle,
          },
        });

      } catch (error) {
        //Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.Failure,
          },
        });
      }
    },
    *onLoadMore({ payload }, { call, put, select }) {
      try {
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.FooterRefreshing,
          },
        });

        let originList = [];
        if (payload && !payload.withRefresh) {
          const { dataList } = yield select((state: RootState) => state.movieList);
          originList = dataList;
        }

        const itemList: IReleaseList[] = [];
        const { data } = yield call(axios.get, FormatString("macros/s/AKfycbzNPN95_VIeYPTKF85yVS5oml_lUiVL0TUlQvuNj1krEUjUQFtBq_BY6eraap6zW2ZI/exec?type=MovieList&tab={0}&page={1}", payload.tab, payload.page));
        /*
        if (data) {
          let doc = DOMParser.parse(data, {
            ignoreTags: ["script", "style", "head"],
            onlyBody: true
          });
          const attr = doc.documentElement.querySelectorAll("ul.release_list > li");
          var btnsArr = Array.from(attr);
          for (let index = 0; index < btnsArr.length; index++) {
            const a = {} as IReleaseList;
            console.log(btnsArr[index].querySelector("div.release_movie_name > a")?.textContent);
            a.release_movie_name = btnsArr[index].querySelector("div.release_movie_name > a")?.textContent!;

            const str = btnsArr[index].querySelector("div.release_movie_name > a")?.getAttribute("href")!;
            const id = str.split('-');
            console.log(id[id.length - 1]);
            a.id = id[id.length - 1];

            console.log(btnsArr[index].querySelector("div.en > a")?.textContent);
            a.en = btnsArr[index].querySelector("div.en > a")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_movie_time")?.textContent);
            a.release_movie_time = btnsArr[index].querySelector("div.release_movie_time")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src'));
            a.cover = btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src')!;
            itemList.push(a);
          }
        }
        */
        console.log(data.length);

        yield put({
          type: 'setState',
          payload: {
            dataList:
              payload && payload.withRefresh
                ? data
                : originList.concat(data),
            page: payload.page += 1,
            refreshState:
              data.length == 0
                ? RefreshState.NoMoreData
                : RefreshState.Idle,
          },
        });

      } catch (error) {
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.Failure,
          },
        });
      }
    },
  },
};

export default MovieListModel;

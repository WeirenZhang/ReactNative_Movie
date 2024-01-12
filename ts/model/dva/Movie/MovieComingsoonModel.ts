import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import { RefreshState } from 'react-native-refresh-list-view';
import { IReleaseList } from '@/model/ReleaseList';
import { RootState } from '@/model/dva/Models';
import Toast from 'react-native-root-toast';
import DOMParser from "advanced-html-parser";

const MovieComingsoon_URL = '/movie_comingsoon.html?page=';

export interface IMovieComingsoonModelState {
  dataList: IReleaseList[];
  refreshState: number;
  page: number;
}

export interface MovieComingsoonModel extends Model {
  namespace: 'movieComingsoon';
  state: IMovieComingsoonModelState;
  reducers: {
    setState: Reducer<IMovieComingsoonModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: IMovieComingsoonModelState = {
  dataList: [],
  refreshState: RefreshState.Idle,
  page: 1,
};

const MovieComingsoonModel: MovieComingsoonModel = {
  namespace: 'movieComingsoon',
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
            refreshState: RefreshState.HeaderRefreshing,
          },
        });

        const itemList: IReleaseList[] = [];
        const { data } = yield call(axios.get, MovieComingsoon_URL + 1);
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
            a.title = btnsArr[index].querySelector("div.release_movie_name > a")?.textContent!;

            const str = btnsArr[index].querySelector("div.release_movie_name > a")?.getAttribute("href")!;
            const id = str.split('-');
            console.log(id[id.length - 1]);
            a.id = id[id.length - 1];

            console.log(btnsArr[index].querySelector("div.en > a")?.textContent);
            a.en = btnsArr[index].querySelector("div.en > a")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_movie_time")?.textContent);
            a.release_movie_time = btnsArr[index].querySelector("div.release_movie_time")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src'));
            a.thumb = btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src')!;
            itemList.push(a);
          }
        }

        yield put({
          type: 'setState',
          payload: {
            dataList: itemList,
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
          const { dataList } = yield select((state: RootState) => state.movieComingsoon);
          originList = dataList;
        }

        const itemList: IReleaseList[] = [];
        const { data } = yield call(axios.get, MovieComingsoon_URL + payload.page);
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
            a.title = btnsArr[index].querySelector("div.release_movie_name > a")?.textContent!;

            const str = btnsArr[index].querySelector("div.release_movie_name > a")?.getAttribute("href")!;
            const id = str.split('-');
            console.log(id[id.length - 1]);
            a.id = id[id.length - 1];

            console.log(btnsArr[index].querySelector("div.en > a")?.textContent);
            a.en = btnsArr[index].querySelector("div.en > a")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_movie_time")?.textContent);
            a.release_movie_time = btnsArr[index].querySelector("div.release_movie_time")?.textContent!;
            console.log(btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src'));
            a.thumb = btnsArr[index].querySelector("div.release_foto img")?.getAttribute('data-src')!;
            itemList.push(a);
          }
        }

        console.log(itemList.length);

        yield put({
          type: 'setState',
          payload: {
            dataList:
              payload && payload.withRefresh
                ? itemList
                : originList.concat(itemList),
            page: payload.page += 1,
            refreshState:
              itemList.length == 0
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

export default MovieComingsoonModel;

import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { IMovieInfo } from '@/model/MovieInfo';
import DOMParser from "advanced-html-parser";

const MovieInfo_URL = 'macros/s/AKfycbzNPN95_VIeYPTKF85yVS5oml_lUiVL0TUlQvuNj1krEUjUQFtBq_BY6eraap6zW2ZI/exec?type=MovieInfo&movie_id=';

export interface IMovieInfoState {
    refreshing: boolean;
    movieInfo: IMovieInfo[];
}

export interface MovieInfoModel extends Model {
    namespace: 'movieInfo';
    state: IMovieInfoState;
    reducers: {
        setState: Reducer<IMovieInfoState>;
    };
    effects: {
        onRefresh: Effect;
    };
}

const initialState: IMovieInfoState = {
    refreshing: true,
    movieInfo: [],
};

const MovieInfoModel: MovieInfoModel = {
    namespace: 'movieInfo',
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
                const MovieInfo: IMovieInfo[] = [];
                yield put({
                    type: 'setState',
                    payload: {
                        refreshing: true,
                        movieInfo: MovieInfo,
                    },
                });

                const { data } = yield call(axios.get, MovieInfo_URL + payload.id);
                console.log(MovieInfo_URL + payload.id);
                /*
                if (data) {
                    let doc = DOMParser.parse(data, {
                        ignoreTags: ["script", "style", "head"],
                        onlyBody: true
                    });
                    const reg = /\s+/g;
                    console.log(doc.documentElement.querySelector("div.movie_intro_info_r > h1")?.textContent);
                    MovieInfo.h1 = doc.documentElement.querySelector("div.movie_intro_info_r > h1")?.textContent!;
                    console.log(doc.documentElement.querySelector("div.movie_intro_info_r > h3")?.textContent);
                    MovieInfo.h3 = doc.documentElement.querySelector("div.movie_intro_info_r > h3")?.textContent!;
                    console.log(doc.documentElement.querySelector("div.movie_intro_foto > img")?.getAttribute('src'));
                    MovieInfo.movie_intro_foto = doc.documentElement.querySelector("div.movie_intro_foto > img")?.getAttribute('src')!;
                    console.log(doc.documentElement.querySelector("div.movie_intro_info_r > div[class^='icon']")?.getAttribute('class'));
                    MovieInfo.icon = doc.documentElement.querySelector("div.movie_intro_info_r > div[class^='icon']")?.getAttribute('class')!;
                    console.log(doc.documentElement.querySelector("div.level_name_box")?.textContent);
                    MovieInfo.level_name_box = doc.documentElement.querySelector("div.level_name_box")?.textContent!;

                    const data1 = doc.documentElement.querySelectorAll("div.movie_intro_info_r > span");
                    var data2 = Array.from(data1);
                    for (let index = 0; index < data2.length; index++) {
                        if (index == 0) {
                            console.log(data2[index]?.textContent)
                            MovieInfo.release_movie_time = data2[index]?.textContent;
                        } else if (index == 1) {
                            console.log(data2[index]?.textContent)
                            MovieInfo.length = data2[index]?.textContent;
                        }
                    }

                    const data3 = doc.documentElement.querySelectorAll("span.movie_intro_list");
                    var data4 = Array.from(data3);
                    for (let index = 0; index < data4.length; index++) {
                        if (index == 0) {
                            console.log(data4[index]?.textContent)
                            const reg = /\s+/g;
                            MovieInfo.director = data4[index]?.textContent.replace('\n', '').replace(reg, "");
                        } else if (index == 1) {
                            console.log(data4[index]?.textContent)
                            MovieInfo.actor = data4[index]?.textContent.replace('\n', '').replace(reg, "");
                        }
                    }
                }
                */
                yield put({
                    type: 'setState',
                    payload: {
                        refreshing: false,
                        movieInfo: data,
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

export default MovieInfoModel;

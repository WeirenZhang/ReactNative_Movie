import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import { IVideoResult } from '@/model/VideoResult';
import DOMParser from "advanced-html-parser";

const VideoResult_URL = 'macros/s/AKfycbzNPN95_VIeYPTKF85yVS5oml_lUiVL0TUlQvuNj1krEUjUQFtBq_BY6eraap6zW2ZI/exec?type=Video&movie_id=';

export interface IVideoResultState {
    refreshing: boolean;
    videoResultList: IVideoResult[];
}

export interface VideoResultModel extends Model {
    namespace: 'videoResult';
    state: IVideoResultState;
    reducers: {
        setState: Reducer<IVideoResultState>;
    };
    effects: {
        onRefresh: Effect;
    };
}

const initialState: IVideoResultState = {
    refreshing: true,
    videoResultList: [],
};

const VideoResultModel: VideoResultModel = {
    namespace: 'videoResult',
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
                const itemList: IVideoResult[] = [];

                yield put({
                    type: 'setState',
                    payload: {
                        refreshing: true,
                        videoResultList: itemList,
                    },
                });

                const { data } = yield call(axios.get, VideoResult_URL + payload.id);
                console.log(VideoResult_URL + payload.id);
                /*
                if (data) {
                    let doc = DOMParser.parse(data, {
                        ignoreTags: ["script", "style", "head"],
                        onlyBody: true
                    });
                    const data1 = doc.documentElement.getElementsByClassName("l_box have_arbox _c");
                    var area = Array.from(data1);
                    for (let index = 0; index < area.length; index++) {
                        //console.log(area[index].querySelector("div.title")?.textContent);
                        if (area[index].querySelector("div.title")?.textContent.includes('預告')) {
                            console.log(area[index].querySelector("div.title")?.textContent);

                            const data2 = area[index].querySelectorAll("ul.trailer_list > li");
                            var VideoResult = Array.from(data2);

                            for (let index1 = 0; index1 < VideoResult.length; index1++) {
                                const a = {} as IVideoResult;
                                console.log(VideoResult[index1].querySelector("h2.text_truncate_2")?.textContent);
                                a.title = VideoResult[index1].querySelector("h2.text_truncate_2")?.textContent!;
                                console.log(VideoResult[index1].querySelector("a")?.getAttribute("href"));
                                a.href = VideoResult[index1].querySelector("a")?.getAttribute("href")!;
                                console.log(VideoResult[index1].querySelector("div.foto > img")?.getAttribute("data-src"));
                                a.cover = VideoResult[index1].querySelector("div.foto > img")?.getAttribute("data-src")!;
                                itemList.push(a);
                            }
                        }
                    }
                }
                */
                yield put({
                    type: 'setState',
                    payload: {
                        refreshing: false,
                        videoResultList: data,
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

export default VideoResultModel;

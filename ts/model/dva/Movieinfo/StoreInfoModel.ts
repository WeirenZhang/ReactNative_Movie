import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import DOMParser from "advanced-html-parser";

const StoreInfo_URL = '/movieinfo_main/';

export interface IStoreInfoState {
    refreshing: boolean;
    storeInfo: string | null;
}

export interface StoreInfoModel extends Model {
    namespace: 'storeInfo';
    state: IStoreInfoState;
    reducers: {
        setState: Reducer<IStoreInfoState>;
    };
    effects: {
        onRefresh: Effect;
    };
}

const initialState: IStoreInfoState = {
    refreshing: true,
    storeInfo: null,
};

const StoreInfoModel: StoreInfoModel = {
    namespace: 'storeInfo',
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
                var storeInfo = "";
                yield put({
                    type: 'setState',
                    payload: {
                        refreshing: true,
                        storeInfo: storeInfo,
                    },
                });

                const { data } = yield call(axios.get, StoreInfo_URL + payload.id);
                console.log(StoreInfo_URL + payload.id);
                if (data) {
                    let doc = DOMParser.parse(data, {
                        ignoreTags: ["script", "style", "head"],
                        onlyBody: true
                    });
                    const reg = /\s+/g;
                    console.log(doc.documentElement.querySelector("span#story")?.innerHTML);
                    storeInfo = doc.documentElement.querySelector("span#story")?.innerHTML.replace(reg, "").replace(/<br\/>/ig, "\n")!;
                }

                yield put({
                    type: 'setState',
                    payload: {
                        refreshing: false,
                        storeInfo: storeInfo,
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

export default StoreInfoModel;

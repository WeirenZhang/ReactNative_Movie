import { ITheater } from '@/model/Area';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Theater_HISTORY_KEY = 'Theater_history_key';

export default class TheaterHistoryDao {
  static updateTheaterHistory(
    item: ITheater,
    isAdd: boolean = true,
    callback?: Function | undefined | null,
  ) {
    AsyncStorage.getItem(Theater_HISTORY_KEY, (error, result) => {
      if (!error) {
        var state: String;
        let TheaterList: Array<ITheater> = [];
        if (result) {
          TheaterList = JSON.parse(result);
        }
        if (isAdd) {
          if (TheaterList.length === 0) {
            state = "1";
            TheaterList.push(item);
          } else {
            const index = TheaterList.findIndex(
              (TheaterItem: ITheater) => item.id === TheaterItem.id,
            );
            if (index === -1) {
              state = "1";
              TheaterList.push(item);
            } else {
              state = "0";
            }
          }
        } else {
          const index = TheaterList.findIndex(
            (TheaterItem: ITheater) => item.id === TheaterItem.id,
          );
          TheaterList.splice(index, 1);
        }
        AsyncStorage.setItem(
          Theater_HISTORY_KEY,
          JSON.stringify(TheaterList),
          (e) => {
            if (!e) {
              if (typeof callback === 'function') {
                callback(state);
              }
            }
          },
        );
      }
    });
  }

  static getTheaterHistoryList() {
    return new Promise<Array<ITheater>>((resolve, reject) => {
      AsyncStorage.getItem(
        Theater_HISTORY_KEY,
        (error, result) => {
          if (!error && result) {
            try {
              resolve(JSON.parse(result));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(error);
          }
        },
      );
    });
  }
}

import { IReleaseList } from '@/model/ReleaseList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Movie_HISTORY_KEY = 'Movie_history_key';

export default class MovieHistoryDao {
  static updateMovieHistory(
    item: IReleaseList,
    isAdd: boolean = true,
    callback?: Function | undefined | null,
  ) {
    AsyncStorage.getItem(Movie_HISTORY_KEY, (error, result) => {
      if (!error) {
        var state: String;
        let MovieList: Array<IReleaseList> = [];
        if (result) {
          MovieList = JSON.parse(result);
        }
        if (isAdd) {
          if (MovieList.length === 0) {
            state = "1";
            MovieList.push(item);
          } else {
            const index = MovieList.findIndex(
              (MovieItem: IReleaseList) => item.id === MovieItem.id,
            );
            if (index === -1) {
              state = "1";
              MovieList.push(item);
            } else {
              state = "0";
            }
          }
        } else {
          const index = MovieList.findIndex(
            (MovieItem: IReleaseList) => item.id === MovieItem.id,
          );
          MovieList.splice(index, 1);
        }
        AsyncStorage.setItem(
          Movie_HISTORY_KEY,
          JSON.stringify(MovieList),
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

  static getMovieHistoryList() {
    return new Promise<Array<IReleaseList>>((resolve, reject) => {
      AsyncStorage.getItem(
        Movie_HISTORY_KEY,
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

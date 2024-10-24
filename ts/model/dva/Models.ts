import movieList from './Movie/MovieListModel';
import area from './Theater/AreaModel';
import theater from './Theater/TheaterModel';
import videoResult from './Movieinfo/VideoResultModel';
import storeInfo from './Movieinfo/StoreInfoModel';
import movieInfo from './Movieinfo/MovieInfoModel';
import movieTime from './Movieinfo/MovieTimeModel';

//存储项目中每一个页面对应的数据仓库
const models = [
    movieList,
    area,
    theater,
    videoResult,
    storeInfo,
    movieInfo,
    movieTime,
];

//存储每一个页面所需的数据状态
export type RootState = {
    movieList: typeof movieList.state;
    area: typeof area.state;
    theater: typeof theater.state;
    videoResult: typeof videoResult.state;
    storeInfo: typeof storeInfo.state;
    movieInfo: typeof movieInfo.state;
    movieTime: typeof movieTime.state;
}

export default models;

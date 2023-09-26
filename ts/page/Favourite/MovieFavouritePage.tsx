import MovieHistoryDao from '@/dao/MovieHistoryDao';
import { IReleaseList } from '@/model/ReleaseList';
import { navigate } from '@/utils/Utils';
import React, { Component } from 'react';
import MovieFavouriteItem from '@/components/MovieFavouriteItem';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  LayoutAnimation,
  ListRenderItemInfo,
  StyleSheet,
  FlatList,
} from 'react-native';
import { EVENT_TYPE } from '@/event/Index';
import EmptyView from '@/components/common/EmptyView';

class MovieFavouritePage extends Component {
  subscription?: EmitterSubscription;
  state = {
    dataList: [],
  };

  componentDidMount() {
    this.loadData();
    this.subscription = DeviceEventEmitter.addListener(
      EVENT_TYPE.WATCH_VIDEO_TYPE,
      () => {
        this.loadData();
      },
    );
  }

  async loadData() {
    try {
      const list = await MovieHistoryDao.getMovieHistoryList();
      this.setState({
        dataList: list,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPress = (item: IReleaseList) => {
    navigate('TheaterResultPage', { item: item });
  };

  renderItem = ({ item }: ListRenderItemInfo<IReleaseList>) => {
    return <MovieFavouriteItem item={item} />
  };

  contentView = () => {
    if (this.state.dataList.length === 0) {
      return <EmptyView />;
    } else {
      return (
        <FlatList
          style={styles.container}
          data={this.state.dataList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          numColumns={1}
        />
      );
    }
  };

  keyExtractor = (item: IReleaseList) => {
    return item.id ? item.id : item.id;
  };

  removeItem = (item: IReleaseList) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    MovieHistoryDao.updateMovieHistory(item, false, () => {
      this.loadData();
    });
  };

  render() {
    return this.contentView();
  }

  componentWillUnmount() {
    this.subscription?.remove();
  }
}

export default MovieFavouritePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  title: {
    fontSize: 20,
  },
});

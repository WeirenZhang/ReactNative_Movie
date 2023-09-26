import TheaterHistoryDao from '@/dao/TheaterHistoryDao';
import { ITheater } from '@/model/Area';
import { navigate } from '@/utils/Utils';
import React, { Component } from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  LayoutAnimation,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  Alert,
} from 'react-native';
import { EVENT_TYPE } from '@/event/Index';
import EmptyView from '@/components/common/EmptyView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class TheaterFavouritePage extends Component {
  subscription?: EmitterSubscription;
  state = {
    dataList: [],
  };

  componentDidMount() {
    this.loadData();
    this.subscription = DeviceEventEmitter.addListener(
      EVENT_TYPE.WATCH_VIDEO_TYPE,
      () => {
        console.log('');
        this.loadData();
      },
    );
  }

  async loadData() {
    try {
      const list = await TheaterHistoryDao.getTheaterHistoryList();
      this.setState({
        dataList: list,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPress = (item: ITheater) => {
    navigate('TheaterResultPage', { item: item });
  };

  deleteTodo = (item: ITheater) => {
    Alert.alert("警告", "是否將 \"" + item.name + "\" 刪除", [{
      text: "Yes",
      onPress: () => TheaterHistoryDao.updateTheaterHistory(item, false, () => {
        this.loadData();
      }),
    },
    { text: "No" }])
  }

  renderItem = ({ item }: ListRenderItemInfo<ITheater>) => {
    return (
      <TouchableOpacity onPress={() => this.onPress(item)}>
        <View style={styles.container}>
          <View style={styles.headerDes}>
            <Text style={styles.name}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.adds}>
              {item.adds}
            </Text>
            <Text numberOfLines={1} style={styles.tel}>
              {item.tel}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.actionIcon, { backgroundColor: "red" }]}
            onPress={() => this.deleteTodo(item)}>
            <Icon
              name={'delete'}
              size={20}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  contentView = () => {
    if (this.state.dataList.length === 0) {
      return <EmptyView />;
    } else {
      return (
        <FlatList
          data={this.state.dataList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          numColumns={1}
        />
      );
    }
  };

  keyExtractor = (item: ITheater) => {
    return item.id ? item.id : item.id;
  };

  removeItem = (item: ITheater) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    TheaterHistoryDao.updateTheaterHistory(item, false, () => {
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

export default TheaterFavouritePage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  headerDes: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    flex: 1,
    color: '#434eae',
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
  },
  adds: {
    flex: 1,
    color: '#999',
    fontSize: 16,
    padding: 5,
  },
  tel: {
    flex: 1,
    color: '#999',
    fontSize: 16,
    padding: 5,
  },
  actionIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

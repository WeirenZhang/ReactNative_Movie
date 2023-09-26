import { IReleaseList } from '@/model/ReleaseList';
import { ReleaseListItemWidth, ReleaseListItemHeight, navigate, share } from '@/utils/Utils';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, DeviceEventEmitter } from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieHistoryDao from '@/dao/MovieHistoryDao';
import { EVENT_TYPE } from '@/event/Index';

interface IProps {
  item: IReleaseList;
}

function MovieFavouriteItem(props: IProps) {
  const onPress = (item: IReleaseList) => {
    navigate('MovieinfoMainTabs', { item: item });
  };

  const deleteTodo = (item: IReleaseList) => {
    Alert.alert("警告", "是否將 \"" + item.release_movie_name + "\" 刪除", [{
      text: "Yes",
      onPress: () => MovieHistoryDao.updateMovieHistory(item, false, () => {
        DeviceEventEmitter.emit(EVENT_TYPE.WATCH_VIDEO_TYPE, item);
      }),
    },
    { text: "No" }])
  }

  const { item } = props;
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <ProgressiveFastImage source={{ uri: item.cover }} style={styles.image} />
        <View style={styles.releaseInfo}>
          <Text style={styles.release_movie_name}>
            {item.release_movie_name}
          </Text>
          <Text style={styles.en}>
            {item.en}
          </Text>
          <Text style={styles.release_movie_time}>
            {item.release_movie_time}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.actionIcon, { backgroundColor: "red" }]}
          onPress={() => deleteTodo(item)}>
          <Icon
            name={'delete'}
            size={20}
            color='#fff'
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default MovieFavouriteItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: ReleaseListItemWidth,
    height: ReleaseListItemHeight,
  },
  releaseInfo: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  release_movie_name: {
    //backgroundColor: '#ff0000',
    flex: 1,
    fontSize: 16,
    color: '#434eae',
    fontWeight: 'bold',
  },
  en: {
    //backgroundColor: '#ffff00',
    flex: 1,
    color: '#434eae',
    fontSize: 14,
  },
  release_movie_time: {
    //backgroundColor: '#ff0000',
    flex: 8,
    fontSize: 14,
    textAlignVertical: 'bottom'
  },
  actionIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

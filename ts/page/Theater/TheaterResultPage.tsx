import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { ITheater, ITapbox, ITheater_time } from '@/model/Theater';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { navigate } from '@/utils/Utils';
import { IReleaseList } from '@/model/ReleaseList';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';
import EmptyView from '@/components/common/EmptyView';
import TheaterHistoryDao from '@/dao/TheaterHistoryDao';
import Icon from 'react-native-vector-icons/Octicons';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";

import { TheaterResultFotoWidth, TheaterResultFotoHeight, TheaterResultTapboxWidth, TheaterResultTheater_timeWidth } from '@/utils/Utils';
import FastImage from 'react-native-fast-image';

const REFRESH_TYPE = 'theater/onRefresh';

const mapStateToProps = ({ theater }: RootState) => {
  return {
    refreshing: theater.refreshing,
    theaterList: theater.theaterList,
  };
};

interface IProps {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, 'TheaterResultPage'>;
}

function TheaterResultPage(props: IProps) {

  const dispatch = useDispatch();
  const { refreshing, theaterList } = useSelector(mapStateToProps, shallowEqual);

  useEffect(() => {
    setOptionTitle();
  });

  const onPress = () => {
    TheaterHistoryDao.updateTheaterHistory(props.route.params.item, true, (callback: String) => {
      if (callback === '1') {
        Toast.show('加入我的最愛中');
      } else {
        Toast.show('已加入我的最愛');
      }
    });
  };

  const headerRight = () => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.headerRightContainer}>
          <Icon
            name={'heart'}
            size={25}
            style={styles.icon25}
          />
          <View style={styles.placeHolderContainer}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const setOptionTitle = () => {
    const { navigation, route } = props;
    navigation.setOptions({
      headerShown: true,
      headerRight: headerRight,
    });
  };

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.id,
      },
    });
  }, [dispatch, props.route.params.item.id]);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: REFRESH_TYPE,
        payload: {
          id: props.route.params.item.id,
        },
      });
    }, [dispatch, props.route.params.item.id])
  )

  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.id,
      },
    });
  };

  const keyExtractor = (item: ITheater) => {
    return item.id ? item.id : item.id;
  };

  const go2MovieinfoMainPage = (item: IReleaseList) => {
    props.navigation.push('MovieinfoMainTabs', { item: item });
    //navigate('MovieinfoMainTabs', { item: item });
  };

  const tapboxItem = (item: ITapbox) => {
    return (
      <Text style={styles.tapbox}>{item.name}</Text>
    );
  };

  const theatertimeItem = (item: ITheater_time) => {
    return (
      <Text style={styles.theatertime}>{item.name}</Text>
    );
  };

  const renderItem = ({ item }: { item: ITheater }) => {
    const item1 = {} as IReleaseList;
    item1.release_movie_name = item.theaterlist_name;
    item1.id = item.id;
    item1.en = item.en;
    item1.cover = item.release_foto;
    item1.release_movie_time = "";
    return (
      //<TouchableOpacity onPress={() => go2MovieinfoMainPage(item1)}>
      <TouchableOpacity onPress={() => go2MovieinfoMainPage(item1)}>
        <View style={styles.item}>
          <ProgressiveFastImage source={{ uri: item.release_foto }} style={styles.image} />
          <View style={styles.theaterlistInfo}>
            <Text style={styles.theaterlist_name}>
              {item.theaterlist_name}
            </Text>
            <Text style={styles.en}>
              {item.en}
            </Text>
            <FastImage source={{ uri: "https://s.yimg.com/cv/ae/movies/" + item.icon + ".png" }} style={styles.icon45} />
            <View style={styles.tapboxList}>{item.tapbox.map(tapboxItem)}</View>
            <View style={styles.theatertimeList}>{item.theater_time.map(theatertimeItem)}</View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (theaterList.length === 0 && !refreshing) {
    return <EmptyView />;
  } else {
    return (
      <FlatList
        data={theaterList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeHolderContainer: {
    width: 15,
  },
  icon25: {
    width: 25,
    height: 25,
  },
  icon45: {
    marginTop: 10,
    width: 45,
    height: 45,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: TheaterResultFotoWidth,
    height: TheaterResultFotoHeight,
  },
  theaterlistInfo: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  theaterlist_name: {
    //backgroundColor: '#ff0000',
    fontSize: 16,
    color: '#434eae',
    fontWeight: 'bold',
  },
  en: {
    //backgroundColor: '#ffff00',
    marginTop: 5,
    color: '#434eae',
    fontSize: 14,
  },
  tapboxList: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tapbox: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#c840aa',
    color: '#fff',
    width: TheaterResultTapboxWidth,
    margin: 5,
    fontSize: 16,
  },
  theatertimeList: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  theatertime: {
    textAlign: 'center',
    padding: 5,
    //backgroundColor: '#ffff00',
    width: TheaterResultTheater_timeWidth,
    margin: 5,
    fontSize: 16,
  },
});

export default TheaterResultPage;

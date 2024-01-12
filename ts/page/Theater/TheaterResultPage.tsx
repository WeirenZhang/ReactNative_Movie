import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { ITheater } from '@/model/Theater';
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
import { data } from '@/model/MovieTime';

import { TheaterResultFotoWidth, TheaterResultFotoHeight, TheaterResultTapboxWidth, TheaterResultTheater_timeWidth } from '@/utils/Utils';
import FastImage from 'react-native-fast-image';
import { ITimes, ITypes, Types } from '@/model/MovieTime';
import { Dropdown } from 'react-native-element-dropdown';

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
  /*
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
  */
  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.id,
      },
    });
  };

  const [value, setValue] = useState<number>(0);
  const [isFocus, setIsFocus] = useState(false);

  const keyExtractor = (item: ITheater) => {
    return item.id ? item.id : item.id;
  };

  const go2MovieinfoMainPage = (item: IReleaseList) => {
    //props.navigation.push('MovieinfoMainTabs', { item: item });
    navigate('MovieinfoMainTabs', { item: item });
  };

  const typesText = (item: ITypes) => {
    return (
      <Text style={styles.type}>{item.type}</Text>
    );
  };

  const timesText = (item: ITimes) => {
    return (
      <Text style={styles.time}>{item.time}</Text>
    );
  };

  const typesItem = (item: Types) => {
    return (
      <View>
        <View style={styles.timesList}>{item.types.map(typesText)}</View>
        <View style={styles.timesList}>{item.times.map(timesText)}</View>
      </View>
    );
  };

  const renderItem = ({ item }: { item: ITheater }) => {
    const item1 = {} as IReleaseList;
    item1.title = item.theaterlist_name;
    item1.id = item.id;
    item1.en = item.en;
    item1.thumb = item.release_foto;
    item1.release_movie_time = "";
    return (
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
            <FastImage source={{ uri: item.icon }} style={styles.icon45} />
            <View style={styles.theatertimeList}>{item.types.map(typesItem)}</View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (theaterList.length === 0 && !refreshing || theaterList == null && !refreshing) {
    return <EmptyView />;
  } else {

    var data: data[] = [];
    for (let i = 0; i < theaterList.length; i++) {
      if (theaterList[i] != null) {
        var a = {} as data;
        a.label = theaterList[i].date;
        a.value = i;
        data.push(a);
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.dropdown_container}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? theaterList[value]?.date : theaterList[value]?.date}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              dispatch({
                type: 'setState'
              });
              setIsFocus(false);
            }}
          />
        </View>
        <FlatList
          data={theaterList[value]?.data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
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
  type: {
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#c840aa',
    color: '#fff',
    width: 100,
    margin: 5,
    fontSize: 16,
  },
  timesList: {
    //backgroundColor: '#fff',
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  time: {
    textAlign: 'center',
    padding: 5,
    //backgroundColor: '#ff0000',
    //width: TheaterResultTheater_timeWidth,
    margin: 5,
    fontSize: 16,
  },
  dropdown_container: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default TheaterResultPage;

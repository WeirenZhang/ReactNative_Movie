import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MovieinfoPage from '@/page/Movieinfo/MovieInfoPage';
import VideoResultPage from '@/page/Movieinfo/VideoResultPage';
import MovieTimeTabs from '@/navigator/MovieTimeTabs';
import StoreInfoPage from '@/page/Movieinfo/StoreInfoPage';

import { StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';
import Toast from 'react-native-root-toast';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MovieHistoryDao from '@/dao/MovieHistoryDao';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//定义底部导航器中各个页面，以及进入每个页面的参数类型
type BottomParamList = {
  MovieinfoPage: {
    id: string;
  };
  VideoResultPage: {
    id: string;
  };
  MovieTimeTabs: {
    id: string;
  };
  StoreInfoPage: {
    id: string;
  };
};

//定义底部路由属性
type Route = RouteProp<RootStackParamList, 'MovieinfoMainTabs'>;

interface IProps {
  navigation: RootNavigation;
  route: Route;
}

//创建底部导航器
const Tab = createBottomTabNavigator<BottomParamList>();

//hook方式
//注意点：1.不能使用this 2.
function MovieinfoMainTabs(props: IProps) {
  //组件渲染完后都会调用useEffect方法
  useEffect(() => {
    setOptionTitle();
  });

  const onPress = () => {
    console.log(' ' + props.route.params.item.thumb);
    console.log(' ' + props.route.params.item.en);
    console.log(' ' + props.route.params.item.id);
    console.log(' ' + props.route.params.item.title);
    console.log(' ' + props.route.params.item.release_movie_time);
    MovieHistoryDao.updateMovieHistory(props.route.params.item, true, (callback: String) => {
      if (callback === '1') {
        Toast.show('加入我的最愛中');
      } else {
        Toast.show('已加入我的最愛');
      }
    });
  };

  const createButtons = () => {
    return <Octicons
      name={'heart'}
      size={25}
      style={styles.icon}
    />
  }

  const headerRight = () => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.headerRightContainer}>
          {createButtons()}
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

  const { route } = props;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#9a9a9a',
      }}>
      <Tab.Screen
        name="MovieinfoPage"
        children={() =>
          <MovieinfoPage id={route.params.item.id} />
        }
        /*
        component={MovieinfoPage}
        initialParams={{
          id: route.params.item.id,
        }}
        */
        options={{
          tabBarLabel: '電影資料',
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'movie-open-star' : 'movie-open-star-outline'}
                size={25}
                style={styles.icon} />
            );
          },
        }}
      />
      <Tab.Screen
        name="StoreInfoPage"
        children={() =>
          <StoreInfoPage id={route.params.item.id} />
        }
        /*
        component={StoreInfoPage}
        initialParams={{
          id: route.params.item.id,
        }}
        */
        options={{
          tabBarLabel: '劇情簡介',
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'note-text' : 'note-text-outline'}
                size={25}
                style={styles.icon} />
            );
          },
        }}
      />
      <Tab.Screen
        name="MovieTimeTabs"
        children={() =>
          <MovieTimeTabs id={route.params.item.id} />
        }
        /*
        component={MovieTimeTabs}
        initialParams={{
          id: route.params.item.id,
        }}
        */
        options={{
          tabBarLabel: '播放時間',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'md-time' : 'md-time-outline'}
                size={25}
                style={styles.icon} />
            );
          },
        }}
      />
      <Tab.Screen
        name="VideoResultPage"
        children={() =>
          <VideoResultPage id={route.params.item.id} />
        }
        /*
        component={VideoResultPage}
        initialParams={{
          id: route.params.item.id,
        }}
        */
        options={{
          tabBarLabel: '預告片',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'ios-videocam' : 'ios-videocam-outline'}
                size={25}
                style={styles.icon} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeHolderContainer: {
    width: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default MovieinfoMainTabs;

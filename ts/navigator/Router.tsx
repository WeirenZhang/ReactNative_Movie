import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import HomePage from '@/page/HomePage';
import { Platform } from 'react-native';
import MovieComingsoonPage from '@/page/Movie/MovieComingsoonPage';
import MovieIntheatersPage from '@/page/Movie/MovieIntheatersPage';
import MovieThisweekPage from '@/page/Movie/MovieThisweekPage';
import MovieinfoMainTabs from '@/navigator/MovieinfoMainTabs';
import TheaterAreaPage from '@/page/Theater/TheaterAreaPage';
import TheaterListPage from '@/page/Theater/TheaterListPage';
import TheaterResultPage from '@/page/Theater/TheaterResultPage';
import MyFavouriteTabs from '@/navigator/MyFavouriteTabs';
import MovieFavouritePage from '@/page/Favourite/MovieFavouritePage';
import TheaterFavouritePage from '@/page/Favourite/TheaterFavouritePage';

import MovieInfoPage from '@/page/Movieinfo/MovieInfoPage';
import VideoResultPage from '@/page/Movieinfo/VideoResultPage';
import MovieTimeTabs from '@/navigator/MovieTimeTabs';
import StoreInfoPage from '@/page/Movieinfo/StoreInfoPage';

import WebViewPage from '@/page/WebViewPage';

import { navigationRef } from '@/utils/Utils';
import { IArea, ITheater } from '@/model/Area';
import { IMovieTimeTab, IMovieTimeResult } from '@/model/MovieTime';
import { IReleaseList } from '@/model/ReleaseList';
import MovieTimeResultPage from '@/page/Movieinfo/MovieTimeResultPage';

//定义堆栈路由参数每一个页面的名称以及进入页面传递参数的类型
export type RootStackParamList = {
  HomePage: undefined;
  MovieComingsoonPage: undefined;
  MovieIntheatersPage: undefined;
  MovieThisweekPage: undefined;
  MovieinfoMainTabs: {
    item: IReleaseList;
  };
  MovieInfoPage: {
    id: string;
  };
  VideoResultPage: {
    id: string;
  };
  MovieTimeTabs: {
    id: string;
  };
  MovieTimeResultPage: {
    items: IMovieTimeResult[];
  };
  StoreInfoPage: {
    id: string;
  };
  TheaterAreaPage: undefined;
  TheaterListPage: {
    item: IArea;
  };
  TheaterResultPage: {
    item: ITheater;
  };
  MyFavouriteTabs: undefined;
  MovieFavouritePage: undefined;
  TheaterFavouritePage: undefined;
  WebViewPage: {
    title: string;
    url: string;
  };
};

//导出堆栈导航器对于的Navigation，方便各个页面之间进行跳转
export type RootNavigation = StackNavigationProp<RootStackParamList>;

//创建堆栈导航器
const Stack = createStackNavigator<RootStackParamList>();

//配置堆栈路由页面
function RootStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: 0,
            },
            ios: {
              shadowOpacity: 0,
            },
          }),
        },
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: '#000',
        },
        headerTintColor: '#333',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ title: '電影時刻表' }} />
      <Stack.Screen
        name="MovieThisweekPage"
        component={MovieThisweekPage}
        options={{ title: '現正熱映' }} />
      <Stack.Screen
        name="MovieIntheatersPage"
        component={MovieIntheatersPage}
        options={{ title: '即將上映' }} />
      <Stack.Screen
        name="MovieComingsoonPage"
        component={MovieComingsoonPage}
        options={{ title: '即將上映' }} />
      <Stack.Screen
        name="MovieinfoMainTabs"
        component={MovieinfoMainTabs}
        options={({ route }) => ({ title: route.params.item.title })} />
      <Stack.Screen
        name="MovieInfoPage"
        component={MovieInfoPage} />
      <Stack.Screen
        name="StoreInfoPage"
        component={StoreInfoPage} />
      <Stack.Screen
        name="MovieTimeTabs"
        component={MovieTimeTabs} />
      <Stack.Screen
        name="MovieTimeResultPage"
        component={MovieTimeResultPage} />
      <Stack.Screen
        name="VideoResultPage"
        component={VideoResultPage} />
      <Stack.Screen
        name="TheaterAreaPage"
        component={TheaterAreaPage}
        options={{ title: '電影院' }} />
      <Stack.Screen
        name="TheaterListPage"
        component={TheaterListPage}
        options={({ route }) => ({ title: route.params.item.theater_top })} />
      <Stack.Screen
        name="TheaterResultPage"
        component={TheaterResultPage}
        options={({ route }) => ({ title: route.params.item.name })} />
      <Stack.Screen
        name="MyFavouriteTabs"
        component={MyFavouriteTabs}
        options={{ title: '我的最愛' }} />
      <Stack.Screen
        name="MovieFavouritePage"
        component={MovieFavouritePage} />
      <Stack.Screen
        name="TheaterFavouritePage"
        component={TheaterFavouritePage} />
      <Stack.Screen
        name="WebViewPage"
        component={WebViewPage}
        options={({ route }) => ({ title: route.params.title })} />
    </Stack.Navigator>
  );
}

//定义模态路由参数每一个页面的名称以及进入页面传递参数的类型
export type ModalStackParamList = {
  Root: undefined;
};

//导出模态路由导航参数，方便外界调用
export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

//创建模态路由导航
const ModalStack = createStackNavigator<ModalStackParamList>();

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}>
      <ModalStack.Screen name="Root" component={RootStackScreen} />
    </ModalStack.Navigator>
  );
}

class Router extends React.Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <ModalStackScreen />
      </NavigationContainer>
    );
  }
}

export default Router;

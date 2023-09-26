import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieFavouritePage from '@/page/Favourite/MovieFavouritePage';
import TheaterFavouritePage from '@/page/Favourite/TheaterFavouritePage';
import { StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//定义底部导航器中各个页面，以及进入每个页面的参数类型
type BottomParamList = {
  MovieFavouritePage: undefined;
  TheaterFavouritePage: undefined;
};

//定义底部路由属性
type Route = RouteProp<RootStackParamList, 'MyFavouriteTabs'>;

interface IProps {
  navigation: RootNavigation;
  route: Route;
}

//创建底部导航器
const Tab = createBottomTabNavigator<BottomParamList>();

//hook方式
//注意点：1.不能使用this 2.
function MyFavouriteTabs(props: IProps) {
  //组件渲染完后都会调用useEffect方法
  useEffect(() => {
    //setOptionTitle();
  });
  /*
  const onPress = () => {
    const {navigation} = props;
    navigation.navigate('SearchPage');
  };

  const headerRight = () => {
    const {route} = props;
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Daily';
    if (routeName === 'Daily') {
      return (
        <TouchableWithoutFeedback style={styles.headerRight} onPress={onPress}>
          <IconSearch />
        </TouchableWithoutFeedback>
      );
    } else {
      return null;
    }
  };

  const setOptionTitle = () => {
    const {navigation, route} = props;
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Daily';
    if (routeName === 'Mine') {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      let title;
      switch (routeName) {
        case 'Daily':
          title = '日报';
          break;
        case 'Discover':
          title = '发现';
          break;
        case 'Hot':
          title = '热门';
          break;
      }
      navigation.setOptions({
        headerShown: true,
        headerTitle: title,
        headerRight: headerRight,
      });
    }
  };
  */
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#9a9a9a',
      }}>
      <Tab.Screen
        name="MovieFavouritePage"
        component={MovieFavouritePage}
        options={{
          tabBarLabel: '電影',
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
        name="TheaterFavouritePage"
        component={TheaterFavouritePage}
        options={{
          tabBarLabel: '電影院',
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'film' : 'film-outline'}
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
  icon: {
    width: 24,
    height: 24,
  },
  headerRight: {
    paddingRight: 15,
  },
});

export default MyFavouriteTabs;

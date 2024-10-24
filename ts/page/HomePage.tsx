import {
  StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';
const { width, height, scale } = Dimensions.get('window');
const cols = 3;
const cellWH = 100;
const vMargin = (width - cellWH * cols) / (cols + 1);
const hMargin = 25;
import { IHome } from '@/model/Home';

const data = [
  {
    icon: require('@/assets/enl_2.png'),
    title: "本周新片",
    tab: "0"
  },
  {
    icon: require('@/assets/enl_1.png'),
    title: "本期首輪",
    tab: "1"
  },
  {
    icon: require('@/assets/enl_1.png'),
    title: "本期二輪",
    tab: "2"
  },
  {
    icon: require('@/assets/enl_4.png'),
    title: "近期上映",
    tab: "3"
  },
  {
    icon: require('@/assets/enl_4.png'),
    title: "新片快報",
    tab: "4"
  },
  {
    icon: require('@/assets/enl_5.png'),
    title: "電影院",
    tab: "5"
  },
  {
    icon: require('@/assets/enl_3.png'),
    title: "我的最愛",
    tab: "6"
  },
  {
    icon: require('@/assets/enl_6.png'),
    title: "網路訂票",
    tab: "7"
  }
]

//定义底部路由属性
type Route = RouteProp<RootStackParamList, 'HomePage'>;

interface IProps {
  navigation: RootNavigation;
  route: Route;
}

function HomePage(props: IProps) {

  const Item = ({ item, index }: { item: IHome; index: number }) => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(item)}>
        <View style={styles.innerViewStyle}>
          <Image source={data[index].icon} style={styles.iconStyle} />
          <Text style={{ marginTop: 4 }}>{item.title} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onPress = (ihome: IHome) => {
    console.log('点击了第' + ihome.tab + '个');
    const { navigation } = props;
    switch (ihome.tab) {
      case "0":
        navigation.navigate('MovieListPage', { item: ihome });
        break; /* 可选的 */
      case "1":
        navigation.navigate('MovieListPage', { item: ihome });
        break; /* 可选的 */
      case "2":
        navigation.navigate('MovieListPage', { item: ihome });
        break; /* 可选的 */
      case "3":
        navigation.navigate('MovieListPage', { item: ihome });
        break; /* 可选的 */
      case "4":
        navigation.navigate('MovieListPage', { item: ihome });
        break; /* 可选的 */
      case "5":
        navigation.navigate('TheaterAreaPage');
        break; /* 可选的 */
      case "6":
        navigation.navigate('MyFavouriteTabs');
        break; /* 可选的 */
      case "7":
        navigation.navigate('WebViewPage', { title: '網路訂票', url: 'https://www.ezding.com.tw/faq?comeFromApp=true&device=app' });
        break; /* 可选的 */
      /* 您可以有任意数量的 case 语句 */
      default: /* 可选的 */
    }
  };

  const keyExtractor = (item: IHome) => {
    return item.title;
  };

  const renderItem = ({ item, index }: { item: IHome; index: number }) => {
    return <Item item={item} index={index} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={3}
    />
  );
}

const styles = StyleSheet.create({
  iconStyle: { width: 80, height: 80, },
  innerViewStyle: {
    width: cellWH,
    height: cellWH,
    marginLeft: vMargin,
    marginTop: hMargin,
    alignItems: 'center',
  },
});

export default HomePage;

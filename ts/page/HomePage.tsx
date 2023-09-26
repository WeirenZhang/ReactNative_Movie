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
    title: "本週新片"
  },
  {
    icon: require('@/assets/enl_4.png'),
    title: "上映中"
  },
  {
    icon: require('@/assets/enl_1.png'),
    title: "即將上映"
  },
  {
    icon: require('@/assets/enl_5.png'),
    title: "電影院"
  },
  {
    icon: require('@/assets/enl_3.png'),
    title: "我的最愛"
  },
  {
    icon: require('@/assets/enl_6.png'),
    title: "網路訂票"
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
      <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(index)}>
        <View style={styles.innerViewStyle}>
          <Image source={data[index].icon} style={styles.iconStyle} />
          <Text style={{ marginTop: 4 }}>{item.title} </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onPress = (index: number) => {
    console.log('点击了第' + index + '个');
    const { navigation } = props;
    switch (index) {
      case 0:
        navigation.navigate('MovieThisweekPage');
        break; /* 可选的 */
      case 1:
        navigation.navigate('MovieIntheatersPage');
        break; /* 可选的 */
      case 2:
        navigation.navigate('MovieComingsoonPage');
        break; /* 可选的 */
      case 3:
        navigation.navigate('TheaterAreaPage');
        break; /* 可选的 */
      case 4:
        navigation.navigate('MyFavouriteTabs');
        break; /* 可选的 */
      case 5:
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

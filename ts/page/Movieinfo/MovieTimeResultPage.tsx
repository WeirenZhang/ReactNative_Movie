import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { navigate } from '@/utils/Utils';
import { IMovieTimeResult, ITypes, ITimes, Types } from '@/model/MovieTime';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ITheater } from '@/model/Area';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';

interface IProps {
  //navigation: RootNavigation;
  items: IMovieTimeResult[];
}

function MovieTimeResultPage(props: IProps) {

  const { items } = props;

  const keyExtractor = (item: IMovieTimeResult) => {
    return `${item.theater}`;
  };

  const go2TheaterResultPage = (item: IMovieTimeResult) => {
    const item1 = {} as ITheater;
    item1.id = item.id;
    item1.name = item.theater;
    navigate('TheaterResultPage', { item: item1 });
    //props.navigation.push('TheaterResultPage', { item: item1 });
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

  const renderItem = ({ item }: ListRenderItemInfo<IMovieTimeResult>) => {
    return <TouchableOpacity onPress={() => go2TheaterResultPage(item)}><View style={styles.item}>
      <Text style={styles.theater}>{item.theater}</Text>
      <View style={styles.typesList}>{item.types.map(typesItem)}</View>
    </View></TouchableOpacity>;
  };


  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  theater: {
    padding: 5,
    //backgroundColor: '#ff0000',
    fontSize: 16,
    color: '#434eae',
    fontWeight: 'bold',
  },
  typesList: {
    //backgroundColor: '#ffff00',
    marginTop: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
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
});

export default MovieTimeResultPage;

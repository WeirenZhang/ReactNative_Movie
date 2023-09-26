import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { navigate } from '@/utils/Utils';
import { RootStackParamList } from '@/navigator/Router';
import { IMovieTimeResult, ITypes, ITimes, Types } from '@/model/MovieTime';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ITheater } from '@/model/Area';

interface IProps {
  route: RouteProp<RootStackParamList, 'MovieTimeResultPage'>;
}

class MovieTimeResultPage extends React.Component<any> {

  constructor(props: IProps) {
    super(props);
  }

  keyExtractor = (item: IMovieTimeResult) => {
    return `${item.theater}`;
  };

  go2TheaterResultPage = (item: IMovieTimeResult) => {
    const item1 = {} as ITheater;
    item1.id = item.id;
    item1.name = item.theater;
    item1.tel = item.tel;
    //navigate('TheaterResultPage', { item: item1 });
    this.props.navigation.push('TheaterResultPage', { item: item1 });
  };

  typesText = (item: ITypes) => {
    return (
      <Text style={styles.type}>{item.type}</Text>
    );
  };

  timesText = (item: ITimes) => {
    return (
      <Text style={styles.time}>{item.time}</Text>
    );
  };

  typesItem = (item: Types) => {
    return (
      <View>
        <View style={styles.timesList}>{item.types.map(this.typesText)}</View>
        <View style={styles.timesList}>{item.times.map(this.timesText)}</View>
      </View>
    );
  };

  renderItem = ({ item }: ListRenderItemInfo<IMovieTimeResult>) => {
    return <TouchableOpacity onPress={() => this.go2TheaterResultPage(item)}><View style={styles.item}>
      <Text style={styles.theater}>{item.theater}</Text>
      <View style={styles.typesList}>{item.types.map(this.typesItem)}</View>
    </View></TouchableOpacity>;
  };

  render() {
    return (
      <FlatList
        data={this.props.route.params.item}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }
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

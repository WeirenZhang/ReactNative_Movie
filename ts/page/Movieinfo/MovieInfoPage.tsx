import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import {
  Text,
  StyleSheet,
  RefreshControl,
  View,
  FlatList,
} from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { RootStackParamList } from '@/navigator/Router';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { MovieIntroFotoWidth, MovieIntroFotoHeight } from '@/utils/Utils';
import FastImage from 'react-native-fast-image';
import { IMovieInfo } from '@/model/MovieInfo';
import EmptyView from '@/components/common/EmptyView';

const REFRESH_TYPE = 'movieInfo/onRefresh';
const CLEAR_TYPE = 'movieInfo/setState';

const mapStateToProps = ({ movieInfo }: RootState) => {
  return {
    refreshing: movieInfo.refreshing,
    movieInfo: movieInfo.movieInfo
  };
};

interface IProps {
  id: string;
}

function MovieInfoPage(props: IProps) {
  const dispatch = useDispatch();
  const { refreshing, movieInfo } = useSelector(mapStateToProps, shallowEqual);
  const { id } = props;

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: id,
      },
    });
  }, [dispatch, id]);
  /*
  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: REFRESH_TYPE,
        payload: {
          id: props.route.params.id,
        },
      });
    }, [dispatch, props.route.params.id])
  )
  */
  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: id,
      },
    });
  };

  const renderItem = ({ item, index }: { item: IMovieInfo; index: number }) => {
    return (
      <View style={styles.container}>
        <ProgressiveFastImage
          source={{ uri: item.movie_intro_foto }}
          style={styles.image} />
        <Text style={styles.title}>
          <Text>電影名稱</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{item.h1}</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{item.h3}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>電影分級</Text>
        </Text>
        <FastImage source={{ uri: item.icon }} style={styles.icon} />
        <Text style={styles.title}>
          <Text>上映日期</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{item.release_movie_time}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>電影長度</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{item.length}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>導演</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{item.director}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>演員</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{item.actor}</Text>
        </Text>
      </View>
    );
  };

  const keyExtractor = (item: IMovieInfo) => {
    return item.h1 ? item.h1 : item.h1;
  };

  if (movieInfo.length === 0 && !refreshing) {
    return <EmptyView />;
  } else {
    return (
      <FlatList
        data={movieInfo}
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
  image: {
    width: MovieIntroFotoWidth,
    height: MovieIntroFotoHeight,
  },
  icon: {
    margin: 10,
    width: 45,
    height: 45,
  },
  scrollView: {
    flexDirection: 'column',
  },
  title: {
    backgroundColor: "#333",
    color: '#fff',
    fontSize: 20,
    padding: 10,
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
});

export default MovieInfoPage;

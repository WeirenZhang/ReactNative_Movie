import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { RootStackParamList } from '@/navigator/Router';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { MovieIntroFotoWidth, MovieIntroFotoHeight } from '@/utils/Utils';
import FastImage from 'react-native-fast-image';

const REFRESH_TYPE = 'movieInfo/onRefresh';
const CLEAR_TYPE = 'movieInfo/setState';

const mapStateToProps = ({ movieInfo }: RootState) => {
  return {
    refreshing: movieInfo.refreshing,
    movieInfo: movieInfo.movieInfo
  };
};

interface IProps {
  route: RouteProp<RootStackParamList, 'MovieInfoPage'>;
}

function MovieInfoPage(props: IProps) {
  const dispatch = useDispatch();
  const { refreshing, movieInfo } = useSelector(mapStateToProps, shallowEqual);

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.id,
      },
    });
  }, [dispatch, props.route.params.id]);

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

  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.id,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProgressiveFastImage
          source={{ uri: movieInfo?.movie_intro_foto }}
          style={styles.image} />
        <Text style={styles.title}>
          <Text>電影名稱</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.h1}</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.h3}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>電影分級</Text>
        </Text>
        <FastImage source={{ uri: "https://s.yimg.com/cv/ae/movies/" + movieInfo?.icon + ".png" }} style={styles.icon} />
        <Text style={styles.title}>
          <Text>上映日期</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.release_movie_time}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>電影類型</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.level_name_box}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>電影長度</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.length}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>導演</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.director}</Text>
        </Text>
        <Text style={styles.title}>
          <Text>演員</Text>
        </Text>
        <Text style={styles.text}>
          <Text>{movieInfo?.actor}</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
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

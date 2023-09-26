import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { IVideoResult } from '@/model/VideoResult';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { RootStackParamList } from '@/navigator/Router';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { navigate } from '@/utils/Utils';
import EmptyView from '@/components/common/EmptyView';
import { VideoResultWidth, VideoResultHeight } from '@/utils/Utils';

const REFRESH_TYPE = 'videoResult/onRefresh';

const mapStateToProps = ({ videoResult }: RootState) => {
  return {
    refreshing: videoResult.refreshing,
    videoResultList: videoResult.videoResultList,
  };
};

interface IProps {
  route: RouteProp<RootStackParamList, 'VideoResultPage'>;
}

function VideoResultPage(props: IProps) {
  const dispatch = useDispatch();
  const { refreshing, videoResultList } = useSelector(mapStateToProps, shallowEqual);

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

  const keyExtractor = (item: IVideoResult) => {
    return item.href ? item.href : item.href;
  };

  const go2WebViewPage = (item: IVideoResult) => {
    navigate('WebViewPage', { title: item.title, url: item.href });
  };

  const renderItem = ({ item, index }: { item: IVideoResult; index: number }) => {
    return (
      <TouchableWithoutFeedback onPress={() => go2WebViewPage(item)}>
        <View style={styles.container}>
          <ProgressiveFastImage source={{ uri: item.cover }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  if (videoResultList.length === 0 && !refreshing) {
    return <EmptyView />;
  } else {
    return (
      <FlatList
        data={videoResultList}
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
    //backgroundColor: '#ff0000',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: VideoResultWidth,
    height: VideoResultHeight,
  },
  title: {
    flex: 1,
    color: '#434eae',
    fontSize: 16,
    textAlignVertical: 'center',
    padding: 10,
  },
});

export default VideoResultPage;

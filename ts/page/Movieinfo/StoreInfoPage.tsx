import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { IVideoResult } from '@/model/VideoResult';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import { RootStackParamList } from '@/navigator/Router';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { navigate } from '@/utils/Utils';

const REFRESH_TYPE = 'storeInfo/onRefresh';

const mapStateToProps = ({ storeInfo }: RootState) => {
  return {
    refreshing: storeInfo.refreshing,
    storeInfo: storeInfo.storeInfo,
  };
};

interface IProps {
  route: RouteProp<RootStackParamList, 'StoreInfoPage'>;
}

function StoreInfoPage(props: IProps) {
  const dispatch = useDispatch();
  const { refreshing, storeInfo } = useSelector(mapStateToProps, shallowEqual);

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
        <Text style={styles.text}>
          <Text>{storeInfo}</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    margin: 10,
  },
  text: {
    padding: 10,
    fontSize: 18,
  },
});

export default StoreInfoPage;

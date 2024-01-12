import React, { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { RootStackParamList } from '@/navigator/Router';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { IStoreInfo } from '@/model/StoreInfo';
import EmptyView from '@/components/common/EmptyView';

const REFRESH_TYPE = 'storeInfo/onRefresh';

const mapStateToProps = ({ storeInfo }: RootState) => {
  return {
    refreshing: storeInfo.refreshing,
    storeInfo: storeInfo.storeInfo,
  };
};

interface IProps {
  //route: RouteProp<RootStackParamList, 'StoreInfoPage'>;
  id: string;
}

function StoreInfoPage(props: IProps) {
  const dispatch = useDispatch();
  const { refreshing, storeInfo } = useSelector(mapStateToProps, shallowEqual);
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

  const renderItem = ({ item, index }: { item: IStoreInfo; index: number }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text>{item.storeInfo}</Text>
        </Text>
      </View>
    );
  };

  const keyExtractor = (item: IStoreInfo) => {
    return item.storeInfo ? item.storeInfo : item.storeInfo;
  };

  if (storeInfo.length === 0 && !refreshing) {
    return <EmptyView />;
  } else {
    return (
      <FlatList
        data={storeInfo}
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
  text: {
    padding: 20,
    fontSize: 18,
  },
});

export default StoreInfoPage;

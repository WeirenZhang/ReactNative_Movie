import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { IArea } from '@/model/Area';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import { navigate } from '@/utils/Utils';

const REFRESH_TYPE = 'area/onRefresh';

const mapStateToProps = ({ area }: RootState) => {
  return {
    refreshing: area.refreshing,
    theaterList: area.theaterList,
  };
};

function TheaterAreaPage() {
  const dispatch = useDispatch();
  const { refreshing, theaterList } = useSelector(mapStateToProps, shallowEqual);

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
    });
  }, [dispatch]);

  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
    });
  };

  const keyExtractor = (item: IArea) => {
    return item.theater_top ? item.theater_top : item.theater_top;
  };

  const go2TheaterListPage = (item: IArea) => {
    navigate('TheaterListPage', { item: item });
  };

  const renderItem = ({ item, index }: { item: IArea; index: number }) => {
    return (
      <TouchableWithoutFeedback onPress={() => go2TheaterListPage(item)}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.theater_top}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <FlatList
      style={styles.container}
      data={theaterList}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#434eae',
    padding: 5,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
  },
});

export default TheaterAreaPage;

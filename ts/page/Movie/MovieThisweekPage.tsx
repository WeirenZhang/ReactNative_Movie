import React, { useEffect } from 'react';
import { StyleSheet, View, ListRenderItemInfo } from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import ReleaseListItem from '@/components/ReleaseListItem';
import { RootState } from '@/model/dva/Models';
import { IReleaseList } from '@/model/ReleaseList';
//import BannerCarousel from '@/components/ BannerCarousel';
//import TitleItem from '@/components/TitleItem';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import EmptyView from '@/components/common/EmptyView';

const REFRESH_TYPE = 'movieThisweek/onRefresh';
const LOAD_MORE_TYPE = 'movieThisweek/onLoadMore';

const mapStateToProps = ({ movieThisweek }: RootState) => {
  return {
    dataList: movieThisweek.dataList,
    refreshState: movieThisweek.refreshState,
    page: movieThisweek.page,
  };
};

function MovieThisweekPage() {
  const dispatch = useDispatch();
  const { dataList, refreshState, page } = useSelector(
    mapStateToProps,
    shallowEqual,
  );

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
    });
  }, [dispatch]);

  const onHeaderRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
    });
  };

  const onFooterRefresh = () => {
    if (page == null) {
      return;
    }
    dispatch({
      type: LOAD_MORE_TYPE,
      payload: {
        page: page,
      },
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<IReleaseList>) => {
    return <ReleaseListItem item={item} />
  };

  const keyExtractor = (item: IReleaseList) => {
    return item.id ? item.id : item.id;
  };

  if (dataList.length === 0 && !refreshState) {
    return <EmptyView />;
  } else {
    return (
      <View style={styles.container}>
        <RefreshListView
          data={dataList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshState={refreshState}
          onHeaderRefresh={onHeaderRefresh}
          onFooterRefresh={onFooterRefresh}
          showsVerticalScrollIndicator={false}
          footerRefreshingText='數據加載中…'
          footerFailureText='點擊重新加載'
          footerNoMoreDataText='已加載全部數據'
          footerEmptyDataText='暫時沒有相關數據'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#fff',
  },
});

export default MovieThisweekPage;

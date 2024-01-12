import { IReleaseList } from '@/model/ReleaseList';
import { ReleaseListItemWidth, ReleaseListItemHeight, navigate, share } from '@/utils/Utils';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";

interface IProps {
  item: IReleaseList;
}

function ReleaseListItem(props: IProps) {
  const onPress = (item: IReleaseList) => {
    navigate('MovieinfoMainTabs', { item: item });
  };
  const { item } = props;
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <ProgressiveFastImage
          source={{ uri: item.thumb }}
          thumbnailSource={{ uri: item.thumb }}
          loadingSource={require('@/assets/loading3.gif')}
          style={styles.image} />
        <View style={styles.releaseInfo}>
          <Text style={styles.release_movie_name}>
            {item.title}
          </Text>
          <Text style={styles.en}>
            {item.en}
          </Text>
          <Text style={styles.release_movie_time}>
            {item.release_movie_time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ReleaseListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    width: ReleaseListItemWidth,
    height: ReleaseListItemHeight,
  },
  releaseInfo: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  release_movie_name: {
    //backgroundColor: '#ff0000',
    flex: 1,
    fontSize: 16,
    color: '#434eae',
    fontWeight: 'bold',
  },
  en: {
    //backgroundColor: '#ffff00',
    color: '#434eae',
    flex: 1,
    fontSize: 14,
  },
  release_movie_time: {
    //backgroundColor: '#ff0000',
    flex: 8,
    fontSize: 14,
    textAlignVertical: 'bottom'
  },
});

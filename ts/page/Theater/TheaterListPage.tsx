import { RouteProp } from '@react-navigation/native';
import { RootNavigation, RootStackParamList } from '@/navigator/Router';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { ITheater } from '@/model/Area';
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { navigate } from '@/utils/Utils';

interface IProps {
    route: RouteProp<RootStackParamList, 'TheaterListPage'>;
}

class TheaterListPage extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    keyExtractor = (item: ITheater) => {
        return item.id ? item.id : item.id;
    };

    go2TheaterResultPage = (item: ITheater) => {
        navigate('TheaterResultPage', { item: item });
    };

    renderItem = ({ item }: { item: ITheater }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.go2TheaterResultPage(item)}>
                <View style={styles.headerDes}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.adds}>
                        {item.adds}
                    </Text>
                    <Text numberOfLines={1} style={styles.tel}>
                        {item.tel}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    render() {
        const { route } = this.props;
        return (
            <FlatList
                style={styles.container}
                data={route.params.item.theater_list}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                numColumns={1}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerDes: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    name: {
        flex: 1,
        color: '#434eae',
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold',
    },
    adds: {
        flex: 1,
        color: '#999',
        fontSize: 16,
        padding: 5,
    },
    tel: {
        flex: 1,
        color: '#999',
        fontSize: 16,
        padding: 5,
    },
});

export default TheaterListPage;

import React, { useCallback, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Platform, StyleSheet, View, Text } from 'react-native';
import MovieTimeResultPage from '@/page/Movieinfo/MovieTimeResultPage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/model/dva/Models';
import { IMovieTimeTab, IMovieTimeResult, data } from '@/model/MovieTime';
import { createMovieTimeTabsModel } from '@/config/dva';
import Spinner from 'react-native-loading-spinner-overlay';
import { RootStackParamList } from '@/navigator/Router';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import IconWantempty from '@/assets/iconfont/IconWantempty';
import Octicons from 'react-native-vector-icons/Octicons';
import { Dropdown } from 'react-native-element-dropdown';
import { RootNavigation } from '@/navigator/Router';

const TAB_LIST_TYPE = 'movieTime/getTabList';

type BottomParamList = {
  [key: string]: {
    item: IMovieTimeResult[];
  };
};

const mapStateToProps = ({ movieTime }: RootState) => {
  return {
    showLoading: movieTime.showLoading,
    tabList: movieTime.tabList,
  };
};

const Tab = createMaterialTopTabNavigator<BottomParamList>();

interface IProps {
  //route: RouteProp<RootStackParamList, 'MovieTimeTabs'>;
  //navigation: RootNavigation;
  id: string;
}

function MovieTimeTabs(props: IProps) {
  const dispatch = useDispatch();
  const { showLoading, tabList } = useSelector(mapStateToProps, shallowEqual);
  const { id } = props;

  useEffect(() => {
    //var timestemp = new Date();
    //moment.locale('zh-tw');

    //var moment = require('moment');
    //var esLocale = require('moment/locale/zh-tw');
    //moment.locale('zh-tw', esLocale);

    //const nowDate = moment(timestemp, 'YYYY-DD-MM').format().split('T')[0];
    //console.log('NewDate ' + nowDate);
    dispatch({
      type: TAB_LIST_TYPE,
      payload: {
        id: id,
      },
    });
  }, [dispatch, id]);

  /*
   useFocusEffect(
     useCallback(() => {
       //var timestemp = new Date();
       //moment.locale('zh-tw');
 
       //var moment = require('moment');
       //var esLocale = require('moment/locale/zh-tw');
       //moment.locale('zh-tw', esLocale);
 
       //const nowDate = moment(timestemp, 'YYYY-DD-MM').format().split('T')[0];
       //console.log('NewDate ' + nowDate);
       dispatch({
         type: TAB_LIST_TYPE,
         payload: {
           id: props.route.params.id,
         },
       });
     }, [dispatch, props.route.params.id])
   )
   */
  const renderScreen = (tab: IMovieTimeTab) => {
    //const renderScreen = ({ tab, index }: { tab: IMovieTimeTab; index: number }) => {
    //动态创建每个Tab页面对于的Model对象
    //createMovieTimeTabsModel(tab.area);
    return (
      <Tab.Screen
        key={tab.area}
        name={tab.area}
        options={{ title: tab.area }}
        children={() =>
          <MovieTimeResultPage items={tab.data} />
        }
      />
    );
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const addDays = (date: Date, days: number): Date => {
    date.setDate(date.getDate() + days);
    return date;
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {

    //moment.locale('zh-tw');

    var moment = require('moment');
    var esLocale = require('moment/locale/zh-tw');
    moment.locale('zh-tw', esLocale);

    const nowDate = moment(date, 'YYYY-DD-MM').format().split('T')[0];
    console.log('NewDate ' + nowDate);
    dispatch({
      type: TAB_LIST_TYPE,
      payload: {
        id: id,
        date: nowDate,
      },
    });

    hideDatePicker();
  };

  const [value, setValue] = useState<number>(0);
  const [isFocus, setIsFocus] = useState(false);

  if (showLoading) {
    return (
      <Spinner
        visible={showLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    );
  }

  if (tabList?.length === 0 || tabList == null) {
    return (
      <View style={styles.container}>
        {/*
        <View style={styles.icon_container}>
          <Octicons.Button name="search" onPress={showDatePicker} size={20} style={styles.icon}>
            <Text style={styles.text}>{date_string}</Text>
          </Octicons.Button>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date()}
          maximumDate={addDays(new Date(), 9)}
          date={new Date(date_string)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker} />
        */}
        <View style={styles.empty}>
          <IconWantempty size={60} />
          <Text style={styles.emptyText}>暫時沒有數據</Text>
        </View>
      </View >
    )
  } else {
    console.log('tabList.length ' + tabList.length);
    var data: data[] = [];
    for (let i = 0; i < tabList.length; i++) {
      if (tabList[i] != null) {
        var a = {} as data;
        a.label = tabList[i].date;
        a.value = i;
        data.push(a);
      }
    }

    return (
      <View style={styles.container}>
        {/*
        <View style={styles.icon_container}>
          <Octicons.Button name="search" onPress={showDatePicker} size={20} style={styles.icon}>
            <Text style={styles.text}>{date_string}</Text>
          </Octicons.Button>
        </View>
        */}
        <View style={styles.dropdown_container}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? tabList[value].date : tabList[value].date}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              dispatch({
                type: 'setState'
              });
              setIsFocus(false);
            }}
          />
        </View>
        {/*
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date()}
          maximumDate={addDays(new Date(), 9)}
          date={new Date(date_string)}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker} />
        */}
        <Tab.Navigator
          lazy
          sceneContainerStyle={styles.sceneContainerStyle}
          tabBarOptions={{
            style: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: 0,
                },
                ios: {
                  shadowOpacity: 0,
                },
              }),
            },
            indicatorStyle: {
              backgroundColor: '#434eae',
            },
            tabStyle: { width: 70 },
            activeTintColor: '#434eae',
            inactiveTintColor: '#9a9a9a',
            scrollEnabled: true,
          }}>
          {tabList[value].list.map(renderScreen)}
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  sceneContainerStyle: {
    //backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  dropdown_container: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 5,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  icon_container: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  icon: {
    backgroundColor: '#434eae',
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default MovieTimeTabs;

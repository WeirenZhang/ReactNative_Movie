/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
//import App from './App';
import App from './ts/index';
import { LogBox } from 'react-native'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreAllLogs(true)

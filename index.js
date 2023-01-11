/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import App from './app/Entrypoint';
import {enableScreens} from 'react-native-screens';

enableScreens();

AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App'
import NewComponent from './src/new'
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playBackService } from './musicPlayerService';
import './src/i18n/i18n.config'

console.log("hello")

AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerComponent(appName, () => NewComponent);

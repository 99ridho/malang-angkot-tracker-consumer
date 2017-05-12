/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { MalangAngkotTrackerNav } from './src/navigator';
import { configureFirebase } from './src/utils/firebase_config';
import { AppRegistry } from 'react-native';

configureFirebase();

AppRegistry.registerComponent('MalangAngkotTracker', () => MalangAngkotTrackerNav);

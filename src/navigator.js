// @flow
import { StackNavigator, TabNavigator } from 'react-navigation';

import AngkotMap from './screens/AngkotMap';
import DaftarAngkot from './screens/DaftarAngkot';
import TrayekMap from './screens/TrayekMap';

import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Platform } from 'react-native';

const AppTabNavigator = TabNavigator({
  AngkotMap: {
    screen: AngkotMap,
    navigationOptions: {
      title: 'Angkot Map',
      tabBarIcon: <Icon name="map-o" size={24} />
    }
  },
  DaftarAngkot: {
    screen: DaftarAngkot,
    navigationOptions: {
      title: 'List Trayek',
      tabBarIcon: <Icon name="th-list" size={24} />
    }
  }
}, {
    tabBarOptions: {
      showLabel: Platform.OS == 'android',
      activeBackgroundColor: '#BBDEFB'
    }
  });

export const MalangAngkotTrackerNav = StackNavigator({
  Home: { screen: AppTabNavigator },
  TrayekMap: {
    screen: TrayekMap,
    navigationOptions: {
      title: 'Trayek Map'
    }
  }
});
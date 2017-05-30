// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

export default class AngkotMap extends Component {

  render() {
    return (
      <MapView initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
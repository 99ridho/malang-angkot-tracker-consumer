// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

export default class AngkotMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      angkotPositions: []
    }
  }

  componentDidMount() {
    const lokasiDriverAngkot = firebase.database().ref('lokasi_driver_angkot');
    lokasiDriverAngkot.on('value', snapshot => {
      const pos = Object.keys(snapshot.val()).map(key => {
        return {
          kode_angkot: snapshot.val()[key].kode_angkot,
          latitude: snapshot.val()[key].latitude,
          longitude: snapshot.val()[key].longitude
        };
      });

      this.setState({
        angkotPositions: pos
      });
    });
  }

  render() {
    return (
      <MapView initialRegion={{
          latitude: -7.9710882,
          longitude: 112.62604,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map} 
      >

      {
        this.state.angkotPositions.map(pos => (
          <MapView.Marker 
            coordinate={{latitude: pos.latitude, longitude: pos.longitude}}
            title={pos.kode_angkot.toUpperCase()}
            pinColor='blue'
            image={require('../assets/bus.png')}
          />
        ))
      }

      </MapView>
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
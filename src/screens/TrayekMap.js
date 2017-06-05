import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { geocodeAddress } from '../api/gmaps_geocoding';

export default class TrayekMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      trayekRuteMasukLocations: [],
      trayekRuteKeluarLocations: []
    }
  }

  static navigationOptions = ({navigation}) => {
    const { state } = navigation;
    return {
      title: 'Peta Jalur Angkot'
    };
  }

  componentDidMount() {
    const trayek = this.props.navigation.state.params.dataTrayekAngkot;
    console.log(trayek);

    const trayekRuteMasuk = trayek.rute_masuk.map(r => r + " " + trayek.kota);
    const trayekRuteKeluar = trayek.rute_keluar.map(r => r + " " + trayek.kota);

    trayekRuteMasuk.forEach(rute => {
      geocodeAddress(rute)
        .then(responseGeocodeJson => {
          const locations = {
            rute: rute,
            coordinate: {
              latitude: responseGeocodeJson.results[0].geometry.location.lat,
              longitude: responseGeocodeJson.results[0].geometry.location.lng,
            }
          };

          console.log("Rute masuk : "+rute, locations);

          this.setState({
            trayekRuteMasukLocations: [...this.state.trayekRuteMasukLocations, locations]
          });
        });
    });

    trayekRuteKeluar.forEach(rute => {
      geocodeAddress(rute)
        .then(responseGeocodeJson => {
          const locations = {
            rute: rute,
            coordinate: {
              latitude: responseGeocodeJson.results[0].geometry.location.lat,
              longitude: responseGeocodeJson.results[0].geometry.location.lng,
            }
          };

          console.log("Rute keluar : "+rute, locations);

          this.setState({
            trayekRuteKeluarLocations: [...this.state.trayekRuteKeluarLocations, locations]
          });
        });
    });
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 15}}>Jalur Angkot {this.props.navigation.state.params.dataTrayekAngkot.kode}</Text>
        </View>
        <View style={{ flex: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: 'powderblue' }}>
          <MapView initialRegion={{
            latitude: -7.9710882,
            longitude: 112.62604,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}>

            {this.state.trayekRuteMasukLocations.map(loc => (
              <MapView.Marker 
                coordinate={loc.coordinate}
                title={loc.rute}
                pinColor='blue'
              />
            ))}

            {this.state.trayekRuteKeluarLocations.map(loc => (
              <MapView.Marker 
                coordinate={loc.coordinate}
                title={loc.rute}
                pinColor='red'
              />
            ))}

            <MapView.Polyline 
              coordinates={this.state.trayekRuteKeluarLocations.map(loc => loc.coordinate)}
              strokeWidth={1}
              strokeColor='red'
            />

            <MapView.Polyline 
              coordinates={this.state.trayekRuteMasukLocations.map(loc => loc.coordinate)}
              strokeWidth={1}
              strokeColor='blue'
            />

          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

export default class TrayekMap extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const { state } = navigation;
    return {
      title: 'Peta Jalur Angkot'
    };
  }

  componentDidMount() {
    const trayek = this.props.navigation.state.detailTrayekAngkot;
    console.log(trayek);
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
          style={styles.map} />
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
// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

export default class DaftarAngkot extends Component {

  constructor() {
    super();

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewDataSource: this.ds.cloneWithRows([]),
      dataAngkot: {}
    };
  }

  // todo : edit ref on firebase and rewrite this method
  componentDidMount() {
    const trayekDatabaseRef = firebase.database().ref('trayek_angkot');
    trayekDatabaseRef.on('value', snapshot => {
      console.log(snapshot.val());
      console.log(Object.keys(snapshot.val()));
      this.setState({
        listViewDataSource: this.ds.cloneWithRows(Object.keys(snapshot.val())),
        dataAngkot: snapshot.val()
      })
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <ListView
          dataSource={this.state.listViewDataSource}
          renderRow={
            (rowData, sectionId, rowId) => <Row id={rowId} title={this.state.dataAngkot[rowData].kode} subtitle={this.state.dataAngkot[rowData].nama} onRowTap={this._onRowSelected.bind(this, rowId, rowData)} />
          }
          renderSeparator={
            (sectionId, rowId) => <View style={rowStyle.separator} />
          }
          removeClippedSubviews={false}
        />
      </View>
    );
  }

  _onRowSelected(rowId, rowData) {
    console.log("Row id : " + rowId);
    console.log("Row data : " + rowData);
    // Alert.alert(
    //   "Info",
    //   `Info : ${rowId} - ${rowData}`,
    //   [{ text: "Ok", onPress: () => console.log('ok') }]
    // )
    this.props.navigation.navigate('TrayekMap', { kodeAngkot: rowData });
  }

}

const rowStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    flexDirection: 'column'
  },
  title: {
    fontSize: 17
  },
  subtitle: {
    fontSize: 12,
    paddingTop: 10
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8e8e8e',
    flex: 1
  }
});

const Row = (props) => {
  return (
    <TouchableHighlight onPress={props.onRowTap} underlayColor="darkgray">
      <View style={rowStyle.container}>
        <Text style={rowStyle.title}>{props.title}</Text>
        <Text style={rowStyle.subtitle}>{props.subtitle}</Text>
      </View>
    </TouchableHighlight>
  );
}
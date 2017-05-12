// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DaftarAngkot extends Component {

    constructor() {
        super();
        this.initListView();
    }

    initListView() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const data = [
            {name: "ADL", detail: "Arjosari-Dinoyo-Landungsari"}
        ];

        // $FlowFixMe
        this.state = {
            listViewDataSource: ds.cloneWithRows(data),
        };
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: '#fafafa'}}>
                <ListView 
                    dataSource={this.state.listViewDataSource}
                    renderRow={(rowData) => <Row title={rowData.name} subtitle={rowData.detail}/>}
                    renderSeparator={(sectionId, rowId) => <View style={rowStyle.separator}/>}
                    removeClippedSubviews={false}
                />
            </View>
        );
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
        <View style={rowStyle.container}>
            <Text style={rowStyle.title}>{props.title}</Text>
            <Text style={rowStyle.subtitle}>{props.subtitle}</Text>
        </View>
    );
}
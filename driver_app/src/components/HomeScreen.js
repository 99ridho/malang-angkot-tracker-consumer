import React, { Component } from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { Permissions, Location, Constants } from 'expo';
import { Button, Card, CardSection, Input, Spinner } from './common';

class HomeScreen extends Component {
    state = { tracking : false, trayekAngkot: [], idUser: '', location: '' };

    componentWillMount() {
        //dapetinlocation
        if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
        } else {
        this._getLocationAsync();
        }

        //dapetin list trayek
        const trayekAngkot = firebase.database().ref('trayek_angkot');
        trayekAngkot.on('value', snapshot => {
        const trayekList = Object.keys(snapshot.val()).map(key => {
        return {
          kode: snapshot.val()[key].kode,
          nama: snapshot.val()[key].nama,
            };
        });
        this.setState({
        trayekAngkot: trayekList
            });
        });

        //dapetin idDriver
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({idUser: user.uid});
            }
        });
    }

    //method buat get location
     _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    };

    postToLokasiDriverAngkot(){
       // firebase.database.ref('')
    }

    onButtonStartPress(){
        console.log('start tracking');        
        this.setState({tracking: true});
    }

    onButtonStopPress(){
        console.log('stop tracking');
        this.setState({tracking: false});
    }

    renderButtonTrack() {
        if(this.state.tracking){
             return <Spinner size="large" />;
        } else {
            return(
                <Button onPress={this.onButtonStartPress.bind(this)}>
                Start Tracking
                </Button>
            );
        }
    }

    tracking() {
        if(this.state.tracking){

        }else {

        }

    }
    
    render(){
    console.log(this.state.trayekAngkot);
    console.log(this.state.tracking);
    console.log(this.state.idUser);
    console.log(JSON.stringify(this.state.location));
    
       return (
            <Card>
            <CardSection>
                 {this.renderButtonTrack()}
                 <Button onPress={this.onButtonStopPress.bind(this)}>
                Stop Tracking
                </Button>
            </CardSection>
            <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                Log Out
                </Button>
            </CardSection>
        </Card>
       );
    }
}

export default HomeScreen;
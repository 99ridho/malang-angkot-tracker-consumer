import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import HomeScreen from './components/HomeScreen';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
                apiKey: 'AIzaSyCSkm-ZQoDqUNkLyWpkVavMJiPDWSu7-Oo',
                authDomain: 'auth-7729c.firebaseapp.com',
                databaseURL: 'https://auth-7729c.firebaseio.com',
                projectId: 'auth-7729c',
                storageBucket: 'auth-7729c.appspot.com',
                messagingSenderId: '1092197670254'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <HomeScreen />
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Malang Angkot Tracker" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;

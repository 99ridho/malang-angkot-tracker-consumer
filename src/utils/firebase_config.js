import * as firebase from 'firebase';

export const configureFirebase = () => {
    const config = {
        apiKey: "AIzaSyArZtr8vY8zS8PuMySokiUvG07A19R9oQk",
        authDomain: "malang-angkot-tracker.firebaseapp.com",
        databaseURL: "https://malang-angkot-tracker.firebaseio.com",
        projectId: "malang-angkot-tracker",
        storageBucket: "malang-angkot-tracker.appspot.com",
        messagingSenderId: "948016144851"
    };
    firebase.initializeApp(config);
}
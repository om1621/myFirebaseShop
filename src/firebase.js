import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const fb = firebase.initializeApp({
    apiKey: "AIzaSyB_IhMBfsqKq0usfU1dPCcQb8rEwHtEnFc",
    authDomain: "react-firebase-authentic-eadbb.firebaseapp.com",
    databaseURL: "https://react-firebase-authentic-eadbb.firebaseio.com",
    projectId: "react-firebase-authentic-eadbb",
    storageBucket: "react-firebase-authentic-eadbb.appspot.com",
    messagingSenderId: "921677687219",
    appId: "1:921677687219:web:f0da7e91c44f25aa3d43c6",
    measurementId: "G-4HZQ7D6QL9"
  });

export default fb;

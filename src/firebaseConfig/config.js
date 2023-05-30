import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseconfig = firebase.initializeApp({
    apiKey: "AIzaSyB8VMAmXEiSQrnNAnkc7NRMOH4x65lp2gU",
    authDomain: "wysa-sleep-clone.firebaseapp.com",
    projectId: "wysa-sleep-clone",
    storageBucket: "wysa-sleep-clone.appspot.com",
    messagingSenderId: "266034228932",
    appId: "1:266034228932:web:00d3a9f9950fd424ba2391",
    measurementId: "G-SKBRRMG44F"
  });

export const auth = firebase.auth();

export const fireauth = firebase.auth;

const settings = {timestampsInSnapshots: true};
firebase.firestore().settings(settings);
export const firestore = firebase.firestore();

export const firebasestore = firebase.firestore;
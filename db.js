import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyASblLwKxNd0AI0P9jXiapPAUPEYqaPAms",
    authDomain: "maturitniknihy.firebaseapp.com",
    databaseURL: "https://maturitniknihy.firebaseio.com",
    projectId: "maturitniknihy",
    storageBucket: "maturitniknihy.appspot.com",
    messagingSenderId: "129678617092",
    appId: "1:129678617092:web:9d6e209bf2763a9c13e351",
    measurementId: "G-SBEPM9QEWZ"
};

// Get a Firestore instance
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore();

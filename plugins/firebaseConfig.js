

// plugins/firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyDt1Rjd73TC3aZ61ckih0dlkqU3hs6J0cE",
  authDomain: "nami-17ae4.firebaseapp.com",
  projectId: "nami-17ae4",
  storageBucket: "nami-17ae4.appspot.com",
  messagingSenderId: "1005624533902",
  appId: "1:1005624533902:web:ffdda638cd349acafa3adf"
};

// Initialiser Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exporter Firestore
export const firestore = firebase.firestore();
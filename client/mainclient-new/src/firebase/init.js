import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBT5aXT1mC1LBcT-4WPYumEzagrsnamXYI",
  authDomain: "asimmath.firebaseapp.com",
  databaseURL: "https://asimmath.firebaseio.com",
  projectId: "asimmath",
  storageBucket: "asimmath.appspot.com",
  messagingSenderId: "125226910718",
  appId: "1:125226910718:web:d36e16a2633c01eb5f76af",
};
// Initialize Firebase
export const firebaseapp = firebase.initializeApp(firebaseConfig);

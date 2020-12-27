import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWdeiAxDlaFnERx6DshIytm0g27pl0uHU",
    authDomain: "team2-blockchain.firebaseapp.com",
    projectId: "team2-blockchain",
    storageBucket: "team2-blockchain.appspot.com",
    messagingSenderId: "1058825308578",
    appId: "1:1058825308578:web:a1b31f445736c5811d0afb",
    measurementId: "G-9G04DZ7V63"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
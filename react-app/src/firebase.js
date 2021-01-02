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

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebase.auth();

var allCharities = [];

//Retrieve list of charities from firestore
firestore.collection("onboarding/main/charities").get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    allCharities.push(doc.data());
  });
});
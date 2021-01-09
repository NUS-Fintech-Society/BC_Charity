import { Functions } from "@material-ui/icons";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { isVariableStatement } from "typescript";
const Web3 = require("web3");

export const firebaseConfig = {
  apiKey: "AIzaSyBWdeiAxDlaFnERx6DshIytm0g27pl0uHU",
  authDomain: "team2-blockchain.firebaseapp.com",
  projectId: "team2-blockchain",
  storageBucket: "team2-blockchain.appspot.com",
  messagingSenderId: "1058825308578",
  appId: "1:1058825308578:web:a1b31f445736c5811d0afb",
  measurementId: "G-9G04DZ7V63",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebase.auth();

var allCharities = [];

//Populate list of all charities from firestore into allCharities
firestore
  .collection("onboarding/main/charities")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      allCharities.push(doc.data());
    });
  });

//To retrieve a specific UEN
export function searchByUEN(uen) {
  var charity = [];
  firestore
    .collection("onboarding/main/charities")
    .where("UEN", "==", uen)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        charity.push(doc.data());
      });
    });
  return charity;
}

/**
 * Get donations based on donationHash
 * ! Also stores the transaction Hash of the mined transaction
 */
export function getDonations() {
  firestore.collection("donations").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log(doc.id, doc.data())
    })
  })
}


/**
 * Add donation details to Firestore.
 * ! Also stores the transaction Hash of the mined transaction
 * @param {*} nricHash 
 * @param {*} amount 
 * @param {*} date 
 * @param {*} message 
 * @param {*} transactionHash transaction hash of mined transaction
 */
export function addDonation(nricHash, amount, date, message, transactionHash) {
  const donationDetails = {
    nricHash: nricHash,
    amount: amount,
    data: date,
    message: message,
    transactionHash: transactionHash
  }
  const donationHash = Web3.utils.sha3(nricHash + amount + date + message);
  return firestore.collection("donations").doc(donationHash).set(donationDetails);
}

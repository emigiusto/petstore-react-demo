// Import the functions you need from the SDKs you need
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('../dba/keys.json');

const admin = require('firebase-admin');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
    apiKey: "AIzaSyB3buTXZxt3SmeUXYM-tKEY4KwwSKKwVCY",
    authDomain: "petstoreapi-c5955.firebaseapp.com",
    projectId: "petstoreapi-c5955",
    storageBucket: "petstoreapi-c5955.appspot.com",
    messagingSenderId: "376482873634",
    appId: "1:376482873634:web:7fcb3d1cc01ea58a4ce57b"
  }; */
// Initialize Firebase
admin.initializeApp(
 { credential:admin.credential.cert(serviceAccount)}
);
const db = admin.firestore();


/* const allCartsModel = async (dba) => {
  console.log(dba)
  const carts = [];
  await dba.collection('products').get().forEach(doc => {
    console.log("aaa")
    carts.push(doc)
  });
  return carts;
}

allCartsModel(db).then(response => console.log(response)) */

module.exports = db;
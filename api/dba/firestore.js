// Import the functions you need from the SDKs you need
/* const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore'); */
const serviceAccount = require('../dba/keys.json');

const admin = require('firebase-admin');

admin.initializeApp(
 { credential:admin.credential.cert(serviceAccount)}
);
const db = admin.firestore();

module.exports = db;
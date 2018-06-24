import secrets from 'secrets'; // eslint-disable-line
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: secrets.apiKey,
  authDomain: `${secrets.productId}.firebaseapp.com`,
  databaseURL: `https://${secrets.productId}.firebaseio.com`,
  storageBucket: `gs://${secrets.productId}.appspot.com`,
  projectId: secrets.productId,
});

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export {
  firebase,
  provider,
  db,
};

import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDMdBHF5fjb2HbwtGi4iGeo8kPHxmNtbzo",
  authDomain: "react-chrome-redux-b6aea.firebaseapp.com",
  databaseURL: "https://react-chrome-redux-b6aea.firebaseio.com",
  storageBucket: "gs://react-chrome-redux-b6aea.appspot.com",
  projectId: 'react-chrome-redux-b6aea',
});

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export {
  provider,
  db,
};

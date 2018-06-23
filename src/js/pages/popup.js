import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import firebase from "firebase";

import { REDUX_PORT_NAME } from '../constants';
import App from '../components/App.jsx';

firebase.initializeApp({
  apiKey: "AIzaSyDMdBHF5fjb2HbwtGi4iGeo8kPHxmNtbzo",
  authDomain: "react-chrome-redux-b6aea.firebaseapp.com",
  databaseURL: "https://react-chrome-redux-b6aea.firebaseio.com",
  storageBucket: "gs://react-chrome-redux-b6aea.appspot.com",
});

const store = new Store({
  portName: REDUX_PORT_NAME,
});

store.ready().then(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-container'),
  );
});

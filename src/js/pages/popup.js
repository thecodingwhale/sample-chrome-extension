import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import { REDUX_PORT_NAME } from '../constants';
import App from '../components/App.jsx';

const store = new Store({
  portName: REDUX_PORT_NAME,
});

Modal.setAppElement('#app-container');

store.ready().then(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app-container'),
  );
});

import axios from 'axios';
import secrets from 'secrets'; // eslint-disable-line
import { db, provider, firebase } from './firebase';

export const createPaymentOrder = ({ uid, email }) => {
  const url = `${secrets.apiUrl}/amzfire-client/us-central1/api/createPaymentOrder`;
  const data = {
    reqData: {
      app: 'amzfire-review-to-order',
      email: email,
      userId: uid
    },
  };
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: data,
    url,
  };
  return axios(options);
};

export const isAccountExits = ({ uid }) => {
  return db.collection('users').where('uid', '==', uid).get();
};

export const updateAccountType = ({ docId, accountType }) => {
  return db.collection('users')
    .doc(docId)
    .update({
      accountType: accountType,
    });
}

export const createNewUser = ({ uid, email, displayName, photoURL }) => {
  return db.collection('users')
    .add({
      uid,
      email,
      displayName,
      photoURL,
      accountType: 'FREE',
    });
}

export const signIn = () => {
  return firebase.auth().signInWithPopup(provider);
}


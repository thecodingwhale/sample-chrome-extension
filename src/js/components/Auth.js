import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import firebase from 'firebase';
import { db, provider } from '../firebase';

import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';

class Auth extends React.Component {
  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    this.props.setLoading(true);
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        db.collection('users')
          .where('uid', '==', result.user.uid)
          .get()
          .then((snapshot) => {
            if (!snapshot.empty) {
              const {
                uid, email, displayName, photoURL, accountType,
              } = snapshot.docs[0].data();
              this.props.setLoading(false);
              this.props.setLogin(true);
              console.log({
                uid,
                email,
                displayName,
                photoURL,
                accountType,
              });
              this.props.setUser({
                uid,
                email,
                displayName,
                photoURL,
                accountType,
              });
            } else {
              const {
                displayName, email, photoURL, uid,
              } = result.user;
              db.collection('users')
                .add({
                  uid,
                  email,
                  displayName,
                  photoURL,
                  accountType: 'FREE',
                })
                .then(() => {
                  this.props.setLoading(false);
                  this.props.setLogin(true);
                  this.props.setUser({
                    uid,
                    email,
                    displayName,
                    photoURL,
                    accountType: 'FREE',
                  });
                })
                .catch((error) => {
                  console.log('Error getting documents: ', error);
                });
            }
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }).catch((error) => {
        this.props.setLoading(false);
        /*
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          // The email of the user's account used.
          const email = error.email;

          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
        */
      });
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="Auth">
        <button
          type="button"
          onClick={this.authenticate}
          disabled={isLoading}
        >
          {isLoading ? 'Login In...' : 'Login with Google'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  setLoading: isLoading => dispatch(Actions.setLoading(isLoading)),
  setLogin: isLogin => dispatch(Actions.setLogin(isLogin)),
  setUser: user => dispatch(Actions.setUser(user)),
});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
export default hot(module)(statefulApp);

import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { Button, Message } from 'semantic-ui-react';
import { FREE } from '../constants';
import { signIn, isAccountExits, createNewUser } from '../Api';

import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';

class Auth extends React.Component {
  constructor() {
    super();

    this.state = {
      textHelper: '',
    };
    this.authenticate = this.authenticate.bind(this);
  }

  setTextHelper(text) {
    this.setState({
      textHelper: text,
    });
  }

  authenticate() {
    this.props.setLoading(true);
    this.props.setError(false);
    this.setTextHelper('Authenticating...');
    signIn()
      .then((result) => {
        const uid = result.user.uid;
        this.setTextHelper('Verifying...');
        isAccountExits({ uid })
          .then((snapshot) => {
            if (!snapshot.empty) {
              const {
                uid, email, displayName, photoURL, accountType,
              } = snapshot.docs[0].data();
              this.props.setLoading(false);
              this.props.setLogin(true);
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
              this.setTextHelper('Creating new account...');
              createNewUser({
                uid,
                email,
                displayName,
                photoURL,
              })
              .then(() => {
                this.props.setLoading(false);
                this.props.setLogin(true);
                this.props.setUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                  accountType: FREE,
                });
              })
              .catch((error) => {
                this.props.setLoading(false);
                this.props.setError(`failed creating new account for ${email}.`);
                this.setTextHelper('');
                console.log(error)
              });
            }
          })
          .catch((error) => {
            this.props.setLoading(false);
            this.props.setError(`account ${email} is already exists.`);
            this.setTextHelper('');
            console.log(error);
          });
      }).catch((error) => {
        this.props.setLoading(false);
        this.props.setLoading(false);
        this.setTextHelper('');
        const email = error.email;
        if (email) {
          this.props.setError(`The email of the user's account used.`);
        }
        const credential = error.credential;
        if (credential) {
          this.props.setError(`Auth credential was used.`);
        }
        console.log(error);
      });
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <div className="Auth">
        <Button
          type="button"
          color="google plus"
          size="mini"
          onClick={this.authenticate}
          disabled={isLoading}
          loading={isLoading}
        >
          Login with Google
        </Button>
        {error !== false ? (
          <Message
            negative
            size="mini"
            content={error}
            onDismiss={() => {
              this.props.setError(false);
            }}
          />
        ) : null}
        {this.state.textHelper ? (
          <small className="text-helper">
            {this.state.textHelper}
          </small>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  setLoading: isLoading => dispatch(Actions.setLoading(isLoading)),
  setError: error => dispatch(Actions.setError(error)),
  setLogin: isLogin => dispatch(Actions.setLogin(isLogin)),
  setUser: user => dispatch(Actions.setUser(user)),
});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
export default hot(module)(statefulApp);

import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import firebase from 'firebase';

import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';

import '../../scss/components/App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.callGoogleSignIn = this.callGoogleSignIn.bind(this);
  }

  componentDidMount() {
    this.props.loadDataset(Math.ceil(Math.random() * 1000));
  }

  callGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
      const user = result.user; // The signed-in user info.
      const { displayName, email, emailVerified, isAnonymous, phoneNumber, photoURL, uid } = user;
      console.log({
        displayName,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
        uid,
      });
   }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
   });
  }

  render() {
    const {
      isLoading, dataset, tabIndex, currentUrl, updateTab,
    } = this.props;
    if (isLoading) return <div className="popup">Loading...</div>;
    const repoList = dataset
      .slice(0, 10)
      .map(r => <li key={r.id}>{r.full_name}</li>);
    return (
      <div className="popup">
        <input
          type="button"
          value="login with google"
          onClick={this.callGoogleSignIn}
        />
        <Tabs selectedIndex={tabIndex} onSelect={i => updateTab(i)}>
          <TabList>
            <Tab>Count</Tab>
            <Tab>Repos</Tab>
          </TabList>
          <TabPanel>
            <h2>{dataset.length} repos</h2>
            <p>{currentUrl}</p>
          </TabPanel>
          <TabPanel>
            <ul>{repoList}</ul>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  dataset: state.dataset,
  currentUrl: state.currentUrl,
  tabIndex: state.tabIndex,
});

const mapDispatchToProps = dispatch => ({
  loadDataset: since =>
    dispatch({ type: Aliases.LOAD_DATASET, payload: { since } }),
  updateTab: i => dispatch(Actions.updateTab(i)),
  updateCurrentUrl: i => dispatch(Actions.updateCurrentUrl(i)),
});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
export default hot(module)(statefulApp);

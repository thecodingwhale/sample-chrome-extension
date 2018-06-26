import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';

import Auth from './Auth';
import Welcome from './Welcome';

import '../../scss/index.scss';

class App extends React.Component {
  render() {
    const { isLogin, error } = this.props;
    return (
      <div className="App">
        {isLogin && error === false ? <Welcome /> : <Auth />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.isLogin,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({

});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
export default hot(module)(statefulApp);

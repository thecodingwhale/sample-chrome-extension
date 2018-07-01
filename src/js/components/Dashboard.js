import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react';

import * as Actions from '../state/actions';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        <Header
          as="h1"
          textAlign="center"
          color="white"
          content="Dashboard"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
export default hot(module)(statefulApp);

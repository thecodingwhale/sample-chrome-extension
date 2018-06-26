import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import * as Actions from '../state/actions';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="Dashboard">
        Dashboard
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

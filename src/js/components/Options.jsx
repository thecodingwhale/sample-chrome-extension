import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';

import '../../scss/index.scss';

class Options extends React.Component {
  render() {
    const { isLogin } = this.props;
    return (
      <div className="Options">
        {isLogin ? (
          <div className="container">
            <div className="container__half">
              <div className="Options__pane">
                <div
                  className="Options__pane__full-centered"
                  style={{
                    backgroundColor: '#d6d6d6',
                  }}
                >
                  <div className="box">
                    <div className="box__header text-center">
                      Current
                    </div>
                    <div className="box__body flex-center-content">
                      FREE
                    </div>
                    <div className="box__footer text-center">
                      <button
                        type="button"
                        style={{
                          visibility: 'hidden',
                        }}
                      >
                        select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container__half">
              <div className="Options__pane">
                <div
                  className="Options__pane__full-centered"
                  style={{
                    backgroundColor: '#5dd8e4',
                  }}
                >
                  <div className="box">
                    <div
                      className="box__header text-center"
                      style={{
                        visibility: 'hidden',
                      }}
                    >
                      Current
                    </div>
                    <div className="box__body flex-center-content">
                      PRO
                    </div>
                    <div className="box__footer text-center">
                      <button
                        type="button"
                      >
                        select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Please signin first.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.isLogin,
});

const mapDispatchToProps = dispatch => ({

});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
export default hot(module)(statefulApp);

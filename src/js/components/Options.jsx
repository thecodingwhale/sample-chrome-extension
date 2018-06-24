import React from 'react';
import Modal from 'react-modal';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import axios from 'axios';

import { db } from '../firebase';

import CustomModal from './CustomModal';

import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';

import '../../scss/index.scss';

const Api = {
  getUserPaymentStatus: ({ uid, email }) => {
    const url = 'https://47d6201c-3351-4a18-b3b8-88472274520d.mock.pstmn.io/amzfire-client/us-central1/api/getUserPaymentStatus';
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
  },
  createPaymentOrder: ({ uid, email }) => {
    const url = 'https://47d6201c-3351-4a18-b3b8-88472274520d.mock.pstmn.io/amzfire-client/us-central1/api/createPaymentOrder';
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
  },
  isAccountExits: ({ uid }) => {
    return db.collection('users').where('uid', '==', uid).get();
  },
  updateAccountType: ({ docId, accountType }) => {
    return db.collection('users')
      .doc(docId)
      .update({
        accountType: accountType,
      });
  }
}


class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
    };

    this.toggle = this.toggle.bind(this);
    this.makePayment = this.makePayment.bind(this);
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  makePayment() {
    const { uid, email, displayName, photoURL } = this.props.user;
    this.props.setLoading(true);
    Api.isAccountExits({ uid })
      .then((snapshot) => {
        if (!snapshot.empty) {
        const accountType = 'PRO';
        const docId = snapshot.docs[0].id;
        Api.updateAccountType({ docId, accountType })
          .then(response => {
            this.props.setLoading(false);
            this.props.setUser({
              uid,
              email,
              displayName,
              photoURL,
              accountType,
            });
            this.toggle();
          })
          .catch((error) => {
            this.props.setLoading(false);
          });
        }
      })
      .catch((error) => {
        this.props.setLoading(false);
      });
  }

  render() {
    const { isLogin, isLoading, user } = this.props;
    return (
      <div className="Options">
        <CustomModal
          open={this.state.toggle}
          onClose={this.toggle}
        >
          <div className="Options__paypal">
            <div>
              Paypal
            </div>
            <button
              disabled={isLoading}
              onClick={this.makePayment}
            >
              Make Payment
            </button>
          </div>
        </CustomModal>
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
                    <div
                      className="box__header text-center"
                      style={{
                        visibility: (user.accountType === 'FREE') ? '' : 'hidden',
                      }}
                    >
                      Current
                    </div>
                    <div className="box__body flex-center-content">
                      FREE
                    </div>
                    <div className="box__footer text-center">
                      <button type="button">
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
                        visibility: (user.accountType === 'PRO') ? '' : 'hidden',
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
                        onClick={this.toggle}
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
  isLoading: state.isLoading,
  isLogin: state.isLogin,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setLoading: isLoading => dispatch(Actions.setLoading(isLoading)),
  setUser: user => dispatch(Actions.setUser(user)),
});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
export default hot(module)(statefulApp);

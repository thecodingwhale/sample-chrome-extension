import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Header, Modal, Button } from 'semantic-ui-react';

import { FREE, PRO } from '../constants';

import '../../scss/index.scss';

import { isAccountExits, updateAccountType } from '../Api';
import * as Actions from '../state/actions';
import * as Aliases from '../state/aliases';
import CustomModal from './CustomModal';
import Dashboard from './Dashboard';
import Page404 from './Page404';

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
    isAccountExits({ uid })
      .then((snapshot) => {
        if (!snapshot.empty) {
        const accountType = PRO;
        const docId = snapshot.docs[0].id;
        updateAccountType({ docId, accountType })
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
          <Modal.Header>Upgrade Account</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <h3>Would you want to upgrade your account to PRO?</h3>
              <p>You can unlock multiple access, avail our premium services and unlimited support.</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color='black'
              onClick={this.toggle}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button
              positive
              content={isLoading ? 'Upgrading...' : 'Upgrade'}
              disabled={isLoading}
              onClick={this.makePayment}
            />
          </Modal.Actions>
        </CustomModal>
        {isLogin ? (
          <div>
            {user.accountType === FREE ? (
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
                          <Button
                            basic
                            type="button"
                          >
                            Select
                          </Button>
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
                          <Button
                            basic
                            type="button"
                            onClick={this.toggle}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Dashboard />

            )}
          </div>
        ) : (
          <Page404 />
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

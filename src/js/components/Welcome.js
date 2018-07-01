import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { Header, Icon, Image, Card, Button } from 'semantic-ui-react';

import { FREE } from '../constants';

import * as Actions from '../state/actions';

class Welcome extends React.Component {
  constructor() {
    super();
    this.changeAccountType = this.changeAccountType.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  changeAccountType() {
    chrome.runtime.openOptionsPage();
  }

  onLogout() {
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="Welcome">
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={user.photoURL} circular />
            <Card.Header>{user.displayName}</Card.Header>
            <Card.Meta>{user.accountType}</Card.Meta>
            <Card.Description>
              You can put your sample message here
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button
                basic
                color='green'
                onClick={this.changeAccountType}
              >
                {user.accountType === FREE ? 'Upgrade' : 'Dashboard'}
              </Button>
              <Button basic color='red' onClick={this.onLogout}>
                Logout
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(Actions.setLogin(false));
    dispatch(Actions.setUser({}));
  },
});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
export default hot(module)(statefulApp);

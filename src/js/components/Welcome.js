import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { Header, Icon, Image, Card, Button } from 'semantic-ui-react';

class Welcome extends React.Component {
  constructor() {
    super();
    this.changeAccountType = this.changeAccountType.bind(this);
  }

  changeAccountType() {
    chrome.runtime.openOptionsPage();
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
            <Button
              basic
              onClick={this.changeAccountType}
              color='green'
            >
              Change Account Type
            </Button>
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

});

const statefulApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
export default hot(module)(statefulApp);

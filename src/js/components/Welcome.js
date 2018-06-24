import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

class Welcome extends React.Component {
  constructor() {
    super();
    this.changeAccountType = this.changeAccountType.bind(this);
  }

  changeAccountType() {
    console.log('test')
  }

  render() {
    const { user } = this.props;
    return (
      <div className="Welcome">
        <div>Welcome</div>
        <div>
          {user.displayName}
        </div>

        <div>Account Type</div>
        <div>
          {user.acountType}
        </div>

        <button
          type="button"
          onClick={this.changeAccountType}
        >
          Change account type
        </button>
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

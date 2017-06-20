import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetch, signOut } from 'redux-oauth';
// import Button from 'react-bootstrap-button-loader';
import { isUserSignedIn } from 'redux/models/user';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

const propTypes = {
  dispatch: PropTypes.func,
  userSignedIn: PropTypes.bool.isRequired,
  className: PropTypes.string,
  to: PropTypes.string
};

function serverLogout() {
  console.log('serverLogout');
  return fetch(
    'api/logout',
    {
      method: 'get'
    }
  );
}

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props;
    serverLogout()
      .then(dispatch(signOut))
      .then(result => {
        if (!!result.url) {
          browserHistory.push(result.url);
        } else {
          browserHistory.push('/login');
        }
      });
  }

  render() {
    if (!this.props.userSignedIn) {
      return null;
    }
    const { className, to } = this.props;
    return <Link className={className} to={to} onClick={this.handleClick}>Sign out</Link>;
  }
}

SignOutButton.propTypes = propTypes;

function mapStateToProps(state) {
  return { userSignedIn: isUserSignedIn(state) };
}

export default connect(mapStateToProps)(SignOutButton);

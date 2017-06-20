import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap-button-loader';
import { isUserSignedIn } from 'redux/models/user';
import { fetch, authenticateStart, authenticateComplete, authenticateError, parseResponse } from 'redux-oauth';
import { browserHistory } from 'react-router';
import './LoginButton.css';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  provider: PropTypes.string.isRequired,
  className: PropTypes.string,
  form: PropTypes.string,
  postURL: PropTypes.string,
  userSignedIn: PropTypes.bool.isRequired
};

function objectifyForm(formArray) {
  const returnArray = {};
  for (let i = 0; i < formArray.length; i++) {
    returnArray[formArray[i].name] = formArray[i].value;
  }
  return returnArray;
}

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.signIn = this.signIn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ loading: true });
    const { dispatch, form } = this.props;
    try {
      const params = $(form).serializeArray();
      dispatch(this.signIn(objectifyForm(params)))
        .then(
          user => {
            if (!!user) {
              this.setState({ loading: false });
              browserHistory.push('/about');
            }
          },
          error => {
            this.showAlert(error.error);
            this.setState({ loading: false });
          }
        );
    } catch (e) {
      this.showAlert('Client error');
      this.setState({ loading: false });
    }
  }

  signIn(params) {
    console.log(this.props.postURL);
    const URI = !this.props.postURL ? 'api/a' : this.props.postURL;
    return dispatch => {
      dispatch(authenticateStart());
      return dispatch(fetch(
        URI,
        {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        }
      ))
        .then(parseResponse)
        .then(user => {
          dispatch(authenticateComplete(user));
          return Promise.resolve(user);
        })
        .catch(error => {
          if (error.errors) {
            dispatch(authenticateError(error.errors));
          }

          return Promise.reject(error.errors || error);
        });
    };
  }

  showAlert(msg) {
    const ale = $('#loginAlert');
    ale.text(msg);
    ale.show();
    ale.fadeTo(2000, 500).slideUp(500, 0);
  }

  render() {
    const { provider, userSignedIn, className } = this.props;
    if (userSignedIn) {
      return null;
    }

    return <Button className={className} loading={this.state.loading} onClick={this.handleClick} >{provider}</Button>;
  }
}

LoginButton.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const loading = state.auth.getIn(['signIn', ownProps.provider, 'loading']) || false;
  return { userSignedIn: isUserSignedIn(state), loading };
}

export default connect(mapStateToProps)(LoginButton);

import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PageHeader from 'react-bootstrap/lib/PageHeader';
// import Button from 'react-bootstrap-button-loader';
// import { timeRequest } from 'redux/actions/timeActions';
import { LoginButton } from 'components/AuthButtons';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className='col-sm-12 col-md-6 push-md-3 col-lg-6 push-lg-3 onboarding-container'>
        <div className='signup-container'>
          <h1 className='onboarding-title'>Login</h1>
          <form id='loginForm' action='/api/login' method='post'>
            <div className='form-group'>
              <input type='text' className='form-control onboarding-input'
                name='userName' placeholder='Display Name'
              />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control onboarding-input'
                name='password' placeholder='password'
              />
            </div>
            <div className='alert alert-danger' id='loginAlert' display='none'>message</div>
            <LoginButton className='onboarding-button' form='#loginForm'
              postURL='/api/login' provider='Login'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

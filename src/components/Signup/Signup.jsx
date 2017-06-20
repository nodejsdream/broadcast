import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PageHeader from 'react-bootstrap/lib/PageHeader';
// import Button from 'react-bootstrap-button-loader';
// import { timeRequest } from 'redux/actions/timeActions';
import { LoginButton } from 'components/AuthButtons';
import './Signup.css';

class Signup extends Component {

  render() {
    return (
      <div className='col-sm-12 col-md-6 push-md-3 col-lg-6 push-lg-3 onboarding-container'>
        <div className='signup-container'>
          <h1 className='onboarding-title'>Join Dust today.</h1>
          <form action='/api/signup' method='post' id='signupForm'>
            <div className='form-group'>
              <input type='text' className='form-control onboarding-input' name='userName'
                placeholder='User name'
              />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control onboarding-input' name='fullName'
                placeholder='Full name'
              />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control onboarding-input' name='displayName'
                placeholder='Display name'
              />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control onboarding-input' name='password'
                placeholder='Password'
              />
            </div>
            <div className='alert alert-danger' id='loginAlert' display='none'>message</div>
            <LoginButton className='onboarding-button' form='#signupForm'
              postURL='/api/signup' provider='Sign up'
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;

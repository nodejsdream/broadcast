import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Grid  from 'react-bootstrap/lib/Grid';
// import Nav from 'react-bootstrap/lib/Nav';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import NavItem  from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router';
// import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { isUserSignedIn } from 'redux/models/user';
import { SignOutButton } from 'components/AuthButtons';
import Notification from '../Notification';

import './App.css';

const propTypes = {
  userSignedIn: PropTypes.bool.isRequired,
  children: PropTypes.node,
  initialName: PropTypes.string
};

class App extends Component {
  render() {
    return (
      <div>
        <header id='header'>
          <div className='banner'>
            <ul id='topbar'>
              <li id='profile'>
                {!!this.props.userSignedIn && (
                  <Notification/>
                )}
                <div className='dropdown'>
                  <button className='btn btn-primary dropdown-toggle'
                    type='button' id='profilemenu' data-toggle='dropdown'
                    aria-haspopup='true' aria-expanded='false'
                  >
                    <img src ='/img/profile off.png' alt='profile'/>
                  </button>
                  <div className='dropdown-menu dropdown-menu-right' aria-labelledby='profile'>
                    <Link className='dropdown-item' to='/about'><strong>About</strong></Link>
                    {!this.props.userSignedIn && (
                      <Link className='dropdown-item' to='/login'>Have an account? <strong>Log in</strong></Link>
                    )}
                    {!this.props.userSignedIn && (
                      <Link className='dropdown-item' to='/signup'>No account? <strong>Signup</strong></Link>
                    )}
                    {!this.props.userSignedIn && (
                      <Link className='dropdown-item' to='/MainFeed'><strong>Main Feed</strong></Link>
                    )}
                    <SignOutButton className='dropdown-item' to='/logout'>Logout</SignOutButton>
                  </div>
                </div>
              </li>
              <li id='search'><input type='text' placeholder='&#128269; Search' /></li>
              <li id='logo'><Link to='/'><img className="hidden-sm-down" src ='/img/Home.png'/><img className="hidden-md-up" src ='/img/logo.svg'/></Link></li>
            </ul>
          </div>
        </header>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  console.log(!connect);
  return { userSignedIn: isUserSignedIn(state) };
}

export default connect(mapStateToProps)(App);

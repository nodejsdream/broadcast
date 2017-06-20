import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Post from '../Post';

import './About.css';

const propTypes = {
  dispatch: PropTypes.func
};

class About extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='row main-feed'>
        <PageHeader>About</PageHeader>
        <div className='col-sm-12 col-md-3'/>
        <div className='col-sm-12 col-md-6'>
        </div>
        <div className='col-sm-12 col-md-3'/>
      </div>
    );
  }
}

About.propTypes = propTypes;

export default About;

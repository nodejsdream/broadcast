import React, { Component } from 'react';
import './MainFeed.css';
import Post from '../Post';

class MainFeed extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className='row main-feed'>
        <div className='col-md-3 hidden-sm'/>
        <div className='col-sm-12 col-md-6'>
          <Post/>
        </div>
        <div className='col-md-3 hidden-sm'/>
      </div>
    )
  }
}

export default MainFeed;

import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
import './Notification.css';

const notifications =
  [
    {
      type: 'folowing',
      name: 'Rebellaliance',
      userId: 3,
      userImg: 'https://randomuser.me/api/portraits/thumb/men/84.jpg',
      time:'8 min',
      folowed: false
    },
    {
      type: 'like',
      name: 'Rebellaliance',
      userId: 3,
      userImg: 'https://randomuser.me/api/portraits/thumb/men/84.jpg',
      srcId: 'https://randomuser.me/api/portraits/thumb/men/24.jpg',
      time:'9 min'
    },
    {
      type: 'comment',
      name: 'some',
      userId: 2,
      userImg: 'https://randomuser.me/api/portraits/thumb/women/84.jpg',
      srcId: 'https://randomuser.me/api/portraits/thumb/women/81.jpg',
      comment: 'approach of making a new function composed',
      time:'11 min'
    },
    {
      type: 'folowing',
      name: 'some',
      userId: 2,
      userImg: 'https://randomuser.me/api/portraits/thumb/women/84.jpg',
      folowed: true,
      time:'34 min'
    },
    {
      type: 'comment',
      name: 'some',
      userId: 1,
      userImg: 'https://randomuser.me/api/portraits/thumb/women/11.jpg',
      srcId: 'https://randomuser.me/api/portraits/thumb/women/41.jpg',
      comment: 'add that particular to the returned',
      time:'1 hr'
    },
    {
      type: 'folowing',
      name: 'some',
      userId: 1,
      userImg: 'https://randomuser.me/api/portraits/thumb/women/71.jpg',
      folowed: true,
      time:'3 hr'
    }
  ];

const propTypes = {
  dispatch: PropTypes.func
};

class Notification extends Component {
  constructor() {
    super();
  }

  render() {
    const nlen = notifications.length;
    const list = notifications.map(
        (ite, iix) => {
          console.log(ite.type);
          switch (ite.type) {
            case 'folowing':
              return [(
                <div key={iix} className='dropdown-item dropdown-notification'>
                  <div>
                    <img className='img-circle' src={ite.userImg}
                      onClick={() => {
                        alert('uUser called');
                      }}
                    />
                  </div>
                  <div className='dropdown-description'>
                    <strong>{ ite.name }</strong> started folowing you. { ite.time }
                  </div>
                  <div>
                    <button type='button'
                      className={ite.folowed ? 'btn btn-default' : 'btn btn-primary'}
                    >
                      {ite.folowed ? 'following' : 'follow'}
                    </button>
                  </div>
                </div>
              ), (
                <hr key={iix + nlen + 1} />
              )];
            case 'like':
              return [(
                <div key={iix} className='dropdown-item dropdown-notification' >
                  <div>
                    <img className='img-circle' src={ite.userImg}
                      onClick={() => {
                        alert('uUser called');
                      }}
                    />
                  </div>
                  <div className='dropdown-description'>
                    <strong>{ ite.name }</strong> like your photo. { ite.time }
                  </div>
                  <div>
                    <img className='img-detail' src={ite.srcId}
                      onClick={() => {
                        alert('detail called');
                      }}
                    />
                  </div>
                </div>
              ), (
                <hr key={iix + nlen + 1} />
              )];
            case 'comment':
              return [(
                <div key={iix} className='dropdown-item dropdown-notification' >
                  <div>
                    <img className='img-circle' src={ite.userImg}
                      onClick={() => {
                        alert('uUser called');
                      }}
                    />
                  </div>
                  <div className='dropdown-description'>
                    <strong>{ ite.name }</strong> commented: { ite.comment } { ite.time }
                  </div>
                  <div>
                    <img className='img-detail' src={ite.srcId}
                      onClick={() => {
                        alert('comment called');
                      }}
                    />
                  </div>
                </div>
              ), (
                <hr key={iix + nlen + 1} />
              )];
            default:
              return <div key={iix} className='dropdown-item' ><strong>Error</strong></div>;
          }
        }
      );
    list[list.length - 1].pop();
    return (
      <div className='dropdown'>
        <button className='btn btn-primary dropdown-toggle'
          type='button' id='notificationmenu' data-toggle='dropdown'
          aria-haspopup='true' aria-expanded='false'
        >
          <img src ='/img/notifications.png' alt='notifications'/>
        </button>
        <div className='dropdown-menu dropdown-menu-right' aria-labelledby='notifications'>
          { list }
        </div>
      </div>
    );
  }
}

Notification.propTypes = propTypes;

export default Notification;

import React, { Component } from 'react';
import './Post.css';

var md = require('markdown-it')();

const props = {
  postProfile: 'https://s5.postimg.org/60a0qaz0n/rancormock.png',
  postDisplay: 'Rancor',
  postUsername: 'therancor',
  ttl: '10m',
  postBody: "BREAKING: `Teenage farm boy attacks government battlestation killing thousands of soldiers and contract workers.` #prayfortheempire #deathstar",
  shares: '1',
  likes: '10',
  mediaLinks: ['https://s5.postimg.org/71y72f9af/mediaimage2.png', 'https://s5.postimg.org/s42rui407/urlimage.png', 'https://s5.postimg.org/s42rui407/urlimage.png']
};

var postBodyParsed = md.render(props.postBody);

class Post extends Component {
  constructor() {
    super();    
  }
  mediaCount() {
    if (props.mediaLinks) {
      switch (props.mediaLinks.length) {
        case 1:
          return (
            <div className='post-media'>
              <img className='single-media' src={props.mediaLinks[0]}/>
            </div>
          )
        case 2:
          return (
            <div className='post-media'>
              <img className='side-by-side' src={props.mediaLinks[0]}/>
              <img className='side-by-side' src={props.mediaLinks[1]}/>
            </div>
          )
        case 3:
          return (
            <div className='post-media'>
              <div className="stacked-media">
                  <img className='three-media-1' src={props.mediaLinks[0]}/>
              </div>
              <div className="stacked-media">
                <img className='three-media-2' src={props.mediaLinks[1]}/>
                <img className='three-media-3' src={props.mediaLinks[2]}/>
              </div>
            </div>
          )
        case 4:
          return (
            <div className='post-media'>
              <img className='side-by-side' src={props.mediaLinks[0]}/>
              <img className='side-by-side' src={props.mediaLinks[1]}/>
              <img className='side-by-side' src={props.mediaLinks[2]}/>
              <img className='side-by-side' src={props.mediaLinks[3]}/>
            </div>
          )
        default:
          break;
      }
    }
    return true;
  }
  render() {
    return (
      <div className='post'>
        <img className='post-profile' src={props.postProfile}/>
        <div className='post-info'>
          <p className='post-display-name'>{props.postDisplay}</p>
          <p className='post-username'>@{props.postUsername}</p>
          <p className='post-ttl'>{props.ttl}</p>
        </div>
        <img className='post-menu' src='img/options@3x.png'
          onClick={() => {
            alert('option was clicked');
          }}
        />

        <div className='post-body-container'>
          <div dangerouslySetInnerHTML={{
              __html: postBodyParsed
            }}></div>
        </div>

        {this.mediaCount()}

        <div className='post-buttons'>
          <img src='img/reply@3x.png' className='post-comment'
            onClick={() => {
              alert('reply was clicked');
            }}
          />
          <div
            onClick={() => {
              alert('reblast was clicked');
            }}
          >
            <img src='img/reblasts@3x.png' className='post-share'/>
            <p className='counter'>{props.shares}</p>
          </div>
          <div
            onClick={() => {
              alert('heart was clicked');
            }}
          >
            <img src='img/heart_outline@3x.png' className='post-like'/>
            <p className='counter'>{props.likes}</p>
          </div>
          <img src='img/dm@3x.png' className='post-dm'
            onClick={() => {
              alert('dm button was clicked');
            }}
          />
        </div>
      </div>
    );
  }
}

export default Post;

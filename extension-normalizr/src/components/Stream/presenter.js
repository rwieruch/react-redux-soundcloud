import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

function LikeButton({ track, onLike }) {
  return (
    <span>
      {
        track.origin.user_favorite ?
          <button type="button" onClick={() => onLike(track)}>Unlike</button> :
          <button type="button" onClick={() => onLike(track)}>Like</button>
      }
    </span>
  );
}

class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { activeTrack } = this.props;

    if (activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { user, tracks = [], activeTrack, onAuth, onPlay, onLike } = this.props;

    return (
      <div>
        <div>
          {
            user ?
              <div>{user.username}</div> :
              <button onClick={onAuth} type="button">Login</button>
          }
        </div>
        <br/>
        <div>
        {
          tracks.map((track, key) => {
              return (
                <div className="track" key={key}>
                  {track.origin.title}
                  <button type="button" onClick={() => onPlay(track)}>Play</button>
                  <LikeButton track={track} onLike={onLike} />
                </div>
              );
          })
        }
        </div>
        <br/>
        {
          activeTrack ?
            <div>
              <div>
                Playing: {activeTrack.origin.title}
                <LikeButton track={activeTrack} onLike={onLike} />
              </div>
              <audio id="audio" ref="audio" src={`${activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio>
            </div>:
            null
        }
      </div>
    );
  }
}

export default Stream;

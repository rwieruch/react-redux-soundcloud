import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CLIENT_ID } from '../../constants/auth';

function LikeButton({ track, onLike }) {
  return (
    <span>
      {
        track.user_favorite ?
          <button type="button" onClick={() => onLike(track.id)}>Unlike</button> :
          <button type="button" onClick={() => onLike(track.id)}>Like</button>
      }
    </span>
  );
}

class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    const { activeTrackId } = this.props;

    if (activeTrackId) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { user, trackIds = [], trackEntities = {}, activeTrackId, onAuth, onPlay, onLike } = this.props;

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
          trackIds.map((id, key) => {
              return (
                <div className="track" key={key}>
                  {trackEntities[id].title}
                  <button type="button" onClick={() => onPlay(id)}>Play</button>
                  <LikeButton track={trackEntities[id]} onLike={onLike} />
                </div>
              );
          })
        }
        </div>
        <br/>
        {
          activeTrackId ?
            <div>
              <div>
                Playing: {trackEntities[activeTrackId].title}
                <LikeButton track={trackEntities[activeTrackId]} onLike={onLike} />
              </div>
              <audio id="audio" ref="audio" src={`${trackEntities[activeTrackId].stream_url}?client_id=${CLIENT_ID}`}></audio>
            </div>:
            null
        }
      </div>
    );
  }
}

export default Stream;

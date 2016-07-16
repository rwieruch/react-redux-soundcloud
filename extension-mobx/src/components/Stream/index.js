import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react'
import { CLIENT_ID } from '../../constants/auth';
import { auth } from '../../api/auth';
import userStore from '../../stores/userStore';
import trackStore from '../../stores/trackStore';

@observer
class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    if (trackStore.activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    return (
      <div>
        <div>
          {
            userStore.me ?
              <div>{userStore.me.username}</div> :
              <button onClick={auth} type="button">Login</button>
          }
        </div>
        <br/>
        <div>
        {
          (trackStore.tracks || []).map((track, key) => {
              return (
                <div className="track" key={key}>
                  {track.origin.title}
                  <button type="button" onClick={() => trackStore.activeTrack = track}>Play</button>
                </div>
              );
          })
        }
        </div>
        {
          trackStore.activeTrack ?
            <audio id="audio" ref="audio" src={`${trackStore.activeTrack.origin.stream_url}?client_id=${CLIENT_ID}`}></audio> :
            null
        }
      </div>
    );
  }
}

export default Stream;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

@observer
class Stream extends Component {

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if (!audioElement) { return; }

    if (this.props.trackStore.activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  render() {
    const { userStore, trackStore, clientId, onAuth } = this.props;

    return (
      <div>
        <div>
          {
            userStore.me ?
              <div>{userStore.me.username}</div> :
              <button onClick={onAuth} type="button">Login</button>
          }
        </div>
        <br/>
        <div>
        {
          trackStore.tracks.map((track, key) => {
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
            <audio id="audio" ref="audio" src={`${trackStore.activeTrack.origin.stream_url}?client_id=${clientId}`}></audio> :
            null
        }
      </div>
    );
  }
}

export default Stream;

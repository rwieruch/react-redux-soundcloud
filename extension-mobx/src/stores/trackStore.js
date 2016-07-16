import { observable, computed } from 'mobx';

class TrackStore {

  @observable tracks;
  @observable activeTrack;

  constructor(tracks = []) {
    this.tracks = tracks;
    this.activeTrack = null;
  }

}

const trackStore = new TrackStore();

export default trackStore;
export { TrackStore };

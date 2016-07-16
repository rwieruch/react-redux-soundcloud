import { observable, computed } from 'mobx';

class TrackStore {

  @observable tracks;
  @observable activeTrack;

  constructor() {
    this.tracks = null;
    this.activeTrack = null;
  }

}

const trackStore = new TrackStore();

export default trackStore;

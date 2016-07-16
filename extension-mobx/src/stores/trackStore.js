import { observable, computed } from 'mobx';

class TrackStore {

  @observable tracks;

  constructor() {
    this.tracks = null;
  }

}

const trackStore = new TrackStore();

export default trackStore;

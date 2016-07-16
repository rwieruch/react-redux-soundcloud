import { observable, computed } from 'mobx';

class UserStore {

  @observable me;

  constructor() {
    this.me = null;
  }

}

const userStore = new UserStore();

export default userStore;
export { UserStore };

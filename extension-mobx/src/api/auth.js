import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import userStore from '../stores/userStore';
import trackStore from '../stores/trackStore';

export function auth() {
  SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });
  SC.connect().then(fetchMe);
};

function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((me) => {
      userStore.me = me;
      fetchStream(me, session);
    });
}

function fetchStream(me, session) {
  fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
    .then((response) => response.json())
    .then((data) => {
      trackStore.tracks = data.collection;
    });
}
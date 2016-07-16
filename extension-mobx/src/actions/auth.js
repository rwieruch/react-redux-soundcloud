import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';
import userStore from '../stores/userStore';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export function auth() {
  SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

  SC.connect().then((session) => {
    fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((me) => {
        userStore.me = me;
        console.log(userStore);
        console.log(userStore.me);
        // dispatch(setMe(me));
        // dispatch(fetchStream(me, session));
      });
  });
};

function fetchStream(me, session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTracks(data.collection));
      });
  };
}
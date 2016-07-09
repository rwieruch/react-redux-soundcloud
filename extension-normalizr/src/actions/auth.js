import { map } from 'lodash';
import { arrayOf, normalize } from 'normalizr';
import trackSchema from '../schemas/track';
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export function auth() {
    return function (dispatch) {
        SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

        SC.connect().then((session) => {
          fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
            .then((response) => response.json())
            .then((me) => {
              dispatch(setMe(me));
              dispatch(fetchStream(me, session));
            });
        });
    };
};

function fetchStream(me, session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        const normalized = normalize(map(data.collection, 'origin'), arrayOf(trackSchema));
        console.log(normalized);
        dispatch(setTracks(data.collection));
      });
  };
}
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import { actionCreators as trackActionCreators } from './track';

const ME_SET = 'auth/ME_SET';

function doSetMe(user) {
  return {
    type: ME_SET,
    user
  };
}

function doAuth() {
  return function (dispatch) {
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });

    SC.connect().then((session) => {
      fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
        .then((response) => response.json())
        .then((me) => {
          dispatch(doSetMe(me));
          dispatch(doFetchStream(me, session));
        });
    });
  };
};

function doFetchStream(me, session) {
  return function (dispatch) {
    fetch(`//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(trackActionCreators.doSetTracks(data.collection));
      });
  };
}

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ME_SET:
      return applySetMe(state, action);
  }
  return state;
}

function applySetMe(state, action) {
  const { user } = action;
  return { ...state, user };
}

const actionCreators = {
  doAuth
};

const actionTypes = {
  ME_SET
};

export {
  actionCreators,
  actionTypes
};

export default reducer;

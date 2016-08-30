import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from '../constants/auth';
import * as actionTypes from '../constants/actionTypes';
import { setTracks } from '../actions/track';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/dom/ajax';

export function auth() {
  return {
    type: actionTypes.AUTH
  };
}

function setSession(session) {
  return {
    type: actionTypes.SESSION_SET,
    session
  };
}

function setMe(user) {
  return {
    type: actionTypes.ME_SET,
    user
  };
}

export const authEpic = (action$) =>
  action$.ofType(actionTypes.AUTH)
    .mergeMap(() =>
      Observable.from(SC.connect())
        .map(setSession)
    );

export const fetchMeEpic = (action$) =>
  action$.ofType(actionTypes.SESSION_SET)
    .mergeMap((action) =>
      Observable.ajax({
          crossDomain: true,
          url: `//api.soundcloud.com/me?oauth_token=${action.session.oauth_token}`
        })
        .map(({ response }) => setMe(response))
    );

export const fetchStreamEpic = (action$) =>
  action$.ofType(actionTypes.SESSION_SET)
    .mergeMap((action) =>
      Observable.ajax({
          crossDomain: true,
          url: `//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${action.session.oauth_token}`
        })
        .map(({ response }) => setTracks(response.collection))
    );

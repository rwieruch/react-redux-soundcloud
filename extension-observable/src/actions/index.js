import { combineEpics } from 'redux-observable';
import { auth, authEpic, fetchMeEpic, fetchStreamEpic } from './auth';
import { setTracks, playTrack } from './track';

const rootEpic = combineEpics(
  authEpic,
  fetchMeEpic,
  fetchStreamEpic
);

export {
  auth,
  setTracks,
  playTrack,
  rootEpic
};
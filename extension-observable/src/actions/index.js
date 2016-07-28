import { combineEpics } from 'redux-observable';
import { auth, authEpic } from './auth';
import { setTracks, playTrack } from './track';

const rootEpic = combineEpics(
  authEpic,
);

export {
  auth,
  setTracks,
  playTrack,
  rootEpic
};
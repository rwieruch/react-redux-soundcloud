import * as actionTypes from '../constants/actionTypes';
import { findIndex } from 'lodash';

const initialState = {
    tracks: [],
    activeTrack: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TRACKS_SET:
      return setTracks(state, action);
    case actionTypes.TRACK_PLAY:
      return setPlay(state, action);
    case actionTypes.TRACK_LIKE:
      return setLike(state, action);
  }
  return state;
}

function setTracks(state, action) {
  const { tracks } = action;
  return { ...state, tracks };
}

function setPlay(state, action) {
  const { track } = action;
  return { ...state, activeTrack: track };
}

function setLike(state, action) {
  const { track } = action;

  const index = findIndex(state.tracks, (t) => t.origin.id === track.origin.id);
  const newTrack = { ...track, origin: { ...track.origin, user_favorite: !state.tracks[index].origin.user_favorite } };

  const tracks = [
    ...state.tracks.slice(0, index),
    newTrack,
    ...state.tracks.slice(index + 1)
  ];

  return { ...state, tracks };
}
import * as actionTypes from '../constants/actionTypes';
import { findIndex } from 'lodash';

const initialState = {
    trackEntities: {},
    trackIds: [],
    activeTrackId: null
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
  const { trackEntities, trackIds } = action;
  return { ...state, trackEntities, trackIds };
}

function setPlay(state, action) {
  const { trackId } = action;
  return { ...state, activeTrackId: trackId };
}

function setLike(state, action) {
  const { trackId } = action;
  const newTrack = { ...state.trackEntities[trackId], user_favorite: !state.trackEntities[trackId].user_favorite };
  return { ...state, trackEntities: { ...state.trackEntities, [trackId]: newTrack } };
}
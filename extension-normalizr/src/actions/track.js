import * as actionTypes from '../constants/actionTypes';

export function setTracks(trackEntities, trackIds) {
  return {
    type: actionTypes.TRACKS_SET,
    trackEntities,
    trackIds
  };
};

export function playTrack(trackId) {
  return {
    type: actionTypes.TRACK_PLAY,
    trackId
  };
}

export function likeTrack(trackId) {
  return {
    type: actionTypes.TRACK_LIKE,
    trackId
  };
}
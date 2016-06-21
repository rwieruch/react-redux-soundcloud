// @flow

type SetTracksAction = {
    type: string;
    tracks: Array<Track>;
};

type PlayTrackAction = {
    type: string;
    track: Track;
};

type Action = SetTracksAction | PlayTrackAction;

import * as actionTypes from '../constants/actionTypes';

export function setTracks(tracks: Array<Track>): Action {
  return {
    type: actionTypes.TRACKS_SET,
    tracks
  };
};

export function playTrack(track: Track): Action {
  return {
    type: actionTypes.TRACK_PLAY,
    track
  };
}
import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../api/auth';
import Stream from './presenter';

function mapStateToProps(state) {
  const { user } = state.auth;
  const { tracks, activeTrack } = state.track;
  return {
    user,
    tracks,
    activeTrack
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onPlay: () => {},
    onAuth: auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
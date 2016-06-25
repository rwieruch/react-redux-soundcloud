import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
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
    onPlay: bindActionCreators(actions.playTrack, dispatch),
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
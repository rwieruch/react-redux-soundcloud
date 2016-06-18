import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import track from './track';

export default combineReducers({
  auth,
  track,
  routing: routerReducer
});
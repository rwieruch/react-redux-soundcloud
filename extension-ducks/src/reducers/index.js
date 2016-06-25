import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '../ducks/auth';
import track from '../ducks/track';

export default combineReducers({
  auth,
  track,
  routing: routerReducer
});
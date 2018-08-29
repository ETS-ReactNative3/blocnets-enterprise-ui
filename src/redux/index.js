import { combineReducers } from 'redux';
import {
  getData,
  loadingView,
  requestFailed
}
  from './reducers/main.reducers';

export default combineReducers({
  getData,
  loadingView,
  requestFailed
});

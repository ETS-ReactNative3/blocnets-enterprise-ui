import { combineReducers } from 'redux';
import {
  requestSucceededReducer,
  checkAuthReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  checkAuthReducer,
  requestSucceededReducer,
});

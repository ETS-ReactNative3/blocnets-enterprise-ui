import { combineReducers } from 'redux';
import {
  authReducer,
  sarReducer,
  bomReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  authReducer,
  bomReducer,
  sarReducer
});

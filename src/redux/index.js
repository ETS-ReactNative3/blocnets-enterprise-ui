import { combineReducers } from 'redux';
import {
  authReducer,
  sarReducer,
  bomReducer,
  dreReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  authReducer,
  bomReducer,
  sarReducer,
  dreReducer
});

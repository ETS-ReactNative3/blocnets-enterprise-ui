import { combineReducers } from 'redux';
import {
  authReducer,
  bomReducer,
  sarReducer,
  prdReducer,
  dreReducer,
  umaReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  authReducer,
  bomReducer,
  sarReducer,
  prdReducer,
  dreReducer,
  umaReducer
});

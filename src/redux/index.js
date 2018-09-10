import { combineReducers } from 'redux';
import {
  authReducer,
  bomReducer,
  sarReducer,
  prdReducer,
  dreReducer,
  umaReducer,
  spawnConstructReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  authReducer,
  bomReducer,
  sarReducer,
  prdReducer,
  dreReducer,
  umaReducer,
  spawnConstructReducer
});

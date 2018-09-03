import { combineReducers } from 'redux';
import {
  requestSucceededReducer,
  checkAuthReducer,
    updateShippingDataReducer
}
  from './reducers/main.reducers';

export default combineReducers({
    updateShippingDataReducer,
  checkAuthReducer,
  requestSucceededReducer,
});

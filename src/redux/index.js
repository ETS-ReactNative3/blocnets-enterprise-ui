import { combineReducers } from 'redux';
import {
  requestSucceededReducer,
  checkAuthReducer,
  updateShippingDataByShipmentIDReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  updateShippingDataByShipmentIDReducer,
  checkAuthReducer,
  requestSucceededReducer,
});

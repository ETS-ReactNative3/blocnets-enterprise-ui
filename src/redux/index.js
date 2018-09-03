import { combineReducers } from 'redux';
import {
  checkAuthReducer,
  updateShippingDataReducer,
  billOfMaterialsReducer
}
  from './reducers/main.reducers';

export default combineReducers({
  updateShippingDataReducer,
  checkAuthReducer,
  billOfMaterialsReducer
});

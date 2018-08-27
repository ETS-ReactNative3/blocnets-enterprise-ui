import { combineReducers } from 'redux'
import trackerView from './actions/tracker.view.action'
import BillOfMaterials from './actions/bill-of-materials.view.action'
 
export default combineReducers({
  trackerView,
  BillOfMaterials
});

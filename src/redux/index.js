import { combineReducers } from 'redux'
import mainView from './actions/main.view.action'
import trackerView from './actions/tracker.view.action'
import ebomView from './actions/eBOM.view.action'
 
export default combineReducers({
  mainView,
  trackerView,
  ebomView
});

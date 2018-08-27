import { connect } from 'react-redux';
import TrackerView from './tracker.view';
import * as actions from '../../redux/actions/tracker.view.action';

const mapStateToProps = ({ trackerView }) => ({
  error: trackerView.error
});

export default connect(mapStateToProps, actions)(TrackerView);
import { connect } from 'react-redux';
import ReceivingView from './receiving.view';
import * as actions from '../../redux/actions/receiving.view.action';

const mapStateToProps = ({ receivingView }) => ({
  error: receivingView.error
});

export default connect(mapStateToProps, actions)(ReceivingView);
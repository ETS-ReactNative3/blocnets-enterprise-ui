import { connect } from 'react-redux';
import ShippingView from './shipping.view';
import * as actions from '../../redux/actions/main.actions';

const mapStateToProps = ({ shippingView }) => ({
  error: shippingView.error
});

export default connect(mapStateToProps, actions)(ShippingView);
import { connect } from 'react-redux';
import ShippingView from './shipping.view';
import * as actions from '../../redux/actions/shipping.view.action';

const mapStateToProps = ({ shippingView }) => ({
  error: shippingView.error
});

export default connect(mapStateToProps, actions)(ShippingView);
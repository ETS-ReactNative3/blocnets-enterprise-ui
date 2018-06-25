import { connect } from 'react-redux';
import eBOMView from './eBOM.view';
import * as actions from '../../redux/actions/eBOM.view.action';

const mapStateToProps = ({ eBOMView }) => ({
  error: eBOMView.error
});

export default connect(mapStateToProps, actions)(eBOMView);
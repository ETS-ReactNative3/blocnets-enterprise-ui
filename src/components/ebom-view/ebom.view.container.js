import { connect } from 'react-redux';
import EBOMView from './ebom.view';
import EBOMReview from './ebom.review.view';
import * as actions from '../../redux/actions/eBOM.view.action';

const mapStateToProps = ({ EBOMView }) => ({
  error: EBOMView.error
});

export default connect(mapStateToProps, actions)(EBOMView);
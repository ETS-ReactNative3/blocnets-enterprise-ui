import { connect } from 'react-redux';
import DocumentReviewAndEntry from './document.review.entry.view';
import * as actions from '../../redux/actions/main.actions';

const mapStateToProps = ({ documentReviewAndEntry }) => ({
  error: documentReviewAndEntry.error
});

export default connect(mapStateToProps, actions)(DocumentReviewAndEntry);
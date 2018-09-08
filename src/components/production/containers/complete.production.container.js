import { connect } from 'react-redux';
import CompleteProduction from '../views/complete.production.view';
import * as actions from '../../redux/actions/main.actions';

const mapStateToProps = ({ CompleteProduction }) => ({
  error: CompleteProduction.error
});

export default connect(mapStateToProps, actions)(CompleteProduction); 
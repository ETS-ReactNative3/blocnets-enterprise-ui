import { connect } from 'react-redux';
import StartProduction from '../views/start.production.view';
import * as actions from '../../redux/actions/main.actions';

const mapStateToProps = ({ StartProduction}) => ({
  error: StartProduction.error
});

export default connect(mapStateToProps, actions)(StartProduction); 
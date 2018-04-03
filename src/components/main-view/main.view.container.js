import { connect } from 'react-redux';
import MainArea from './MainArea';
import * as actions from '../../redux/actions/main.view.action';

const mapStateToProps = ({ mainArea }) => ({
  locations: mainArea.locations,
  isFetching: mainArea.isFetching,
  error: mainArea.error
});

export default connect(mapStateToProps, actions)(MainArea);
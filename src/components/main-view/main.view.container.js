import { connect } from 'react-redux';
import MainView from './main.view';
import * as actions from '../../redux/actions/main.view.action';

const mapStateToProps = ({ mainView }) => ({
  error: MainView.error
});

export default connect(mapStateToProps, actions)(MainView);
import { connect } from 'react-redux';
import EBOMView from './ebom.view';
import EBOMReview from './ebom.review.view';
import * as actions from '../../redux/actions/eBOM.view.action';
import ReactDOM from "react-dom";
import React from "react";
import MainView from "../main-view/main.view";
import ReceivingView from "../receiving-view/receiving.view";


ReactDOM.render(
    <EBOMView />,
    document.getElementById('ebomView')
);

const mapStateToProps = ({ ebomView }) => ({
    error: ebomView.error
});

export default connect(mapStateToProps, actions)(EBOMView);
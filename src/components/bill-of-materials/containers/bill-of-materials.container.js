import { connect } from 'react-redux';
import BillOfMaterials from '../bill-of-materials';
//import BillOfMaterialsReview from '../views/bill-of-materials.review.view';
import * as actions from '../../../redux/actions/bill-of-materials.view.action';
import ReactDOM from "react-dom";
import React from "react";


ReactDOM.render(
    <BillOfMaterials />,
    document.getElementById('billOfMaterials')
);

const mapStateToProps = ({ BillOfMaterials}) => ({
    error: BillOfMaterials.error
});

export default connect(mapStateToProps, actions)(BillOfMaterials);
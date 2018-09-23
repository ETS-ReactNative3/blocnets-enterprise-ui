import { connect } from 'react-redux';
import BillOfMaterials from '../bill-of-materials';
import * as actions from '../../../redux/actions/BOM/bill-of-materials.actions';
import ReactDOM from "react-dom";
import React from "react";


ReactDOM.render(
    <BillOfMaterials />,
    document.getElementById('billOfMaterials')
);

const mapStateToProps = ({ billOfMaterials}) => ({
    error: billOfMaterials.error
});

export default connect(mapStateToProps, actions)(BillOfMaterials);
import React from 'react';
//import BillOfMaterialsContainer from './containers/bill-of-materials.container'
import BillOfMaterialsForm from './views/bill-of-materials.form.view';
import BillOfMaterialsReview from './views/bill-of-materials.review.view';

class BillOfMaterials extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showBillOfMaterialsForm: true,
            showBillOfMaterialsReview: false,
            data: ''
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        this.setState({
            showBillOfMaterialsForm: data.showBillOfMaterialsMain,
            showBillOfMaterialsReview: data.showBillOfMaterialsReview,
            data: data
        });
    }

    render() {
        return (
            <div id="billOfMaterials">
                {this.state.showBillOfMaterialsForm === true ? 
                <BillOfMaterialsForm show={this.state.showBillOfMaterialsForm === true} viewHandler={this.handleData}/> : ""}
                {this.state.showBillOfMaterialsReview === true ? 
                <BillOfMaterialsReview data={this.state} show={this.state.showBillOfMaterialsReview === true}  /> : ""}
            </div>
        )
    }

}

export default BillOfMaterials;
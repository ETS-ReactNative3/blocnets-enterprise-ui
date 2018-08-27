import React from 'react';
import BillOfMaterialsForm from './views/bill-of-materials.form.view';
import BillOfMaterialsReview from './views/bill-of-materials.review.view';
import BillOfMaterialsTree from './views/bill-of-materials.tree.view';

class BillOfMaterials extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showBillOfMaterialsForm: true,
            showBillOfMaterialsReview: false,
            showBillOfMaterialsTree: false,
            data: ''
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        this.setState({
            showBillOfMaterialsForm: data.showBillOfMaterialsForm,
            showBillOfMaterialsReview: data.showBillOfMaterialsReview,
            showBillOfMaterialsTree: data.showBillOfMaterialsTree,
            data: data
        });
    }

    render() {
        return (
            <div id="billOfMaterials">
                {this.state.showBillOfMaterialsForm === true ? 
                <BillOfMaterialsForm show={this.state.showBillOfMaterialsForm === true} viewHandler={this.handleData} /> : ""}
                {this.state.showBillOfMaterialsReview === true ? 
                <BillOfMaterialsReview data={this.state} show={this.state.showBillOfMaterialsReview === true} viewHandler={this.handleData}/> : ""}
                {this.state.showBillOfMaterialsTree === true ?
                    <BillOfMaterialsTree data={this.state} show={this.state.showBillOfMaterialsTree === true} viewHandler={this.handleData}/> : ""}
            </div>
        )
    }

}

export default BillOfMaterials;
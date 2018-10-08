import React from 'react';
import BillOfMaterialsForm from './views/bill-of-materials.form.view';
import BillOfMaterialsReview from './views/bill-of-materials.review.view';

class BillOfMaterials extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showBillOfMaterialsForm: true,
            showBillOfMaterialsReview: false,
            eBOMData: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleData = (showBillOfMaterialsForm, showBillOfMaterialsReview, eBOMData, snackbar) => {
        this.setState({
            showBillOfMaterialsForm: showBillOfMaterialsForm,
            showBillOfMaterialsReview: showBillOfMaterialsReview,
            eBOMData: eBOMData,
            snackbar: snackbar
        });
    };

    render() {
        return (
            <div id="billOfMaterials">
                {this.state.showBillOfMaterialsForm === true ?
                    <BillOfMaterialsForm
                        showBillOfMaterialsForm={this.state.showBillOfMaterialsForm}
                        showBillOfMaterialsReview={this.state.showBillOfMaterialsReview}
                        eBOMData={this.state.eBOMData}
                        snackbar={this.state.snackbar}
                        viewHandler={this.handleData} />
                    : ""}
                {this.state.showBillOfMaterialsReview === true ?
                    <BillOfMaterialsReview
                        showBillOfMaterialsForm={this.state.showBillOfMaterialsForm}
                        showBillOfMaterialsReview={this.state.showBillOfMaterialsReview}
                        eBOMData={this.state.eBOMData}
                        snackbar={this.state.snackbar}
                        viewHandler={this.handleData} />
                    : ""}
            </div>
        )
    }

}

export default BillOfMaterials;
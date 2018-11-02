import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';
import { connect } from 'react-redux';
import {
    createMasterDataKeys
} from '../../../redux/actions/BOM/create.master.data.action';
import {
    updateBillOfMaterialsByMaterialID,
    updateBillOfMaterialsByMaterialName,
    updateBillOfMaterialsByMaterialDesc,
    updateBillOfMaterialsByPartNumber,
    updateBillOfMaterialsByPartName,
    updateBillOfMaterialsByPartDesc
} from '../../../redux/actions/BOM/bill-of-materials.actions';

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return { id: counter, info1, info2 };
}

function createTableContent(eBOMData) {
    let tableContent = [
        createData('Material ID', eBOMData.materialID),
        createData('Material Name', eBOMData.materialName),
        createData('Material Description', eBOMData.materialDescription),
        /* RELEASE-90: Hide Part No., Part Name and Part Description fields.
        createData('Part No.', eBOMData.partNo),
        createData('Part Name', eBOMData.partName),
        createData('Part Description', eBOMData.partDescription),
        */
        createData('Outbound Customer Data', ''),
        createData('Company Name / Address', eBOMData.outboundCompanyName + ' / ' + eBOMData.outboundAddressLine1 + ' '
            + eBOMData.outboundAddressLine2 + ' ' + eBOMData.outboundCity + ' ' + eBOMData.outboundStateProvince + ' '
            + eBOMData.outboundPostalCode + ' ' + eBOMData.outboundCountry)
    ];
    for (let i = 0; i < eBOMData.outboundList.length; i++) {
        tableContent.push(createData('Company Name / Address', eBOMData.outboundList[i].outboundCompanyName + ' / '
            + eBOMData.outboundList[i].outboundAddressLine1 + ' ' + eBOMData.outboundList[i].outboundAddressLine2 + ' '
            + eBOMData.outboundList[i].outboundCity + ' ' + eBOMData.outboundList[i].outboundStateProvince + ' '
            + eBOMData.outboundList[i].outboundPostalCode + ' ' + eBOMData.outboundList[i].outboundCountry));
    }
    tableContent.push(
        createData('Material Validation Characteristics', ''),
        createData('Volume', eBOMData.volume),
        createData('Weight', eBOMData.weight),
        createData('Length', eBOMData.materialLength),
        createData('Width', eBOMData.width),
        createData('Height', eBOMData.height),
        createData('Temperature Limits', eBOMData.temperatureLimits),
        createData('Shock/Vibration', eBOMData.shockVibration),
        createData('Altitude Restrictions', eBOMData.altitudeRestrictions),
        createData('Compression Restrictions', eBOMData.compressionRestrictions),
        createData('Always Upright', eBOMData.alwaysUpright2),
        createData('Metallic', eBOMData.metallic2),
        createData('Hazmat', eBOMData.hazmat2),
        createData('Magnetic', eBOMData.magnetic2),
        createData('Length Tolerance', eBOMData.lengthTolerance),
        createData('Round Tolerance', eBOMData.roundTolerance),
        createData('Non-Skid Tolerance', eBOMData.nonSkidTolerance),
        createData('Supplier Order Quantities Controls', ''),
        createData('Minimum Economic Order Quantities', eBOMData.minEOQuantities),
        createData('Maximum Economic Order Quantities', eBOMData.maxEOQuantities),
        createData('Maximum Economic Product Withdraw Rate', eBOMData.maxEPWithdrawRate),
        createData('Minimum Order Lead Times', eBOMData.minOrderLeadTimes),
        createData('Inbound Supplier(s)', ''),
        createData('Address / Supplier Payment Terms / Material ID / Quantity', eBOMData.inboundAddressLine1 + ' '
            + eBOMData.inboundAddressLine2 + ' ' + eBOMData.inboundCity + ' ' + eBOMData.inboundStateProvince + ' ' + eBOMData.inboundPostalCode
            + ' ' + eBOMData.inboundCountry + ' / ' + eBOMData.inboundSupplierPaymentTerms + ' / ' + eBOMData.inboundMaterialID + ' / '
            + eBOMData.inboundQuantity)
    );
    for (let i = 0; i < eBOMData.inboundList.length; i++) {
        tableContent.push(createData('Address / Supplier Payment Terms / Material ID / Quantity',
            eBOMData.inboundList[i].inboundAddressLine1 + ' ' + eBOMData.inboundList[i].inboundAddressLine2 + ' '
            + eBOMData.inboundList[i].inboundCity + ' ' + eBOMData.inboundList[i].inboundStateProvince + ' '
            + eBOMData.inboundList[i].inboundPostalCode + ' ' + eBOMData.inboundList[i].inboundCountry + ' / '
            + eBOMData.inboundList[i].inboundSupplierPaymentTerms + ' / ' + eBOMData.inboundList[i].inboundMaterialID + ' / '
            + eBOMData.inboundList[i].inboundQuantity));
    }
    return tableContent;
}

class BillOfMaterialsReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            rows: createTableContent(this.props.eBOMData),
            snackbar: this.props.snackbar
        };
    }

    handleSubmit = () => {
        this.props.data.bomReducer.createMasterDataMaterialIdKeyError = '';
        this.props.data.bomReducer.createMasterDataMaterialNameKeyError = '';
        this.props.data.bomReducer.createMasterDataMaterialDescKeyError = '';
        this.props.data.bomReducer.createMasterDataPartNoError = '';
        this.props.data.bomReducer.createMasterDataPartNameError = '';
        this.props.data.bomReducer.createMasterDataPartDescError = '';
        this.props.data.bomReducer.updateBillOfMaterialsByMaterialIDError = '';
        this.props.data.bomReducer.updateBillOfMaterialsByMaterialNameError = '';
        this.props.data.bomReducer.updateBillOfMaterialsByMaterialDescError = '';
        this.props.data.bomReducer.updateBillOfMaterialsByPartNumberError = '';
        this.props.data.bomReducer.updateBillOfMaterialsByPartNameError = '';
        this.props.data.bomReducer.updateBillOfMaterialsByPartDescError = '';
        let outbound = [{
            outboundCompanyName: this.props.eBOMData.outboundCompanyName,
            outboundCountry: this.props.eBOMData.outboundCountry,
            outboundAddressLine1: this.props.eBOMData.outboundAddressLine1,
            outboundAddressLine2: this.props.eBOMData.outboundAddressLine2,
            outboundCity: this.props.eBOMData.outboundCity,
            outboundStateProvince: this.props.eBOMData.outboundStateProvince,
            outboundPostalCode: this.props.eBOMData.outboundPostalCode
        }];
        for (let i = 0; i < this.props.eBOMData.outboundList.length; i++) {
            outbound.push({
                outboundCompanyName: this.props.eBOMData.outboundList[i].outboundCompanyName,
                outboundCountry: this.props.eBOMData.outboundList[i].outboundCountry,
                outboundAddressLine1: this.props.eBOMData.outboundList[i].outboundAddressLine1,
                outboundAddressLine2: this.props.eBOMData.outboundList[i].outboundAddressLine2,
                outboundCity: this.props.eBOMData.outboundList[i].outboundCity,
                outboundStateProvince: this.props.eBOMData.outboundList[i].outboundStateProvince,
                outboundPostalCode: this.props.eBOMData.outboundList[i].outboundPostalCode
            })
        }
        let inbound = [{
            inboundCountry: this.props.eBOMData.inboundCountry,
            inboundAddressLine1: this.props.eBOMData.inboundAddressLine1,
            inboundAddressLine2: this.props.eBOMData.inboundAddressLine2,
            inboundCity: this.props.eBOMData.inboundCity,
            inboundStateProvince: this.props.eBOMData.inboundStateProvince,
            inboundPostalCode: this.props.eBOMData.inboundPostalCode,
            inboundSupplierPaymentTerms: this.props.eBOMData.inboundSupplierPaymentTerms,
            inboundMaterialID: this.props.eBOMData.inboundMaterialID,
            inboundQuantity: this.props.eBOMData.inboundQuantity
        }];
        for (let i = 0; i < this.props.eBOMData.inboundList.length; i++) {
            inbound.push({
                inboundCountry: this.props.eBOMData.inboundList[i].inboundCountry,
                inboundAddressLine1: this.props.eBOMData.inboundList[i].inboundAddressLine1,
                inboundAddressLine2: this.props.eBOMData.inboundList[i].inboundAddressLine2,
                inboundCity: this.props.eBOMData.inboundList[i].inboundCity,
                inboundStateProvince: this.props.eBOMData.inboundList[i].inboundStateProvince,
                inboundPostalCode: this.props.eBOMData.inboundList[i].inboundPostalCode,
                inboundSupplierPaymentTerms: this.props.eBOMData.inboundList[i].inboundSupplierPaymentTerms,
                inboundMaterialID: this.props.eBOMData.inboundList[i].inboundMaterialID,
                inboundQuantity: this.props.eBOMData.inboundList[i].inboundQuantity
            })
        }
        let eBOMError = [];
        this.setState({ showProgressLogo: true });
        let data = {
            file: '',
            outbound: outbound,
            inbound: inbound,
            material: {
                materialID: this.props.eBOMData.materialID,
                materialName: this.props.eBOMData.materialName,
                materialDescription: this.props.eBOMData.materialDescription,
                partNo: '',
                partName: '',
                partDescription: ''
            },
            materialValidationCharacteristics: {
                materialVolume: this.props.eBOMData.volume,
                materialVolumeUnits: '',
                materialWeight: this.props.eBOMData.weight,
                materialWeightUnits: '',
                materialLength: this.props.eBOMData.materialLength,
                materialLengthUnits: '',
                materialWidth: this.props.eBOMData.width,
                materialWidthUnits: '',
                materialHeight: this.props.eBOMData.height,
                materialHeightUnits: '',
                materialTempLimits: this.props.eBOMData.temperatureLimits,
                materialVibrationLimits: this.props.eBOMData.shockVibration,
                materialAltitudeRestrictions: this.props.eBOMData.altitudeRestrictions,
                materialCompressionRestrictions: this.props.eBOMData.compressionRestrictions,
                materialLengthTolerance: this.props.eBOMData.lengthTolerance,
                materialRoundTolerance: this.props.eBOMData.roundTolerance,
                materialNonSkidTolerance: this.props.eBOMData.nonSkidTolerance,
                materialAlwaysUpRight: this.props.eBOMData.alwaysUpright,
                materialOther: {
                    metallic: this.props.eBOMData.metallic,
                    hazmat: this.props.eBOMData.hazmat,
                    magnetic: this.props.eBOMData.magnetic
                }
            },
            supplierOrderQuantitiesControls: {
                minimumEconomicOrderQuantity: this.props.eBOMData.minEOQuantities,
                maximumEconomicOrderQuantity: this.props.eBOMData.maxEOQuantities,
                maximumEconomicProductWithdrawRate: this.props.eBOMData.maxEPWithdrawRate,
                minimumOrderLeadTime: this.props.eBOMData.minOrderLeadTimes
            }
        };
        if (this.props.eBOMData.editMasterMaterialData === true) {
            Promise.resolve(this.props.updateBillOfMaterialsByMaterialID(this.props.eBOMData.materialID, data))
                .then(() => {
                    this.props.updateBillOfMaterialsByMaterialName(this.props.eBOMData.materialName, data);
                })
                .then(() => {
                    if (this.props.eBOMData.materialDescription) {
                        this.props.updateBillOfMaterialsByMaterialDesc(this.props.eBOMData.materialDescription, data);
                    }
                })
                .then(() => {
                    if (this.props.eBOMData.partNo) {
                        this.props.updateBillOfMaterialsByPartNumber(this.props.eBOMData.partNo, data);
                    }
                })
                .then(() => {
                    if (this.props.eBOMData.partName) {
                        this.props.updateBillOfMaterialsByPartName(this.props.eBOMData.partName, data);
                    }
                })
                .then(() => {
                    if (this.props.eBOMData.partDescription) {
                        this.props.updateBillOfMaterialsByPartDesc(this.props.eBOMData.partDescription, data);
                    }
                })
                .then(() => {
                    if (this.props.data.bomReducer.updateBillOfMaterialsByMaterialIDError !== '') {
                        eBOMError.push(' Material ID');
                    }
                    if (this.props.data.bomReducer.updateBillOfMaterialsByMaterialNameError !== '') {
                        eBOMError.push(' Material Name');
                    }
                    if (this.props.data.bomReducer.updateBillOfMaterialsByMaterialDescError !== '') {
                        eBOMError.push(' Material Description');
                    }
                    if (this.props.data.bomReducer.updateBillOfMaterialsByPartNumberError !== '') {
                        eBOMError.push(' Part No.');
                    }
                    if (this.props.data.bomReducer.updateBillOfMaterialsByPartNameError !== '') {
                        eBOMError.push(' Part Name');
                    }
                    if (this.props.data.bomReducer.updateBillOfMaterialsByPartDescError !== '') {
                        eBOMError.push(' Part Description');
                    }
                    if (eBOMError.length === 0) {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Master Data successfully edited!',
                                open: true,
                                sbColor: 'Module-Snackbar-Success'
                            }
                        });
                        this.props.viewHandler('submit', this.state.snackbar);
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 5000,
                                message: 'Error in creating the Master Data! Please check the' + eBOMError + ', then try again.',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            }
                        });
                        this.props.viewHandler('cancel', this.state.snackbar);
                    }
                });
        } else {
            Promise.resolve(this.props.createMasterDataKeys(data))
                .then(() => {
                    if (this.props.data.bomReducer.createMasterDataMaterialIdKeyError !== '') {
                        eBOMError.push(' Material ID');
                    }
                    if (this.props.data.bomReducer.createMasterDataMaterialNameKeyError !== '') {
                        eBOMError.push(' Material Name');
                    }
                    if (this.props.data.bomReducer.createMasterDataMaterialDescKeyError !== '') {
                        eBOMError.push(' Material Description');
                    }
                    if (this.props.data.bomReducer.createMasterDataPartNoError !== '') {
                        eBOMError.push(' Part No.');
                    }
                    if (this.props.data.bomReducer.createMasterDataPartNameError !== '') {
                        eBOMError.push(' Part Name');
                    }
                    if (this.props.data.bomReducer.createMasterDataPartDescError !== '') {
                        eBOMError.push(' Part Description');
                    }
                    if (eBOMError.length === 0) {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Master Data successfully created!',
                                open: true,
                                sbColor: 'Module-Snackbar-Success'
                            }
                        });
                        this.props.viewHandler(true, false, '', this.state.snackbar);
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 5000,
                                message: 'Error in creating the Master Data! Please check the' + eBOMError + ', then try again.',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            }
                        });
                        this.props.viewHandler(true, false, this.props.eBOMData, this.state.snackbar);
                    }
                })
        }
    };

    handleCancel = () => {
        if (this.props.eBOMData.editMasterMaterialData === true) {
            this.props.viewHandler('cancel', '');
        } else {
            this.props.viewHandler(true, false, this.props.eBOMData, this.state.snackbar);
        }
    };

    render() {

        return (
            <div>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'><img src={blocnetsLogo} className='App-logo-progress' alt='' />
                        </div> : ''}
                </div>
                <div className='Module'>
                    <Grid container>
                        <Grid container item xs={12}>
                            Please confirm information.
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container justify='center'>
                        <Grid container item xs={12}>
                            <Paper className='Module-Paper'>
                                <div className='Module-Paper-Div'>
                                    <Table className='Module-Table'>
                                        <TableBody className='Module-TableBody'>
                                            {this.state.rows.map(row => {
                                                return (
                                                    <TableRow key={row.id}>
                                                        <TableCell>{row.info1}</TableCell>
                                                        <TableCell>{row.info2}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={6}>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <Grid container item xs justify='flex-end'>
                                <Button type='submit' value='OK' variant='contained' className='Module-Button'
                                        onClick={this.handleSubmit}>
                                    OK
                                    <Save className='Module-Button-Icon' />
                                </Button>
                            </Grid>
                            <Grid container item xs justify='flex-end'>
                                <Button type='button' value='Cancel' variant='contained'
                                        className='Module-Button-Cancel'
                                        onClick={this.handleCancel}>
                                    Cancel
                                    <Cancel className='Module-Button-Icon' />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                </div>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        data: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createMasterDataKeys: (data) => dispatch(createMasterDataKeys(data)),
        updateBillOfMaterialsByMaterialID: (url, body) => dispatch(updateBillOfMaterialsByMaterialID(url, body)),
        updateBillOfMaterialsByMaterialName: (url, body) => dispatch(updateBillOfMaterialsByMaterialName(url, body)),
        updateBillOfMaterialsByMaterialDesc: (url, body) => dispatch(updateBillOfMaterialsByMaterialDesc(url, body)),
        updateBillOfMaterialsByPartNumber: (url, body) => dispatch(updateBillOfMaterialsByPartNumber(url, body)),
        updateBillOfMaterialsByPartName: (url, body) => dispatch(updateBillOfMaterialsByPartName(url, body)),
        updateBillOfMaterialsByPartDesc: (url, body) => dispatch(updateBillOfMaterialsByPartDesc(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillOfMaterialsReview);
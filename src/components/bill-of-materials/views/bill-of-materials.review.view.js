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
        createData('Company Name / Address', eBOMData.materialCompanyName + ' / ' + eBOMData.materialAddressLine1 + ' '
            + eBOMData.materialAddressLine2 + ' ' + eBOMData.materialCity + ' ' + eBOMData.materialStateProvince + ' '
            + eBOMData.materialPostalCode + ' ' + eBOMData.materialCountry)
    ];
    for (let i = 0; i < eBOMData.outboundList.length; i++) {
        tableContent.push(createData('Company Name / Address', eBOMData.outboundList[i].materialCompanyName + ' / '
            + eBOMData.outboundList[i].materialAddressLine1 + ' ' + eBOMData.outboundList[i].materialAddressLine2 + ' '
            + eBOMData.outboundList[i].materialCity + ' ' + eBOMData.outboundList[i].materialStateProvince + ' '
            + eBOMData.outboundList[i].materialPostalCode + ' ' + eBOMData.outboundList[i].materialCountry));
    }
    tableContent.push(
        createData('IP Address', eBOMData.materialIPAddress),
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
        createData('Address / Supplier Payment Terms / Material ID / Quantity', eBOMData.addressLine1 + ' '
            + eBOMData.addressLine2 + ' ' + eBOMData.city + ' ' + eBOMData.stateProvince + ' ' + eBOMData.postalCode
            + ' ' + eBOMData.country + ' / ' + eBOMData.supPaymentTerms + ' / ' + eBOMData.supplierMaterialID + ' / '
            + eBOMData.supplierQuantity)
    );
    for (let i = 0; i < eBOMData.inboundList.length; i++) {
        tableContent.push(createData('Address / Supplier Payment Terms / Material ID / Quantity',
            eBOMData.inboundList[i].addressLine1 + ' ' + eBOMData.inboundList[i].addressLine2 + ' '
            + eBOMData.inboundList[i].city + ' ' + eBOMData.inboundList[i].stateProvince + ' '
            + eBOMData.inboundList[i].postalCode + ' ' + eBOMData.inboundList[i].country + ' / '
            + eBOMData.inboundList[i].supPaymentTerms + ' / ' + eBOMData.inboundList[i].supplierMaterialID + ' / '
            + eBOMData.inboundList[i].supplierQuantity));
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
        let eBOMError = [];
        this.setState({ showProgressLogo: true });
        let data = {
            text: 'string',
            file: 'string',
            supplier: {
                supplierName: 'string',
                supplierCageCode: 'string',
                suppliers: [
                    {
                        supplierIpAddress: 'string',
                        supplierIpAddressDesc: 'string',
                        supplierMaterialAddress: 'string',
                        supplierMaterialNumber: 'string',
                        supplierCageCode: 'string'
                    }
                ],
                supplierBillingAddress: 'string',
                supplierLocationAddress: this.props.eBOMData.addressLine1 + ' '
                    + this.props.eBOMData.addressLine2 + ' ' + this.props.eBOMData.city
                    + ' ' + this.props.eBOMData.stateProvince + ' ' + this.props.eBOMData.postalCode + ' '
                    + this.props.eBOMData.country,
                supplierMaterialNumber: 'string',
                supplierCustomerShipToAddress: 'string',
                supplierCustomerShipToCageCode: 'string',
                supplierCustomerShipToIPAddress: 'string',
                supplierCustomerBillToAddress: 'string',
                supplierCustomerBillToCageCode: 'string',
                supplierCustomerBillToIPAddress: 'string',
                supplierProductionCapacityCommittedToNetwork: this.props.eBOMData.supPaymentTerms,
                supplierOrderedLeadTime: 'string',
                supplierMaterialQualityInputSystem: [
                    'string'
                ],
                supplierMinimumEconomicOrderQuantity: this.props.eBOMData.minEOQuantities,
                supplierMaximumEconomicOrderQuantity: this.props.eBOMData.maxEOQuantities,
                supplierMaximumEconomicProductWithdrawRate: this.props.eBOMData.maxEPWithdrawRate,
                supplierOrderExpiditeFee: 'string',
                supplierOrderSlowDownFee: 'string',
                supplierMaximumOrderLeadTime: 'string',
                supplierMinimumOrderLeadTime: this.props.eBOMData.minOrderLeadTimes,
                supplierLeadTimeViolationFee: 'string'
            },
            material: {
                materialMvmtOrderType: [
                    'string'
                ],
                materialMvmtLocation: this.props.eBOMData.materialIPAddress,
                materialMvmtShippedTo: this.props.eBOMData.materialAddressLine1 + ' '
                    + this.props.eBOMData.materialAddressLine2 + ' ' + this.props.eBOMData.materialCity
                    + ' ' + this.props.eBOMData.materialStateProvince + ' ' + this.props.eBOMData.materialPostalCode + ' '
                    + this.props.eBOMData.materialCountry,
                materialMvmtShippedFrom: this.props.eBOMData.materialCompanyName,
                materialMvmtCageCode: this.props.eBOMData.partName,
                materialMvmtSupplierName: this.props.eBOMData.partDescription,
                materialMvmtSerialNumber: 'string',
                materialMvmtMaterialNumber: this.props.eBOMData.partNo,
                materialMvmtEndItemNumber: 'string',
                materialAffiliates: [
                    'string'
                ],
                materialNumber: this.props.eBOMData.materialID,
                materialSerialNumber: this.props.eBOMData.materialName,
                materialDescription: this.props.eBOMData.materialDescription,
                materialVolume: this.props.eBOMData.volume,
                materialVolumeUnits: 'string',
                materialWeight: this.props.eBOMData.weight,
                materialWeightUnits: 'string',
                materialLength: this.props.eBOMData.materialLength,
                materialLengthUnits: 'string',
                materialWidth: this.props.eBOMData.width,
                materialWidthUnits: 'string',
                materialHeight: this.props.eBOMData.height,
                materialHeightUnits: 'string',
                materialTempLimits: this.props.eBOMData.temperatureLimits,
                materialVibrationLimits: this.props.eBOMData.shockVibration,
                materialAlwaysUpRight: this.props.eBOMData.alwaysUpright,
                materialAltitudeRestrictions: this.props.eBOMData.altitudeRestrictions,
                materialCompressionRestrictions: this.props.eBOMData.compressionRestrictions,
                materialOther: [
                    'metallic: ' + this.props.eBOMData.metallic,
                    'hazmat: ' + this.props.eBOMData.hazmat,
                    'magnetic: ' + this.props.eBOMData.magnetic
                ],
                materialLengthTolerance: this.props.eBOMData.lengthTolerance,
                materialRoundTolerance: this.props.eBOMData.roundTolerance,
                materialNonSkidTolerance: this.props.eBOMData.nonSkidTolerance,
                materialGoesInto: 'string',
                materialProductionYield: 'string',
                materialOrderLeadTime: 'string',
                materialShippingLeadTime: 'string',
                materialProductionSetupTime: 'string',
                materialProductionChangeOverTime: 'string',
                materialProductionRate: 'string',
                materialCADFile: 'string',
                materialCAMFile: 'string',
                materialPrinterFile: 'string',
                materialQualitySpec: [
                    'string'
                ],
                materialMinimumEconomicProductionQuantity: 'string',
                materialMaximumEconomicProductionQuantity: 'string',
                materialProductionExpiditeFee: 'string',
                materialProductionSlowDownFee: 'string',
                materialMaximumProductionLeadTime: 'string',
                materialMinimumProductionLeadTime: 'string',
                materialLeadTimeViolationFee: 'string'
            }
        };
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
    };

    handleCancel = () => {
        this.props.viewHandler(true, false, this.props.eBOMData, this.state.snackbar);
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
                            <Grid container item xs>
                                <Button type='submit' value='OK' variant='contained' className='Module-Button'
                                        onClick={this.handleSubmit}>
                                    OK
                                    <Save className='Module-Button-Icon' />
                                </Button>
                            </Grid>
                            <Grid container item xs>
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
        createMasterDataKeys: (data) => dispatch(createMasterDataKeys(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillOfMaterialsReview);
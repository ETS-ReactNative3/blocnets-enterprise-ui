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

class BillOfMaterialsReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
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

        const rows = [
            createData('Material ID', this.props.eBOMData.materialID),
            createData('Material Name', this.props.eBOMData.materialName),
            createData('Material Description', this.props.eBOMData.materialDescription),
            /* RELEASE-90: Hide Part No., Part Name and Part Description fields.
            createData('Part No.', this.props.eBOMData.partNo),
            createData('Part Name', this.props.eBOMData.partName),
            createData('Part Description', this.props.eBOMData.partDescription),
            */
            createData('Outbound Customer Data', ''),
            createData('Company Name', this.props.eBOMData.materialCompanyName),
            createData('Address', this.props.eBOMData.materialAddressLine1 + ' '
                + this.props.eBOMData.materialAddressLine2 + ' ' + this.props.eBOMData.materialCity
                + ' ' + this.props.eBOMData.materialStateProvince + ' ' + this.props.eBOMData.materialPostalCode + ' '
                + this.props.eBOMData.materialCountry),
            createData('IP Address', this.props.eBOMData.materialIPAddress),
            createData('Material Validation Characteristics', ''),
            createData('Volume', this.props.eBOMData.volume),
            createData('Weight', this.props.eBOMData.weight),
            createData('Length', this.props.eBOMData.materialLength),
            createData('Width', this.props.eBOMData.width),
            createData('Height', this.props.eBOMData.height),
            createData('Temperature Limits', this.props.eBOMData.temperatureLimits),
            createData('Shock/Vibration', this.props.eBOMData.shockVibration),
            createData('Altitude Restrictions', this.props.eBOMData.altitudeRestrictions),
            createData('Compression Restrictions', this.props.eBOMData.compressionRestrictions),
            createData('Always Upright', this.props.eBOMData.alwaysUpright2),
            createData('Metallic', this.props.eBOMData.metallic2),
            createData('Hazmat', this.props.eBOMData.hazmat2),
            createData('Magnetic', this.props.eBOMData.magnetic2),
            createData('Length Tolerance', this.props.eBOMData.lengthTolerance),
            createData('Round Tolerance', this.props.eBOMData.roundTolerance),
            createData('Non-Skid Tolerance', this.props.eBOMData.nonSkidTolerance),
            createData('Supplier Order Quantities Controls', ''),
            createData('Minimum Economic Order Quantities', this.props.eBOMData.minEOQuantities),
            createData('Maximum Economic Order Quantities', this.props.eBOMData.maxEOQuantities),
            createData('Maximum Economic Product Withdraw Rate', this.props.eBOMData.maxEPWithdrawRate),
            createData('Minimum Order Lead Times', this.props.eBOMData.minOrderLeadTimes),
            createData('Inbound Supplier(s)', ''),
            createData('Address', this.props.eBOMData.addressLine1 + ' '
                + this.props.eBOMData.addressLine2 + ' ' + this.props.eBOMData.city
                + ' ' + this.props.eBOMData.stateProvince + ' ' + this.props.eBOMData.postalCode + ' '
                + this.props.eBOMData.country),
            createData('Supplier Payment Terms', this.props.eBOMData.supPaymentTerms)
        ];

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
                                            {rows.map(row => {
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
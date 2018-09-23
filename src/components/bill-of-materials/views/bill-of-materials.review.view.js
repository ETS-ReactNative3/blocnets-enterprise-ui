import React from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import Paper from 'material-ui/Paper';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from "@material-ui/core/colors/red";
import {connect} from 'react-redux';
import {
    createMasterDataKeys
} from '../../../redux/actions/BOM/create.master.data.action';

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return {id: counter, info1, info2};
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
        this.props.data.bomReducer.createMasterDataKeysSuccess = '';
        this.setState({showProgressLogo: true});
        let data = {
            text: "string",
            file: "string",
            supplier: {
                supplierName: this.props.eBOMData.paymentTerms,
                supplierCageCode: this.props.eBOMData.ipAddress,
                suppliers: [
                    {
                        supplierIpAddress: "string",
                        supplierIpAddressDesc: "string",
                        supplierMaterialAddress: "string",
                        supplierMaterialNumber: "string",
                        supplierCageCode: "string"
                    }
                ],
                supplierBillingAddress: "string",
                supplierLocationAddress: this.props.eBOMData.addressLine1 + ' '
                    + this.props.eBOMData.addressLine2 + ' ' + this.props.eBOMData.city
                    + ' ' + this.props.eBOMData.addressState + ' ' + this.props.eBOMData.postalCode + ' '
                    + this.props.eBOMData.country,
                supplierMaterialNumber: this.props.eBOMData.matSupPerIPAddress,
                supplierCustomerShipToAddress: this.props.eBOMData.shipToAddressLine1 + ' '
                    + this.props.eBOMData.shipToAddressLine2 + ' ' + this.props.eBOMData.shipToCity
                    + ' ' + this.props.eBOMData.shipToAddressState + ' ' + this.props.eBOMData.shipToPostalCode + ' '
                    + this.props.eBOMData.shipToCountry,
                supplierCustomerShipToCageCode: "string",
                supplierCustomerShipToIPAddress: this.props.eBOMData.shipToIPAddress,
                supplierCustomerBillToAddress: this.props.eBOMData.billToAddressLine1 + ' '
                    + this.props.eBOMData.billToAddressLine2 + ' ' + this.props.eBOMData.billToCity
                    + ' ' + this.props.eBOMData.billToAddressState + ' ' + this.props.eBOMData.billToPostalCode + ' '
                    + this.props.eBOMData.billToCountry,
                supplierCustomerBillToCageCode: "string",
                supplierCustomerBillToIPAddress: this.props.eBOMData.billToIPAddress,
                supplierProductionCapacityCommittedToNetwork: this.props.eBOMData.supPaymentTerms,
                supplierOrderedLeadTime: this.props.eBOMData.supOrderPolicy,
                supplierMaterialQualityInputSystem: [
                    "string"
                ],
                supplierMinimumEconomicOrderQuantity: this.props.eBOMData.minEOQuantities,
                supplierMaximumEconomicOrderQuantity: this.props.eBOMData.maxEOQuantities,
                supplierMaximumEconomicProductWithdrawRate: this.props.eBOMData.maxEPWithdrawRate,
                supplierOrderExpiditeFee: "string",
                supplierOrderSlowDownFee: "string",
                supplierMaximumOrderLeadTime: "string",
                supplierMinimumOrderLeadTime: this.props.eBOMData.minOrderLeadTimes,
                supplierLeadTimeViolationFee: "string"
            },
            material: {
                materialMvmtOrderType: [
                    "string"
                ],
                materialMvmtLocation: this.props.eBOMData.materialIPAddress,
                materialMvmtShippedTo: this.props.eBOMData.materialAddressLine1 + ' '
                    + this.props.eBOMData.materialAddressLine2 + ' ' + this.props.eBOMData.materialCity
                    + ' ' + this.props.eBOMData.materialAddressState + ' ' + this.props.eBOMData.materialPostalCode + ' '
                    + this.props.eBOMData.materialCountry,
                materialMvmtShippedFrom: this.props.eBOMData.materialCompanyName,
                materialMvmtCageCode: this.props.eBOMData.partName,
                materialMvmtSupplierName: this.props.eBOMData.partDescription,
                materialMvmtSerialNumber: "string",
                materialMvmtMaterialNumber: this.props.eBOMData.partNo,
                materialMvmtEndItemNumber: "string",
                materialAffiliates: [
                    "string"
                ],
                materialNumber: this.props.eBOMData.materialID,
                materialSerialNumber: this.props.eBOMData.materialName,
                materialDescription: this.props.eBOMData.materialDescription,
                materialVolume: this.props.eBOMData.volume,
                materialVolumeUnits: "string",
                materialWeight: this.props.eBOMData.weight,
                materialWeightUnits: "string",
                materialLength: this.props.eBOMData.materialLength,
                materialLengthUnits: "string",
                materialWidth: this.props.eBOMData.width,
                materialWidthUnits: "string",
                materialHeight: this.props.eBOMData.height,
                materialHeightUnits: "string",
                materialTempLimits: this.props.eBOMData.temperatureLimits,
                materialVibrationLimits: this.props.eBOMData.shockVibration,
                materialAlwaysUpRight: this.props.eBOMData.alwaysUpright,
                materialAltitudeRestrictions: this.props.eBOMData.altitudeRestrictions,
                materialCompressionRestrictions: this.props.eBOMData.compressionRestrictions,
                materialOther: [
                    "metallic: " + this.props.eBOMData.metallic,
                    "hazmat: " + this.props.eBOMData.hazmat,
                    "magnetic: " + this.props.eBOMData.magnetic
                ],
                materialLengthTolerance: this.props.eBOMData.lengthTolerance,
                materialRoundTolerance: this.props.eBOMData.roundTolerance,
                materialNonSkidTolerance: this.props.eBOMData.nonSkidTolerance,
                materialGoesInto: "string",
                materialProductionYield: "string",
                materialOrderLeadTime: "string",
                materialShippingLeadTime: "string",
                materialProductionSetupTime: "string",
                materialProductionChangeOverTime: "string",
                materialProductionRate: "string",
                materialCADFile: "string",
                materialCAMFile: "string",
                materialPrinterFile: "string",
                materialQualitySpec: [
                    "string"
                ],
                materialMinimumEconomicProductionQuantity: "string",
                materialMaximumEconomicProductionQuantity: "string",
                materialProductionExpiditeFee: "string",
                materialProductionSlowDownFee: "string",
                materialMaximumProductionLeadTime: "string",
                materialMinimumProductionLeadTime: "string",
                materialLeadTimeViolationFee: "string"
            }
        };
        Promise.resolve(this.props.createMasterDataKeys(data))
            .then(() => {
                if (this.props.data.bomReducer.createMasterDataKeysSuccess === true) {
                    this.setState({
                        showProgressLogo: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Engineering Bill of Materials Successfully Created!',
                            open: true,
                            sbColor: '#23CE6B'
                        }
                    });
                    this.props.viewHandler(true, false, '', this.state.snackbar);
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
            createData('Part No.', this.props.eBOMData.partNo),
            createData('Part Name', this.props.eBOMData.partName),
            createData('Part Description', this.props.eBOMData.partDescription),
            createData('Material Dimensions', ''),
            createData('Volume', this.props.eBOMData.volume),
            createData('Weight', this.props.eBOMData.weight),
            createData('Length', this.props.eBOMData.materialLength),
            createData('Width', this.props.eBOMData.width),
            createData('Height', this.props.eBOMData.height),
            createData('Material Handling Characteristics', ''),
            createData('Temperature Limits', this.props.eBOMData.temperatureLimits),
            createData('Shock/Vibration', this.props.eBOMData.shockVibration),
            createData('Altitude Restrictions', this.props.eBOMData.altitudeRestrictions),
            createData('Compression Restrictions', this.props.eBOMData.compressionRestrictions),
            createData('Always Upright', this.props.eBOMData.alwaysUpright2),
            createData('Material Other', ''),
            createData('Metallic', this.props.eBOMData.metallic2),
            createData('Hazmat', this.props.eBOMData.hazmat2),
            createData('Magnetic', this.props.eBOMData.magnetic2),
            createData('Material Quality Standards', ''),
            createData('Length Tolerance', this.props.eBOMData.lengthTolerance),
            createData('Round Tolerance', this.props.eBOMData.roundTolerance),
            createData('Non-Skid Tolerance', this.props.eBOMData.nonSkidTolerance),
            createData('Supplier Customer Definition', ''),
            createData('Ship To Address', this.props.eBOMData.shipToAddressLine1 + ' '
                + this.props.eBOMData.shipToAddressLine2 + ' ' + this.props.eBOMData.shipToCity
                + ' ' + this.props.eBOMData.shipToAddressState + ' ' + this.props.eBOMData.shipToPostalCode + ' '
                + this.props.eBOMData.shipToCountry),
            createData('Ship To IP Address', this.props.eBOMData.shipToIPAddress),
            createData('Bill To Address', this.props.eBOMData.billToAddressLine1 + ' '
                + this.props.eBOMData.billToAddressLine2 + ' ' + this.props.eBOMData.billToCity
                + ' ' + this.props.eBOMData.billToAddressState + ' ' + this.props.eBOMData.billToPostalCode + ' '
                + this.props.eBOMData.billToCountry),
            createData('Bill To IP Address', this.props.eBOMData.billToIPAddress),
            createData('Supplier Payment Terms', ''),
            createData('Payment Terms', this.props.eBOMData.paymentTerms),
            createData('Supplier Order Quantities Controls', ''),
            createData('Minimum Economic Order Quantities', this.props.eBOMData.minEOQuantities),
            createData('Maximum Economic Order Quantities', this.props.eBOMData.maxEOQuantities),
            createData('Maximum Economic Product Withdraw Rate', this.props.eBOMData.maxEPWithdrawRate),
            createData('Minimum Order Lead Times', this.props.eBOMData.minOrderLeadTimes),
            createData('Suppliers', ''),
            createData('Address', this.props.eBOMData.addressLine1 + ' '
                + this.props.eBOMData.addressLine2 + ' ' + this.props.eBOMData.city
                + ' ' + this.props.eBOMData.addressState + ' ' + this.props.eBOMData.postalCode + ' '
                + this.props.eBOMData.country),
            createData('IP Address', this.props.eBOMData.ipAddress),
            createData('Material Supplied Per IP Address', this.props.eBOMData.matSupPerIPAddress),
            createData('Supplier Payment Terms', this.props.eBOMData.supPaymentTerms),
            createData('Supplier Order Policy', this.props.eBOMData.supOrderPolicy),
            createData('Material', ''),
            createData('Address', this.props.eBOMData.materialAddressLine1 + ' '
                + this.props.eBOMData.materialAddressLine2 + ' ' + this.props.eBOMData.materialCity
                + ' ' + this.props.eBOMData.materialAddressState + ' ' + this.props.eBOMData.materialPostalCode + ' '
                + this.props.eBOMData.materialCountry),
            createData('IP Address', this.props.eBOMData.materialIPAddress),
            createData('Company Name', this.props.eBOMData.materialCompanyName)
        ];

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const button2Theme = createMuiTheme({
            palette: {
                primary: red
            },
        });

        return (
            <div>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt=""/>
                        </div> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container>
                        <Grid container item xs={12}>
                            Please confirm information.
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container justify="center">
                        <Grid container item xs={12}>
                            <Paper style={{"width": "100%"}}>
                                <div style={{"overflowX": "auto"}}>
                                    <Table style={{"tableLayout": "fixed"}}>
                                        <TableBody>
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
                    <br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={3}>
                            <Grid container item xs>
                                <MuiThemeProvider theme={buttonTheme}>
                                    <Button type="submit" value="OK" variant="contained" color="primary"
                                            onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="submit" value="Cancel" variant="contained" color="primary"
                                            onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
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
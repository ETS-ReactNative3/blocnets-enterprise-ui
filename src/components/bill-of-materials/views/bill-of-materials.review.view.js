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
    createBillOfMaterialsByMaterialID,
    createBillOfMaterialsByMaterialName,
    createBillOfMaterialsByMaterialDesc,
    createBillOfMaterialsByPartNumber,
    createBillOfMaterialsByPartName,
    createBillOfMaterialsByPartDesc
} from '../../../redux/actions/bill-of-materials.actions';

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

    handleSubmit = (event) => {
        this.props.data.bomReducer.createBillOfMaterialsByMaterialIDSuccess = '';
        this.props.data.bomReducer.createBillOfMaterialsByMaterialNameSuccess = '';
        this.props.data.bomReducer.createBillOfMaterialsByMaterialDescSuccess = '';
        this.props.data.bomReducer.createBillOfMaterialsByPartNumberSuccess = '';
        this.props.data.bomReducer.createBillOfMaterialsByPartNameSuccess = '';
        this.props.data.bomReducer.createBillOfMaterialsByPartDescSuccess = '';
        let createBillOfMaterialsByPartNumberSuccess = '';
        let createBillOfMaterialsByPartNameSuccess = '';
        let createBillOfMaterialsByPartDescSuccess = '';
        this.setState({showProgressLogo: true});
        let BOMMaterialUrl = this.props.eBOMData.materialID;
        let BOMMaterialNameUrl = this.props.eBOMData.materialName;
        let BOMMaterialDescriptionUrl = this.props.eBOMData.materialDescription;
        let BOMPartNoUrl = this.props.eBOMData.partNo;
        let BOMPartNameUrl = this.props.eBOMData.partName;
        let BOMPartDescriptionUrl = this.props.eBOMData.partDescription;
        let data = {
            text: "string",
            file: "string",
            supplier: {
                supplierName: "string",
                supplierCageCode: "string",
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
                supplierMaterialNumber: "string",
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
                supplierProductionCapacityCommittedToNetwork: "string",
                supplierOrderedLeadTime: "string",
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
                materialMvmtLocation: "string",
                materialMvmtShippedTo: "string",
                materialMvmtShippedFrom: "string",
                materialMvmtCageCode: "string",
                materialMvmtSupplierName: "string",
                materialMvmtSerialNumber: "string",
                materialMvmtMaterialNumber: "string",
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
                materialLengthLength: this.props.eBOMData.materialLength,
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
        this.props.createBillOfMaterialsByMaterialID(BOMMaterialUrl, data);
        this.props.createBillOfMaterialsByMaterialName(BOMMaterialNameUrl, data);
        this.props.createBillOfMaterialsByMaterialDesc(BOMMaterialDescriptionUrl, data);
        if (this.props.eBOMData.partNo) {
            this.props.createBillOfMaterialsByPartNumber(BOMPartNoUrl, data);
        } else {
            createBillOfMaterialsByPartNumberSuccess = true;
        }
        if (this.props.eBOMData.partName) {
            this.props.createBillOfMaterialsByPartName(BOMPartNameUrl, data);
        } else {
            createBillOfMaterialsByPartNameSuccess = true;
        }
        if (this.props.eBOMData.partDescription) {
            this.props.createBillOfMaterialsByPartDesc(BOMPartDescriptionUrl, data);
        } else {
            createBillOfMaterialsByPartDescSuccess = true;
        }
        setTimeout(
            function () {
                if (this.props.data.bomReducer.createBillOfMaterialsByMaterialIDSuccess === true &&
                    this.props.data.bomReducer.createBillOfMaterialsByMaterialNameSuccess === true &&
                    this.props.data.bomReducer.createBillOfMaterialsByMaterialDescSuccess === true &&
                    (this.props.data.bomReducer.createBillOfMaterialsByPartNumberSuccess === true ||
                        createBillOfMaterialsByPartNumberSuccess === true) &&
                    (this.props.data.bomReducer.createBillOfMaterialsByPartNameSuccess === true ||
                        createBillOfMaterialsByPartNameSuccess === true) &&
                    (this.props.data.bomReducer.createBillOfMaterialsByPartDescSuccess === true ||
                        createBillOfMaterialsByPartDescSuccess === true)
                ) {
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
                } else {
                    this.setState({
                        showProgressLogo: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error Creating Engineering Bill of Materials! Please try again.',
                            open: true,
                            sbColor: 'red'
                        }
                    });
                    this.props.viewHandler(true, false, this.props.eBOMData, this.state.snackbar);
                }
            }
                .bind(this),
            3000
        );
    };

    handleCancel = (event) => {
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
            createData('Supplier Order Policy', this.props.eBOMData.supOrderPolicy)
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
                                            onClick={(event) => {
                                                this.handleSubmit(event)
                                            }}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="submit" value="Cancel" variant="contained" color="primary"
                                            onClick={(event) => {
                                                this.handleCancel(event)
                                            }}>
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
        createBillOfMaterialsByMaterialID: (url, body) => dispatch(createBillOfMaterialsByMaterialID(url, body)),
        createBillOfMaterialsByMaterialName: (url, body) => dispatch(createBillOfMaterialsByMaterialName(url, body)),
        createBillOfMaterialsByMaterialDesc: (url, body) => dispatch(createBillOfMaterialsByMaterialDesc(url, body)),
        createBillOfMaterialsByPartNumber: (url, body) => dispatch(createBillOfMaterialsByPartNumber(url, body)),
        createBillOfMaterialsByPartName: (url, body) => dispatch(createBillOfMaterialsByPartName(url, body)),
        createBillOfMaterialsByPartDesc: (url, body) => dispatch(createBillOfMaterialsByPartDesc(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillOfMaterialsReview);
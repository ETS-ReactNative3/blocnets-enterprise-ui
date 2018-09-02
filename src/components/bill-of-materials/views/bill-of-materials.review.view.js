import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from 'material-ui/Paper';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from "@material-ui/core/colors/red";
import { connect } from 'react-redux';
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
    return { id: counter, info1, info2 };
}

class BillOfMaterialsReview extends React.Component {

    handleSubmit = (event) => {

        this.setState({showProgressLogo: true});

        var BOMMaterialUrl = this.props.data.data.materialID;
        var BOMMaterialNameUrl = this.props.data.data.materialName
        var BOMMaterialDescUrl = this.props.data.data.materialDescription;

        var BOMPartNumberUrl = this.props.data.data.partNo;
        var BOMPartNameUrl = this.props.data.data.partName;
        var BOMPartDescUrl = this.props.data.data.partDescription;

        var data = {
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
                supplierLocationAddress: this.props.data.data.addressLine1 + ' '
                + this.props.data.data.addressLine2 + ' ' + this.props.data.data.city
                + ' ' + this.props.data.data.addressState + ' ' + this.props.data.data.postalCode + ' '
                + this.props.data.data.country,
                supplierMaterialNumber: "string",
                supplierCustomerShipToAddress: this.props.data.data.shipAddressLine1 + ' '
                + this.props.data.data.shipAddressLine2 + ' ' + this.props.data.data.shipCity
                + ' ' + this.props.data.data.shipAddressState + ' ' + this.props.data.data.shipPostalCode + ' '
                + this.props.data.data.shipCountry,
                supplierCustomerShipToCageCode: "string",
                supplierCustomerShipToIPAddress: this.props.data.data.shipIPAddress,
                supplierCustomerBillToAddress: this.props.data.data.billAddressLine1 + ' '
                + this.props.data.data.billAddressLine2 + ' ' + this.props.data.data.billCity
                + ' ' + this.props.data.data.billAddressState + ' ' + this.props.data.data.billPostalCode + ' '
                + this.props.data.data.billCountry,
                supplierCustomerBillToCageCode: "string",
                supplierCustomerBillToIPAddress: this.props.data.data.billIPAddress,
                supplierProductionCapacityCommittedToNetwork: "string",
                supplierOrderedLeadTime: "string",
                supplierMaterialQualityInputSystem: [
                    "string"
                ],
                supplierMinimumEconomicOrderQuantity: this.props.data.data.minEOQuantities,
                supplierMaximumEconomicOrderQuantity: this.props.data.data.maxEOQuantities,
                supplierMaximumEconomicProductWithdrawRate: this.props.data.data.maxEPWithdrawRate,
                supplierOrderExpiditeFee: "string",
                supplierOrderSlowDownFee: "string",
                supplierMaximumOrderLeadTime: "string",
                supplierMinimumOrderLeadTime: this.props.data.data.minOrderLeadTimes,
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
                materialNumber: this.props.data.data.materialID,
                materialSerialNumber: this.props.data.data.materialName,
                materialDescription: this.props.data.data.materialDescription,
                materialVolume: this.props.data.data.volume,
                materialVolumeUnits: "string",
                materialWeight: this.props.data.data.weight,
                materialWeightUnits: "string",
                materialLength: this.props.data.data.length,
                materialLengthUnits: "string",
                materialWidth: this.props.data.data.width,
                materialWidthUnits: "string",
                materialHeight: this.props.data.data.height,
                materialHeightUnits: "string",
                materialTempLimits: this.props.data.data.temperatureLimits,
                materialVibrationLimits: this.props.data.data.shockVibration,
                materialAlwaysUpRight: this.props.data.data.alwaysUpright2,
                materialAltitudeRestrictions: this.props.data.data.altitudeRestrictions,
                materialCompressionRestrictions: this.props.data.data.compressionRestrictions,
                materialOther: [
                    this.props.data.data.alwaysUpright2,
                    this.props.data.data.hazmat2,
                    this.props.data.data.magnetic2
                ],
                materialLengthTolerance: this.props.data.data.lengthTolerance,
                materialRoundTolerance: this.props.data.data.roundTolerance,
                materialNonSkidTolerance: this.props.data.data.nonSkidTolerance,
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
        }
        this.props.createBillOfMaterialsByMaterialID(BOMMaterialUrl, data);
        this.props.createBillOfMaterialsByMaterialName(BOMMaterialNameUrl, data);
        this.props.createBillOfMaterialsByMaterialDesc(BOMMaterialDescUrl, data);

        this.props.createBillOfMaterialsByPartNumber(BOMPartNumberUrl, data);
        this.props.createBillOfMaterialsByPartName(BOMPartNameUrl, data);
        this.props.createBillOfMaterialsByPartDesc(BOMPartDescUrl, data);

        this.setState({showProgressLogo: false});
        event.preventDefault();
        this.props.data.data.showBillOfMaterialsForm = false;
        this.props.data.data.showBillOfMaterialsReview = false;
        this.props.data.data.showBillOfMaterialsTree = true;
        this.props.viewHandler(this.props.data.data);
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.props.data.data.showBillOfMaterialsForm = true;
        this.props.data.data.showBillOfMaterialsReview = false;
        this.props.data.data.showBillOfMaterialsTree = false;
        this.props.viewHandler(this.props.data.data);
    };

    render() {

        const rows = [
            createData('Material ID', this.props.data.data.materialID),
            createData('Material Name', this.props.data.data.materialName),
            createData('Material Description', this.props.data.data.materialDescription),
            createData('Part No.', this.props.data.data.partNo),
            createData('Part Name', this.props.data.data.partName),
            createData('Part Description', this.props.data.data.partDescription),
            createData('Material Dimensions', ''),
            createData('Volume', this.props.data.data.volume),
            createData('Weight', this.props.data.data.weight),
            createData('Length', this.props.data.data.length),
            createData('Width', this.props.data.data.width),
            createData('Height', this.props.data.data.height),
            createData('Material Handling Characteristics', ''),
            createData('Temperature Limits', this.props.data.data.temperatureLimits),
            createData('Shock/Vibration', this.props.data.data.shockVibration),
            createData('Altitude Restrictions', this.props.data.data.altitudeRestrictions),
            createData('Compression Restrictions', this.props.data.data.compressionRestrictions),
            createData('Always Upright', this.props.data.data.alwaysUpright2),
            createData('Material Other', ''),
            createData('Metallic', this.props.data.data.metallic2),
            createData('Hazmat', this.props.data.data.hazmat2),
            createData('Magnetic', this.props.data.data.magnetic2),
            createData('Material Quality Standards', ''),
            createData('Length Tolerance', this.props.data.data.lengthTolerance),
            createData('Round Tolerance', this.props.data.data.roundTolerance),
            createData('Non-Skid Tolerance', this.props.data.data.nonSkidTolerance),
            createData('Supplier Customer Definition', ''),
            createData('Ship To Address', this.props.data.data.shipAddressLine1 + ' '
                + this.props.data.data.shipAddressLine2 + ' ' + this.props.data.data.shipCity
                + ' ' + this.props.data.data.shipAddressState + ' ' + this.props.data.data.shipPostalCode + ' '
                + this.props.data.data.shipCountry),
            createData('Ship To IP Address', this.props.data.data.shipIPAddress),
            createData('Bill To Address', this.props.data.data.billAddressLine1 + ' '
                + this.props.data.data.billAddressLine2 + ' ' + this.props.data.data.billCity
                + ' ' + this.props.data.data.billAddressState + ' ' + this.props.data.data.billPostalCode + ' '
                + this.props.data.data.billCountry),
            createData('Bill To IP Address', this.props.data.data.billIPAddress),
            createData('Supplier Payment Terms', ''),
            createData('Payment Terms', this.props.data.data.paymentTerms),
            createData('Supplier Order Quantities Controls', ''),
            createData('Minimum Economic Order Quantities', this.props.data.data.minEOQuantities),
            createData('Maximum Economic Order Quantities', this.props.data.data.maxEOQuantities),
            createData('Maximum Economic Product Withdraw Rate', this.props.data.data.maxEPWithdrawRate),
            createData('Minimum Order Lead Times', this.props.data.data.minOrderLeadTimes),
            createData('Suppliers', ''),
            createData('Address', this.props.data.data.addressLine1 + ' '
                + this.props.data.data.addressLine2 + ' ' + this.props.data.data.city
                + ' ' + this.props.data.data.addressState + ' ' + this.props.data.data.postalCode + ' '
                + this.props.data.data.country),
            createData('IP Address', this.props.data.data.ipAddress),
            createData('Material Supplied Per IP Address', this.props.data.data.matSupPerIPAddress),
            createData('Supplier Payment Terms', this.props.data.data.supPaymentTerms),
            createData('Supplier Order Policy', this.props.data.data.supOrderPolicy)
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

            <div style={{ padding: 24 }}>
                <Grid container>
                    <Grid container item xs={12}>
                        Please confirm information.
                    </Grid>
                </Grid>
                <br />
                <Grid container justify="center">
                    <Grid container item xs={12}>
                        <Paper style={{ "width": "100%" }}>
                            <div style={{ "overflowX": "auto" }}>
                                <Table>
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
                <br />
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
                <br />
                <br />
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBillOfMaterialsByMaterialID: (url, body) => dispatch(createBillOfMaterialsByMaterialID(url,body)),
        createBillOfMaterialsByMaterialName: (url, body) => dispatch(createBillOfMaterialsByMaterialName(url,body)),
        createBillOfMaterialsByMaterialDesc: (url, body) => dispatch(createBillOfMaterialsByMaterialDesc(url,body)),
        createBillOfMaterialsByPartNumber: (url, body) => dispatch(createBillOfMaterialsByPartNumber(url,body)),
        createBillOfMaterialsByPartName: (url, body) => dispatch(createBillOfMaterialsByPartName(url,body)),
        createBillOfMaterialsByPartDesc: (url, body) => dispatch(createBillOfMaterialsByPartDesc(url,body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillOfMaterialsReview);
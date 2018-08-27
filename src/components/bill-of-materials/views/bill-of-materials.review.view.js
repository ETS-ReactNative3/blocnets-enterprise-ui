import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Button from '@material-ui/core/Button';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from 'material-ui/Checkbox';
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import red from "@material-ui/core/colors/red";


class BillOfMaterialsReview extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            count: 0
        };
    }

    createData(info1, info2) {
        this.state.count += 1;
        return {id: this.state.count, info1, info2};
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.data.data.showBillOfMaterialsForm = true;
        this.props.data.data.showBillOfMaterialsReview = false;
        this.props.data.data.showBillOfMaterialsTree = false;
        this.props.viewHandler(this.props.data.data);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.data.data.showBillOfMaterialsForm = false;
        this.props.data.data.showBillOfMaterialsReview = false;
        this.props.data.data.showBillOfMaterialsTree = true;
        this.props.viewHandler(this.props.data.data);
    };


    render() {

        const rows = [
            this.createData('Material ID', this.props.data.data.materialID),
            this.createData('Material Dimensions', ''),
            this.createData('Volume', this.props.data.data.volume),
            this.createData('Weight', this.props.data.data.weight),
            this.createData('Length', this.props.data.data.length),
            this.createData('Width', this.props.data.data.width),
            this.createData('Height', this.props.data.data.height),
            this.createData('Material Handling Characteristics', ''),
            this.createData('Temperature Limits', this.props.data.data.temperatureLimits),
            this.createData('Shock/Vibration', this.props.data.data.shockVibration),
            this.createData('Altitude Restrictions', this.props.data.data.altitudeRestrictions),
            this.createData('Compression Restrictions', this.props.data.data.compressionRestrictions),
            this.createData('Always Upright', this.props.data.data.alwaysUpright2),
            this.createData('Material Other', ''),
            this.createData('Metallic', this.props.data.data.metallic2),
            this.createData('Hazmat', this.props.data.data.hazmat2),
            this.createData('Magnetic', this.props.data.data.magnetic2),
            this.createData('Material Quality Standards', ''),
            this.createData('Length Tolerance', this.props.data.data.lengthTolerance),
            this.createData('Round Tolerance', this.props.data.data.roundTolerance),
            this.createData('Non-Skid Tolerance', this.props.data.data.nonSkidTolerance),
            this.createData('Supplier Customer Definition', ''),
            this.createData('Ship To Address', this.props.data.data.shipAddressLine1 + ' '
                + this.props.data.data.shipAddressLine2 + ' ' + this.props.data.data.shipCity
                + ' ' + this.props.data.data.shipAddressState + ' ' + this.props.data.data.shipPostalCode + ' '
                + this.props.data.data.shipCountry),
            this.createData('Ship To IP Address', this.props.data.data.shipIPAddress),
            this.createData('Bill To Address', this.props.data.data.billAddressLine1 + ' '
                + this.props.data.data.billAddressLine2 + ' ' + this.props.data.data.billCity
                + ' ' + this.props.data.data.billAddressState + ' ' + this.props.data.data.billPostalCode + ' '
                + this.props.data.data.billCountry),
            this.createData('Bill To IP Address', this.props.data.data.billIPAddress),
            this.createData('Supplier Payment Terms', ''),
            this.createData('Payment Terms', this.props.data.data.paymentTerms),
            this.createData('Supplier Order Quantities Controls', ''),
            this.createData('Minimum Economic Order Quantities', this.props.data.data.minEOQuantities),
            this.createData('Maximum Economic Order Quantities', this.props.data.data.maxEOQuantities),
            this.createData('Maximum Economic Product Withdraw Rate', this.props.data.data.maxEPWithdrawRate),
            this.createData('Minimum Order Lead Times', this.props.data.data.minOrderLeadTimes),
            this.createData('Suppliers', ''),
            this.createData('Address', this.props.data.data.addressLine1 + ' '
                + this.props.data.data.addressLine2 + ' ' + this.props.data.data.city
                + ' ' + this.props.data.data.addressState + ' ' + this.props.data.data.postalCode + ' '
                + this.props.data.data.country),
            this.createData('IP Address', this.props.data.data.ipAddress),
            this.createData('Material Supplied Per IP Address', this.props.data.data.matSupPerIPAddress),
            this.createData('Supplier Payment Terms', this.props.data.data.supPaymentTerms),
            this.createData('Supplier Order Policy', this.props.data.data.supOrderPolicy)
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

            <div style={{padding: 24}} >
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
                                <Table>
                                    <TableBody >
                                        {rows.map(row => {
                                            return (
                                                <TableRow key={row.id}>
                                                    <TableCell>
                                                        {row.info1}
                                                    </TableCell>
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
                    <Grid container item xs={12}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={this.state.doNotAskAgain} onChange={this.handleCheckboxChange}
                                        name="doNotAskAgain" color="default"
                                    />
                                }
                            />
                        </FormGroup>
                        Do not ask again.
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={24}>
                    <Grid container item xs={12} sm={3}>
                        <Grid container item xs>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="ok" value="OK" variant="contained" color="primary"
                                        onClick={(event) => {this.handleSubmit(event)}}>
                                    OK
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                        <Grid container item xs>
                            <MuiThemeProvider theme={button2Theme}>
                                <Button type="cancel" value="Cancel" variant="contained" color="primary"
                                        onClick={(event) => {this.handleCancel(event)}}>
                                    Cancel
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
                <br/>
            </div>

        );
    }
}

BillOfMaterialsReview.propTypes = {
    classes: PropTypes.object,
};



export default BillOfMaterialsReview; 
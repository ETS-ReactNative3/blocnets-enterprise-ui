import React, {Component} from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Typography from "@material-ui/core/Typography/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from 'material-ui/Snackbar';
import Fade from '@material-ui/core/Fade';
import {connect} from 'react-redux';
import {
    createShippingDataByMaterialID,
    createShippingDataByShipmentID
}
    from '../../redux/actions/shipping.and.receiving.actions';

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return {id: counter, info1, info2};
}

class ShippingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            errorText1: 'This is a required field.',
            shipmentID: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            addressState: '',
            postalCode: '',
            country: '',
            ipAddress: '',
            errorText2: 'This is a required field.',
            ipAddressLength: '',
            counter: '001',
            manualShipping: '',
            manualShipping2: 'NO',
            openDialog: false,
            showProgressLogoDialog: false,
            doNotAskAgain: '',
            doNotAskAgain2: false,
            counter2: 0,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if ([event.target.name].toString() === 'materialID' && event.target.value) {
            this.setState({errorText1: ''});
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({errorText1: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'ipAddress' && event.target.value) {
            this.setState({errorText2: ''});
        } else if ([event.target.name].toString() === 'ipAddress' && !event.target.value) {
            this.setState({errorText2: 'This is a required field.'});
        }
        let shipmentID = '';
        let ipAddress2 = '';
        let ipAddressLength = '';
        if ([event.target.name].toString() === 'ipAddress') {
            ipAddress2 = event.target.value.replace(/\D/g, "").substring(0, 6);
            ipAddressLength = ipAddress2.length;
            shipmentID = ipAddress2 + '-' + this.state.counter;
            this.setState({
                shipmentID: shipmentID,
                ipAddressLength: ipAddressLength
            });
        }
    };

    handleCheckboxChange = (event) => {
        this.setState({[event.target.name]: event.target.checked});
        if ([event.target.name].toString() === 'manualShipping' && event.target.checked === true) {
            this.setState({manualShipping2: 'YES'});
        } else if ([event.target.name].toString() === 'manualShipping' && event.target.checked === false) {
            this.setState({manualShipping2: 'NO'});
        }
        if ([event.target.name].toString() === 'doNotAskAgain' && event.target.checked === true) {
            this.setState({doNotAskAgain2: true});
        } else if ([event.target.name].toString() === 'doNotAskAgain' && event.target.checked === false) {
            this.setState({doNotAskAgain2: false});
        }
    };

    handleConfirmation = (event) => {
        if (this.state.doNotAskAgain2 === true) {
            this.setState({openDialog: false});
            this.handleSubmit();
        } else {
            this.setState({openDialog: true});
        }
        event.preventDefault();
    };

    handlePrint = () => {
    };

    handleSubmit = (event) => {
        this.props.data.sarReducer.createShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.createShippingDataByShipmentIDSuccess = '';
        this.setState({
            showProgressLogo: true,
            showProgressLogoDialog: true,
            counter: 0
        });
        var shipmentUrl = this.state.shipmentID;
        var materialUrl = this.state.materialID;
        var data = {
            address1: this.state.addressLine1,
            address2: this.state.addressLine2,
            city: this.state.city,
            state: this.state.addressState,
            postalCode: this.state.postalCode,
            country: this.state.country,
            ipAddress: this.state.ipAddress,
            manuallyShipped: this.state.manualShipping,
            shipped: true,
            received: false
        };
        this.props.createShippingDataByMaterialID(materialUrl, data);
        this.props.createShippingDataByShipmentID(shipmentUrl, data);
        setTimeout(
            function () {
                this.setState({counter: 1});
                if (this.state.counter === 1) {
                    if (this.props.data.sarReducer.createShippingDataByMaterialIDSuccess === true &&
                        this.props.data.sarReducer.createShippingDataByShipmentIDSuccess === true) {
                        this.setState({
                            showProgressLogo: false,
                            showProgressLogoDialog: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Shipping Successful!',
                                open: true,
                                sbColor: 'black'
                            },
                            openDialog: false,
                            materialID: '',
                            errorText1: 'This is a required field.',
                            shipmentID: '',
                            addressLine1: '',
                            addressLine2: '',
                            city: '',
                            addressState: '',
                            postalCode: '',
                            country: '',
                            ipAddress: '',
                            errorText2: 'This is a required field.',
                            ipAddressLength: '',
                            counter: '001',
                            manualShipping: '',
                            manualShipping2: 'NO',
                            counter2: 0
                        });
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            showProgressLogoDialog: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Shipping Error! Please try again.',
                                open: true,
                                sbColor: 'red'
                            }
                        })
                    }
                }
            }
                .bind(this),
            3000
        );
        /* let shipmentID = this.state.shipmentID;
        let newShipmentID = this.state.shipmentID;
        let countString = '';
        let countInteger = '';
        countInteger = parseInt(shipmentID.substring(7, 10))+1;
        countString = countInteger.toString().padStart(3,'0');
        newShipmentID = shipmentID.substring(0, 6) + '-' + countString;
        this.setState({shipmentID: newShipmentID}); */
    };

    handleDialogClose = () => {
        this.setState({
            showProgressLogo: false,
            openDialog: false,
            showProgressLogoDialog: false,
            doNotAskAgain2: false
        });
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        });
    };

    render() {

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const buttonThemeRed = createMuiTheme({
            palette: {
                primary: red
            },
        });

        const formComplete = this.state.materialID && this.state.ipAddressLength === 6;

        const rows = [
            createData('Material ID', this.state.materialID),
            createData('Shipment ID', this.state.shipmentID),
            createData('Address', this.state.addressLine1 + ' ' + this.state.addressLine2 + ' '
                + this.state.city + ' ' + this.state.addressState + ' ' + this.state.postalCode + ' '
                + this.state.country),
            createData('IP Address', this.state.ipAddress),
            createData('Manual Shipping', this.state.manualShipping2),
        ];

        return (
            <form onSubmit={this.handleConfirmation}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt=""/>
                        </div> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs>
                            <TextField
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                type="text"
                                name="materialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText=""
                                errorText={this.state.errorText1}
                                errorStyle={{"float": "left"}}
                            />
                        </Grid>
                        <Fade in={this.state.ipAddressLength === 6}>
                            <Grid container item xs>
                                <Typography variant="subheading" align="right" style={{"width": "100%"}}>
                                    Shipment ID: {this.state.shipmentID}
                                </Typography>
                            </Grid>
                        </Fade>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressLine1}
                                onChange={this.handleChange}
                                type="text"
                                name="addressLine1"
                                floatingLabelText="Address"
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressLine2}
                                onChange={this.handleChange}
                                type="text"
                                name="addressLine2"
                                floatingLabelText=" "
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText="Address Line 2"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.city}
                                onChange={this.handleChange}
                                type="text"
                                name="city"
                                floatingLabelText=" "
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText="City"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressState}
                                onChange={this.handleChange}
                                type="text"
                                name="addressState"
                                floatingLabelText=" "
                                floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="State"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.postalCode}
                                onChange={this.handleChange}
                                type="text"
                                name="postalCode"
                                floatingLabelText=" "
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText="Postal Code"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.country}
                                onChange={this.handleChange}
                                type="text"
                                name="country"
                                floatingLabelText=" "
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText="Country"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.ipAddress}
                                onChange={this.handleChange}
                                type="text"
                                name="ipAddress"
                                floatingLabelText="IP Address"
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText=""
                                errorText={this.state.errorText2}
                                errorStyle={{"float": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="manualShipping"
                                            color="default"
                                        />
                                    }
                                    label="Manual Shipping"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!formComplete}>
                                    Submit
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
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
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                                          className="App-logo-progress" alt=""/>
                                            </div> : ""}
                                    </div>
                                    <div style={{"overflowX": "auto"}}>
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
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={this.handleCheckboxChange}
                                                name="doNotAskAgain"
                                                color="default"
                                            />
                                        }
                                        label="Do not ask again."
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Print" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handlePrint} disabled>
                                        Print...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogClose}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </form>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        createShippingDataByMaterialID: (url, body) => dispatch(createShippingDataByMaterialID(url, body)),
        createShippingDataByShipmentID: (url, body) => dispatch(createShippingDataByShipmentID(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingView);
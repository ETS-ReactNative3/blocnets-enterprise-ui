import React, {Component} from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';

class ShippingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            addressState: '',
            postalCode: '',
            country: '',
            ipAddress: '',
            manualShipping: '',
            manualShipping2: 'NO',
            formComplete: '',
            openDialog: false,
            count: 0,
            doNotAskAgain: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        };
        this.serviceKey = {
            "type": "hyperledger-fabric",
            "channelId": "dev1c306705-f53f-4dbb-aa05-acc057c9bf1bcore",
            "serviceUrl": "https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1",
            "documentationUrl": "https://api.sap.com/shell/discover/contentpackage/SCPBlockchainTechnologies/api/hyperledger",
            "oAuth": {
                "clientId": "sb-2f1dce41-c872-48e8-8ee3-6d0dd7e2c2c2!b520|na-3a01f1e2-bc33-4e12-86a2-ffffaea79918!b33",
                "clientSecret": "Yw+YrsdnLkUZbKtUbvf47Qk7pps=",
                "url": "https://ebom.authentication.us10.hana.ondemand.com"
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value, formComplete: true});
    }

    handleCheckboxChange(event) {
        this.setState({[event.target.name]: event.target.checked, formComplete: true});
        [event.target.name].toString() === 'manualShipping' && event.target.checked === true
            ? this.state.manualShipping2 = 'YES' : this.state.manualShipping2 = 'NO'
    }

    handleConfirmation(event) {
        this.setState({openDialog: true});
        event.preventDefault();
    }

    handleSubmit(event) {
        this.setState({showProgressLogo: true, openDialog: false});
        let chaincodeId = "1c306705-f53f-4dbb-aa05-acc057c9bf1b-com-sap-icn-blockchain-example-helloUniverse";
        // GET Authentication
        axios.get(this.serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + btoa(this.serviceKey.oAuth.clientId + ":"
                    + this.serviceKey.oAuth.clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                this.setState({token: response.data});
                // GET the requested block
                axios.get(this.serviceKey.serviceUrl + '/chaincodes/' + chaincodeId + '/latest/' + this.state.id, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'withCredentials': true
                    }
                })
                    .then((response) => {
                        // response is all ready a javascript object
                        this.setState({
                            showProgressLogo: false,
                            materialID: '',
                            addressLine1: '',
                            addressLine2: '',
                            city: '',
                            addressState: '',
                            postalCode: '',
                            country: '',
                            ipAddress: '',
                            manualShipping: '',
                            manualShipping2: 'NO',
                            formComplete: '',
                            count: 0,
                            doNotAskAgain: '',
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Successfully shipped! Generated a new block!',
                                open: true,
                                sbColor: 'black'
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Oh no! - ' + error,
                                open: true,
                                sbColor: 'red'
                            }

                        });
                    });
            })
            .catch((error) => {
                this.setState({
                    showProgressLogo: false,
                    snackbar: {
                        autoHideDuration: 2000,
                        message: 'Oh no! - ' + error,
                        open: true,
                        sbColor: 'red'
                    }
                });
            });
        event.preventDefault();
    }

    createData(info1, info2) {
        this.state.count += 1;
        return {id: this.state.count, info1, info2};
    }

    handlePrint = () => {
    };


    handleDialogClose = () => {
        this.setState({openDialog: false});
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                message: '',
                open: false
            },
        });
    };

    render() {

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

        const rows = [
            this.createData('Material ID', this.state.materialID),
            this.createData('Address', this.state.addressLine1 + ' ' + this.state.addressLine2 + ' '
                + this.state.city + ' ' + this.state.addressState + ' ' + this.state.postalCode + ' '
                + this.state.country),
            this.createData('IP Address', this.state.ipAddress),
            this.createData('Manual Shipping', this.state.manualShipping2),
        ];

        return (
            <form onSubmit={this.handleConfirmation}>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} className="App-logo-progress"/> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs>
                            <TextField
                                value={this.state.materialID} onChange={this.handleChange} type="text"
                                name="materialID" floatingLabelText="Material ID" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressLine1} onChange={this.handleChange} type="text"
                                name="addressLine1" floatingLabelText="Address" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressLine2} onChange={this.handleChange} type="text"
                                name="addressLine2" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="Address Line 2"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.city} onChange={this.handleChange} type="text"
                                name="city" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="City"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressState} onChange={this.handleChange} type="text"
                                name="addressState" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="State"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.postalCode} onChange={this.handleChange} type="text"
                                name="postalCode" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="Postal Code"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.country} onChange={this.handleChange} type="text"
                                name="country" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="Country"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.ipAddress} onChange={this.handleChange} type="text"
                                name="ipAddress" floatingLabelText="IP Address" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="manualShipping" color="default"
                                        />
                                    }
                                    label="Manual Shipping"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!this.state.formComplete}>
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
                                <Paper>
                                    <Table>
                                        <TableBody>
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
                                </Paper>
                            </Grid>
                        </Grid>
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
                                        label="Do not ask again."
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="print" value="Print" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handlePrint}>
                                        Print...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="ok" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="cancel" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogClose}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open} message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </form>
        );

    }

}

export default ShippingView;
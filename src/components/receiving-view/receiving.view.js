import React, {Component} from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';

class ReceivingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            shipmentID: '',
            openDialog: false,
            count: 0,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
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
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIDChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.setState({showProgressLogo: true});
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
                            openDialog: true
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            showProgressLogo: false,
                            openDialog: false,
                            snackbar: {
                                open: true,
                                message: 'Oh no! - ' + error,
                                autoHideDuration: 2000,
                            }
                        });
                    });
            })
            .catch((error) => {
                this.setState({
                    showProgressLogo: false,
                    openDialog: false,
                    snackbar: {
                        open: true,
                        message: 'Oh no! - ' + error,
                        autoHideDuration: 2000,
                    }
                });
            });
        event.preventDefault();
    }

    createData(info1, info2) {
        this.state.count += 1;
        return {id: this.state.count, info1, info2};
    }

    handleDialogClose = () => {
        this.setState({openDialog: false});
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    render() {

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const rows = [
            this.createData('Material ID', 'MAT0721'),
            this.createData('Shipment ID', 'SHIP0112'),
            this.createData('Address', '123 MAIN ST., ALPHARETTA, GA, 30041, US'),
            this.createData('IP Address', '1.160.10.270'),
            this.createData('Manual Shipping', 'YES'),
        ];

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} className="App-logo-progress"/> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.materialID} onChange={this.handleIDChange} type="text"
                                name="materialID" floatingLabelText="Material ID" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.shipmentID} onChange={this.handleIDChange} type="text"
                                name="shipmentID" floatingLabelText="Shipment ID" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!this.state.materialID && !this.state.shipmentID}>
                                    Submit
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{padding: 24}}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <i className="material-icons" style={{"cursor": "pointer"}}
                                   onClick={this.handleDialogClose}>close</i>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container justify="center">
                            <Grid item xs={12}>
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
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open} message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration} onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: "red"}}
                />
            </form>
        );

    }

}

export default ReceivingView;
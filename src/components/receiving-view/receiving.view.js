import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//import Toggle from 'material-ui/Toggle';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';

class ReceivingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackBar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
            },
            dialog: {
                open: false,
            },
            legacy: {
                expanded: false,
            },
            id: '',                                         // REST API - ID
            text: '',                                       // REST API - ID
            token: [],                                      // OAUTH 2.0 token
            dialogData: [],
            materialID: '',
            shipmentID: ''
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

    handleExpandChange = (expanded) => {
        this.setState({
            legacy: {
                expanded: expanded
            }
        });
    };

    handleLegacyToggle = (event, toggle) => {
        this.setState({
            legacy: {
                expanded: toggle
            }
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialog: {
                open: false
            },
        });
    };

    handleRequestClose = () => {
        this.setState({
            snackBar: {
                open: false,
                message: '',
            },
        });
    };

    handleIDChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        let chaincodeId = "1c306705-f53f-4dbb-aa05-acc057c9bf1b-com-sap-icn-blockchain-example-helloUniverse";

        // GET Authentication
        axios.get(this.serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + btoa(this.serviceKey.oAuth.clientId + ":" + this.serviceKey.oAuth.clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                this.setState({ token: response.data, });
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
                            dialogData: response.data.Text,
                        });
                        // Show Success Message
                        this.setState({
                            snackBar: {
                                open: true,
                                message: "Successfully received! Generated a new block!",
                                autoHideDuration: 2000,
                            }
                        });
                        // Show Data 
                        this.setState({
                            dialog: {
                                open: true,
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            snackBar: {
                                open: true,
                                message: 'Oh no! - ' + error,
                                autoHideDuration: 2000,
                            }
                        });
                    });
            })
            .catch((error) => {
                this.setState({
                    snackBar: {
                        open: true,
                        message: 'Oh no! - ' + error,
                        autoHideDuration: 2000,
                    }
                });
            });

        event.preventDefault();

    }

    render() {

        const actions = [
            <FlatButton
                label="Close"
                default={true}
                onClick={this.handleDialogClose}
            />,
        ];

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow,
            },
        });

        return (
            <form onSubmit={this.handleSubmit}>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <TextField
                                value={this.state.materialID} onChange={this.handleIDChange}
                                type="text" name="materialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                value={this.state.shipmentID} onChange={this.handleIDChange}
                                type="text" name="shipmentID"
                                floatingLabelText="Shipment ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" label="Submit" value="Submit" variant="contained" color="primary" fullWidth={true} disabled={!this.state.materialID && !this.state.shipmentID}>
                                    Submit
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar
                    open={this.state.snackBar.open}
                    message={this.state.snackBar.message}
                    autoHideDuration={this.state.snackBar.autoHideDuration}
                    onRequestClose={this.handleRequestClose}
                />
                <Dialog
                    title="Block Information "
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.handleClose}
                >
                    <Card>
                        <CardText>{this.state.dialogData}</CardText>
                    </Card>
                    < br />
                </Dialog>
            </form >
        );
    }
}

export default ReceivingView;
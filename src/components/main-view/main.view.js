import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';


class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackBar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
            },
            id: '',
            text: '',
            token: []
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
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRequestClose = () => {
        this.setState({
            snackBar: {
                open: false,
                message: '',
            },
        });
    };

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    handleIdChange(event) {
        this.setState({ id: event.target.value });
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
                // Create form data
                var urlEncodedData = "";
                var urlEncodedDataPairs = [];
                urlEncodedDataPairs.push(encodeURIComponent("text") + '=' + encodeURIComponent(this.state.text));
                urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
                // POST with new authentication
                axios.post(this.serviceKey.serviceUrl + '/chaincodes/' + chaincodeId + '/latest/' + this.state.id, urlEncodedData, {
                    headers: {
                        'Authorization': 'Bearer ' + this.state.token.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'withCredentials': true
                    }
                })
                    .then((response) => {
                        // Show Success Message
                        this.setState({
                            snackBar: {
                                open: true,
                                message: "Successfully created a new block!",
                                autoHideDuration: 2000,
                            }
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            snackBar: {
                                open: true,
                                message: "Failed to create block! - " + error,
                                autoHideDuration: 2000,
                            }
                        });
                    });
            })
            .catch((error) => {
                this.setState({
                    snackBar: {
                        open: true,
                        message: "Something terrible happened! - " + error,
                        autoHideDuration: 2000,
                    }
                });
            });

        event.preventDefault();
    }

    render() {
        const style = {
            margin: 15,
            minWidth: 90 + '%'
        };

        const textAreaField = {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 90 + '%'
        }

        return (
            <form onSubmit={this.handleSubmit} style={{ "marginTop": "5%" }}>
                <TextField
                    value={this.state.id} onChange={this.handleIdChange}
                    type="text"
                    hintText="Enter a UserID here.."
                    floatingLabelText="UserID"
                    floatingLabelFixed={true}
                    style={{ "float": "left", "marginLeft": "5%" }}
                /><br />
                <br />
                <TextField
                    type="text"
                    value={this.state.text} onChange={this.handleTextChange}
                    style={textAreaField}
                    hintText="Enter the context for this block..."
                    floatingLabelFixed={true}
                    fullWidth={true}
                    multiLine={true}
                    rows={4}
                    rowsMax={4}
                />
                <br />
                <RaisedButton type="submit" label="Create New Block" style={style} fullWidth={true} value="Submit" />
                <Snackbar
                    open={this.state.snackBar.open}
                    message={this.state.snackBar.message}
                    autoHideDuration={this.state.snackBar.autoHideDuration}
                    onRequestClose={this.handleRequestClose}
                />
            </form>
        );
    }
}

export default MainView;

import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', text: '' };     //textarea content 
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
        this.accessToken = null;
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    handleIdChange(event){
        this.setState({ id: event.target.value });
    }

    handleSubmit(event) {
        var chaincodeId = "1c306705-f53f-4dbb-aa05-acc057c9bf1b-com-sap-icn-blockchain-example-helloUniverse";

        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.serviceKey.serviceUrl + '/chaincodes/' + chaincodeId + '/latest/invoke');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader("Authorization", "Bearer " + this.accessToken);
        xhr.withCredentials = true; // CORS
        xhr.onload = function () {
            if (xhr.status === 200) {
                alert("Sucessfully called the API!");
            }
        };
        xhr.send(JSON.stringify({
            function: 'write',
            arguments: [ this.state.id , this.state.text]
        }));
        xhr.getAllResponseHeaders();
        event.preventDefault();
    }

    componentDidMount() {
        // Authentication
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials');
        xhr.setRequestHeader("Authorization", "Basic " + btoa(this.serviceKey.oAuth.clientId + ":" + this.serviceKey.oAuth.clientSecret));
        console.log(xhr.setRequestHeader);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var authData = JSON.parse(xhr.response);
                this.accessToken = authData.access_token;
                console.log(xhr.response);
                console.log(this.accessToken);
                return;
            }
            alert('Get oAuth token failed');
        };
        xhr.send();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ "marginTop": "5%" }}>
                <label>
                    <input type="text" value={this.state.id} onChange={this.handleIdChange} />
          <textarea type="text" style={{ "marginLeft": "auto", "marginRight": "auto" }} value={this.state.text} onChange={this.handleTextChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default MainView;

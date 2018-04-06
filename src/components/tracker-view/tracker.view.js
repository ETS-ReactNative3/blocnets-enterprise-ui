import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class TrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: '', text: '', token: '' };     //textarea content 
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
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIdChange(event) {
        this.setState({ id: event.target.value });
    }

    handleSubmit(event) {
        let chaincodeId = "1c306705-f53f-4dbb-aa05-acc057c9bf1b-com-sap-icn-blockchain-example-helloUniverse";

        event.preventDefault();

        var xhr = new XMLHttpRequest();
        // REST API - GET request
        // GET request sent to https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1/chaincodes/1c306705-f53f-4dbb-aa05-acc057c9bf1b-com-sap-icn-blockchain-example-helloUniverse/latest/{id}
        xhr.open('GET', this.serviceKey.serviceUrl + '/chaincodes/' + chaincodeId + '/latest/' + this.state.id);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        xhr.setRequestHeader("Accept", "application/json")
        xhr.setRequestHeader("Access-Control-Allow-Methods", "OPTIONS");
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
        xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS1pZC0xIn0.eyJqdGkiOiI1NTgxOGRlZjY1Njg0YTU2YmQyNDg4NWVjZmQ1MTE1OSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6IjJmMWRjZTQxLWM4NzItNDhlOC04ZWUzLTZkMGRkN2UyYzJjMiJ9LCJzdWIiOiJzYi0yZjFkY2U0MS1jODcyLTQ4ZTgtOGVlMy02ZDBkZDdlMmMyYzIhYjUyMHxuYS0zYTAxZjFlMi1iYzMzLTRlMTItODZhMi1mZmZmYWVhNzk5MTghYjMzIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi0yZjFkY2U0MS1jODcyLTQ4ZTgtOGVlMy02ZDBkZDdlMmMyYzIhYjUyMHxuYS0zYTAxZjFlMi1iYzMzLTRlMTItODZhMi1mZmZmYWVhNzk5MTghYjMzIiwiY2lkIjoic2ItMmYxZGNlNDEtYzg3Mi00OGU4LThlZTMtNmQwZGQ3ZTJjMmMyIWI1MjB8bmEtM2EwMWYxZTItYmMzMy00ZTEyLTg2YTItZmZmZmFlYTc5OTE4IWIzMyIsImF6cCI6InNiLTJmMWRjZTQxLWM4NzItNDhlOC04ZWUzLTZkMGRkN2UyYzJjMiFiNTIwfG5hLTNhMDFmMWUyLWJjMzMtNGUxMi04NmEyLWZmZmZhZWE3OTkxOCFiMzMiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImY0ODVhMDM4IiwiaWF0IjoxNTIyOTgzNDI1LCJleHAiOjE1MjMwMjY2MjUsImlzcyI6Imh0dHA6Ly9lYm9tLmxvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6IjNkOTJhOWExLTM4YmMtNDY0YS05YmNmLTk3MDI0ZGEyMjVjMyIsImF1ZCI6WyJzYi0yZjFkY2U0MS1jODcyLTQ4ZTgtOGVlMy02ZDBkZDdlMmMyYzIhYjUyMHxuYS0zYTAxZjFlMi1iYzMzLTRlMTItODZhMi1mZmZmYWVhNzk5MTghYjMzIiwidWFhIl19.k8T4L3FoYs02OIYUOpn2IHyJCNVA0ekIOPly3adkhAd8mGk3zGveXLla27HazYP27klSFFq0ZoH7Qj4jUKHslA-zwqKrAGlTzuyS8AkE598AUyshRLW65B6Cccq8YJjog8WxJ4AI2Cgxznb2Cr-kA7nmODxdz09XurarP1PeqqYjVS2FyhBX9f_oJmWwidqtucziBRlcB4RzFOzNW8634S47ee7EvmICm1_68H4XQ1IFuN0eAeMqZFFT0XpwS4LA6mQWdbw3INtag3BqiuEBeRIdzX0nSJiXDajld6h_DjywdmJm4E4qtNh9M7wJCc_8IJISXol6pFkGdbNhbtMzoXhwViE8QJ4oFfaFpoPmK9-njsMj8m--BfvnQ_cOopyUwaswhKJZPV9vtjTakubCKB6bLjIZwUM53WSdwJFSRekGlgQ-shr4Jh5Fx0VaxZKkZSaBdVB_3kyn42oq4okeyUzJeQFpsELMFRaF2MXjVC4-FvrxxNR12l7PlKctnaRcjN2Ncxftp0kbJNv-ZODOgfBqQHEeoRVXEongUqewmv2eAHtAI13jO7Ruv1ky2LZiFHQjGieyKDTolNQefmrQ_NzYcS8gU6QrXrUKZBTnvzz3QL0X5zZ0mWjtS0eYvmxO-_Rn-NgM6nKtjYoaErfoE-QAgXsAzAOUmAII_Vj29X0");
        xhr.withCredentials = true; // CORS
        xhr.onload = function () {
            if (xhr.status === 200) {
                alert("Sucessfully called the API!");
            }
        };
        xhr.send();
    }


    componentDidMount() {
        // Authentication
        var xhr = new XMLHttpRequest();
        let accessToken = null;
        xhr.open('GET', this.serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials');
        xhr.setRequestHeader("Authorization", "Basic " + btoa(this.serviceKey.oAuth.clientId + ":" + this.serviceKey.oAuth.clientSecret));
        console.log(xhr.setRequestHeader);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var authData = JSON.parse(xhr.response);
                accessToken = authData.access_token;
                return;
            }
            alert('Get oAuth token failed');
        };
        xhr.send();
    }

    render() {
        const style = {
            margin: 12,
        };

        return (
            <form onSubmit={this.handleSubmit} style={{ "marginTop": "5%" }}>
                <TextField
                    value={this.state.id} onChange={this.handleIdChange}
                    type="text"
                    hintText="Enter a UserID here.."
                    floatingLabelText="UserID"
                    floatingLabelFixed={true}
                    style={{ "float": "left", "marginLeft": "5%" }}
                />
                <br />
                <RaisedButton type="submit" label="Track" style={style} value="Submit" />
            </form>
        );
    }
}

export default TrackerView;
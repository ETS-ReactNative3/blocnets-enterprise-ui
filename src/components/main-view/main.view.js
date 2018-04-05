import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class MainView extends Component {
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
        let chaincodeId = "1c306705-f53f-4dbb-aa05-acc057c9bf1b-com-sap-icn-blockchain-example-helloUniverse";
        let accessToken = null;

        // Authentication
        var xhr = new XMLHttpRequest();
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

        // REST API - POST request
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.serviceKey.serviceUrl + '/chaincodes/' + chaincodeId + '/latest');
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "OPTIONS");
        xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
        xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.setRequestHeader("Authorization", "Basic " + btoa( "user" + ":" + "pass"));
        xhr.setRequestHeader("Authorization", "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS1pZC0xIn0.eyJqdGkiOiI4YWNiZTQ1NTFmYmU0NzMyYWNmN2FmZWRiYTI5NTgwNCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzZXJ2aWNlaW5zdGFuY2VpZCI6IjJmMWRjZTQxLWM4NzItNDhlOC04ZWUzLTZkMGRkN2UyYzJjMiJ9LCJzdWIiOiJzYi0yZjFkY2U0MS1jODcyLTQ4ZTgtOGVlMy02ZDBkZDdlMmMyYzIhYjUyMHxuYS0zYTAxZjFlMi1iYzMzLTRlMTItODZhMi1mZmZmYWVhNzk5MTghYjMzIiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi0yZjFkY2U0MS1jODcyLTQ4ZTgtOGVlMy02ZDBkZDdlMmMyYzIhYjUyMHxuYS0zYTAxZjFlMi1iYzMzLTRlMTItODZhMi1mZmZmYWVhNzk5MTghYjMzIiwiY2lkIjoic2ItMmYxZGNlNDEtYzg3Mi00OGU4LThlZTMtNmQwZGQ3ZTJjMmMyIWI1MjB8bmEtM2EwMWYxZTItYmMzMy00ZTEyLTg2YTItZmZmZmFlYTc5OTE4IWIzMyIsImF6cCI6InNiLTJmMWRjZTQxLWM4NzItNDhlOC04ZWUzLTZkMGRkN2UyYzJjMiFiNTIwfG5hLTNhMDFmMWUyLWJjMzMtNGUxMi04NmEyLWZmZmZhZWE3OTkxOCFiMzMiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImY0ODVhMDM4IiwiaWF0IjoxNTIyOTQxMDY5LCJleHAiOjE1MjI5ODQyNjksImlzcyI6Imh0dHA6Ly9lYm9tLmxvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6IjNkOTJhOWExLTM4YmMtNDY0YS05YmNmLTk3MDI0ZGEyMjVjMyIsImF1ZCI6WyJzYi0yZjFkY2U0MS1jODcyLTQ4ZTgtOGVlMy02ZDBkZDdlMmMyYzIhYjUyMHxuYS0zYTAxZjFlMi1iYzMzLTRlMTItODZhMi1mZmZmYWVhNzk5MTghYjMzIiwidWFhIl19.ln8AhGjUf4z9dUv29j77FxMCVnMyP_p2JelSszf8eLO31tS5m7A7ub4aT9TMtlRMd6DimeKOYSrUmNBe8mppghxOjjDtflZ4R0RMZHHIxgQBaGEYxrgyoM6C29xRPitLRuQ76F5wiUZwQ4ywEhJI6JTqzSjN5L0-lt1AdcErtnfLf86F-MYEy67y-4CviyMY6GJNvgw1gqEMAOqQHPJlPIWisFEy9QHX8mAfTKSuIJWbJM4_u225QCm566wgTIVSafkNOwclwDxbuNPvAn9jG0UgRsrsiFUSy0o_tha8VYS8yi2b7rwhBsD_usAG3Ov62diTDfVL8xm_Yn9EAQQAceMdPim40dmnyWB-uRmglZt53y7thQapPzp6eSRJCog3l9pvXmG4ss6gzR78V59afW4g3Y9z_fc3_SpBXZgV6sITFjEb6_JR7MBD8f66MfMURiE2EpKNAx1g_B5e1dub3BkMBX_ZOVuEzFGHEmAh3oasLN-TFeLVs7W_1RipAje-Veo1hyOXCpdpiK7pFTvKnwy7DbaaOXy4cmb7F85sJOThHloyGRpDa5JWSAepr6eC4t_GlFO6aXQv0rUbKcUGogY5F1zznz-gim_2fKRNaLARI9j-nqEscCyeIwhDG-bSkAZ9cs5rfYHF2FM6FIZ0hnWyVJX1eyfFDK_koV3lrvo");
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
        event.preventDefault();
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

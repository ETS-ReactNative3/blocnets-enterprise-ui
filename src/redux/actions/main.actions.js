import axios from 'axios';


const token = localStorage.getItem('Token');

const chaincodes = {
    "BOM": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-supplychain",
    "SAR": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-sar",
    "DRE": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-dre"
};

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'withCredentials': true
}

const serviceKey = {
    "type": "hyperledger-fabric",
    "channelId": "dev4f374fb9-1164-4c22-876e-8fe13ab5def6channel1",
    "serviceUrl": "https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1",
    "documentationUrl": "https://api.sap.com/shell/discover/contentpackage/SCPBlockchainTechnologies/api/hyperledger_fabric",
    "oAuth": {
        "clientId": "sb-8577def2-36d0-48c9-8e83-d836e677b190!b947|na-3a01f1e2-bc33-4e12-86a2-ffffaea79918!b33",
        "clientSecret": "lUloVt0Yqx/H2sIyGfc6rdTbUyM=",
        "url": "https://development.authentication.us10.hana.ondemand.com",
        "identityZone": "development"
    }
};

export function authenticate() {
    return (dispatch) => {
        dispatch(loadingView(true));

        axios.get(serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + btoa(serviceKey.oAuth.clientId + ":" + serviceKey.oAuth.clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                localStorage.setItem('Token', response.data.access_token);
                dispatch(checkAuthorization(true))
            })
            .catch(() => dispatch(authRequestFailed(true)));
    }
}

export function getSARData(url) {
    return (dispatch) => {
        dispatch(loadingView(true));

        axios.get(serviceKey.serviceUrl + '/chaincodes/' + chaincodes.SAR + '/latest/' + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                localStorage.setItem('SAR', data);
                console.log("getSARData: " + response.data);
                return dispatch(requestSucceeded(data))
            })
            .catch(() => dispatch(requestFailed(true)));
    };
}

export function checkAuthorization(bool) {
    return {
        type: "ACCESS_GRANTED",
        payload: bool,
    };
}

export function loadingView(bool) {
    return {
        type: 'LOADING_VIEW',
        payload: bool
    };
}

export function requestSucceeded(response) {
    return {
        type: 'REQUESTED_DATA_SUCCESSFULLY',
        payload: response.data
    }

}

export function requestFailed(bool) {
    return {
        type: 'REQUESTED_DATA_FAILED',
        payload: bool
    };
}

export function authRequestFailed(bool) {
    return {
        type: 'ACCESS_REQUEST_FAILED',
        payload: bool
    }
}




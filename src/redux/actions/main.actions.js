import axios from 'axios';

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
const chaincodes = {
    "supplychain": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-supplychain"
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
                localStorage.setItem('Guest', response.data.access_token)
                return dispatch({ type: 'GET_AUTH_TOKEN', response })
            })
            .catch(() => dispatch(requestFailed(true)));
    }
}

export function getData(url) {
    return (dispatch) => {

        dispatch(loadingView(true));
        const token = localStorage.getItem('Guest');
        axios.get(serviceKey.serviceUrl + '/chaincodes/' + chaincodes.supplychain + '/latest/' + url, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'withCredentials': true
            }
        })
            .then((response) => {
                dispatch(requestSuccess(response.data))
                dispatch(loadingView(false))
            })
            .catch(() => dispatch(requestFailed(true)));
    };
}

export function getAuthorization(bool, token) {
    return {
        type: "ACCESS_GRANTED",
        isAuthenticated: bool,
        token
    };
}

export function loadingView(bool) {
    return {
        type: 'VIEW_IS_LOADING',
        loadingView: bool
    };
}

export function requestSuccess(data) {
    return {
        type: 'REQUESTED_DATA_SUCCESSFULLY',
        data: data
    };
}

export function requestFailed(bool) {
    return {
        type: 'REQUESTED_DATA_FAILED',
        requestFailed: bool
    };
}




import axios from 'axios';
import config from '../config.json';

export function authenticate() {
    return async (dispatch) => {
        dispatch(loadingView(true))
        await axios.get(config.serviceKey.oAuth.url + '/oauth/token?grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + btoa(config.serviceKey.oAuth.clientId + ":" + config.serviceKey.oAuth.clientSecret),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                localStorage.setItem('Token', response.data.access_token);
                dispatch(checkAuthorization(true))
            })
            .catch((error) => dispatch(authRequestFailed(true,error)));
    }
}

export function loadingView(bool) {
    return {
        type: "LOADING_VIEW",
        payload: bool,
    };
}

export function checkAuthorization(bool) {
    return {
        type: "ACCESS_GRANTED",
        payload: bool,
    };
}

export function authRequestFailed(bool, error) {
    return {
        type: 'ACCESS_REQUEST_FAILED',
        payload: bool + "Error:" + error
    }
}




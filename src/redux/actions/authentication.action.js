import axios from 'axios';
import config from '../config.json';
import { resolver } from '../../services/callback.resolver';

export function authenticate(creds) {
    return async (dispatch) => {
        dispatch(loadingView(true))
        await axios.post(config.middleware.oAuth.url, creds, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('Token', response.data.token);
                dispatch(checkAuthorization(true))
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch(authRequestFailed(true, errorData))
            });
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




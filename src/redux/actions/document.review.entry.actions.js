import axios from 'axios';
import config from '../config.json';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}

export function createDocumentEntryByUniqueID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_DRE_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.DRE + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_DRE_DATA_BY_UNIQUE_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_DRE_DATA_BY_UNIQUE_ID_FAILED",
                payload: true
            }));
    };
}

export function getDocumentEntryByUniqueID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_DRE_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.DRE + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data)
                sessionStorage.setItem('messages', data);
                return dispatch({
                    type: "GET_DRE_DATA_BY_UNIQUE_ID_SUCCESS",
                    payload: true + response
                });
            })
            .catch((error) => dispatch({
                type: "GET_DRE_DATA_BY_UNIQUE_ID_FAILED",
                payload: true + error
            })
            )
    };
}

export function updateDocumentEntryByUniqueID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_DRE_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.SAR + url, body, {headers})
            .then(() => {
                return dispatch({
                    type: "UPDATE_DRE_DATA_BY_UNIQUE_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_DRE_DATA_BY_UNIQUE_ID_FAILED",
                payload: true
            }));
    };
}
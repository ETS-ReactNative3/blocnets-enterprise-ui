import axios from 'axios';
import config from '../config.json';
import { resolver } from '../../services/callback.resolver';
import {tokenResolver} from "../../services/token.resolver";

export function createDocumentEntryByUniqueID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_DRE_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.DRE + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_DRE_DATA_BY_UNIQUE_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_DRE_DATA_BY_UNIQUE_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getDocumentEntryByUniqueID(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_DRE_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.DRE + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_DRE_DATA_BY_UNIQUE_ID_SUCCESS",
                    payload: true + response
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_DRE_DATA_BY_UNIQUE_ID_FAILED",
                    payload: errorData
                })
            })
    };
}

export function updateDocumentEntryByUniqueID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_DRE_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.SAR + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_DRE_DATA_BY_UNIQUE_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_DRE_DATA_BY_UNIQUE_ID_FAILED",
                    payload: errorData
                })
            });
    };
}
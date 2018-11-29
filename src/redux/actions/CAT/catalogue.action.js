import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';
import { tokenResolver } from '../../../services/token.resolver';

/**
 * CAT data by chaincode key
 * @param {*} url 
 * @param {*} body 
 */
export function createCatalogueDataByChaincodeKey(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_CAT_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.middleware.serviceUrl + config.chaincodes.CAT + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_CAT_DATA_BY_CHAINCODE_KEY_FAILED",
                    payload: errorData
                });
            })
    };
}

export function getCatalogueDataByChaincodeKey(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_CAT_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.middleware.serviceUrl + config.chaincodes.CAT + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_CAT_DATA_BY_CHAINCODE_KEY_FAILED",
                    payload: errorData
                })

            });
    };
}

export function updateCatalogueDataByChaincodeKey(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_CAT_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.middleware.serviceUrl + config.chaincodes.CAT + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_CAT_DATA_BY_CHAINCODE_KEY_FAILED",
                    payload: errorData
                })
            });
    };
}
import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';
import { tokenResolver } from '../../../services/token.resolver';

export function catalogue(chaincode, key) {
    let body = {
        chainItems: [key]
    }
    const headers = tokenResolver();
    axios.head(config.chaincodes.Default + config.chaincodes.CAT + chaincode, { headers })   // Check if chaincode Key exists
        .then(async () => {         // If chaincode Key does exist.. continue
            let dispatch = () => ({
                type: "CHECKED_CAT_KEY_DOES_EXIST",
                payload: true
            });
            await axios.get(config.chaincodes.Default + config.chaincodes.CAT + chaincode, { headers }) // GET existing data by chaincode key
                .then(async (response) => {
                    let dispatch = () => ({
                        type: "GET_CAT_KEY_DATA_SUCCESS",
                        payload: response.data
                    });
                    // for each value return from the response push into a new array object with the new 'key'
                    let keys = [key];
                    response.data.chainItems.forEach(element => {
                        keys.push(element);
                    });
                    body.chainItems = keys;
                    console.log('CAT Data: ' + chaincode + keys);
                    await axios.put(config.chaincodes.Default + config.chaincodes.CAT + chaincode, body, { headers })  // UPDATE on the existing Key with the new array of keys
                        .then(async () => {
                            return dispatch({
                                type: "UPDATE_CAT_KEY_DATA_SUCCESS",
                                payload: true
                            });
                        })
                        .catch((error) => {
                            let errorData = resolver(error);
                            return dispatch({
                                type: "UPDATE_CAT_KEY_DATA_FAILED",
                                payload: errorData
                            });
                        })
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    return dispatch({
                        type: "GET_CAT_KEY_DATA_FAILED",
                        payload: errorData
                    });
                })
        })
        .catch(async (error) => {       // If chaincode Key does not exist.. continue
            let errorData = resolver(error);    
            let dispatch = () => ({
                type: "CHECKED_CAT_KEY_DOES_NOT_EXIST",
                payload: errorData
            });
            await axios.post(config.chaincodes.Default + config.chaincodes.CAT + chaincode, body, { headers }) // POST data and new chaincode key
                .then(() => {
                    return dispatch({
                        type: "CREATE_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    return dispatch({
                        type: "CREATE_CAT_DATA_BY_CHAINCODE_KEY_FAILED",
                        payload: errorData
                    });
                })
        })
}
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
        await axios.post(config.chaincodes.Default + config.chaincodes.CAT + url, body, { headers })
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
        await axios.get(config.chaincodes.Default + config.chaincodes.CAT + url, { headers })
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
        await axios.put(config.chaincodes.Default + config.chaincodes.CAT + url, body, { headers })
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
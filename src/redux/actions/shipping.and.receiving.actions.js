import axios from 'axios';
import config from '../config.json';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}

export function createShippingDataByShipmentID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.SAR + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                payload: true
            }));
    };
}

export function getShippingDataByShipmentID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.SAR + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('DataByShipmentID', data);
                return dispatch({
                    type: "GET_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                payload: true
            }));
    };
}

export function updateShippingDataByShipmentID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.SAR + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                payload: true
            }));
    };
}

export function createShippingDataByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.SAR + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                payload: true
            }));
    };
}

export function getShippingDataByMaterialID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.SAR + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('DataByMaterialID', data);
                return dispatch({
                    type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                payload: true
            }));
    };
}

export function updateShippingDataByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.SAR + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                payload: true
            }));
    };
}
/**
 * Foreach Material ID given: 
 * 1) get it's shipping data 
 * 2) update the "receivedOrder" flag to "true"
 * 3) update the prdKey field with this material's parent (Production Order No.)
 * @param {*} ListOfMaterialIDs 
 * @param {*} prdKey 
 */
export function getAndUpdateSARListByMaterialID(ListOfMaterialIDs, prdKey) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        for (let i = 0; i < ListOfMaterialIDs.length; i++) {
            axios.get(config.chaincodes.Default + config.chaincodes.SAR + ListOfMaterialIDs[i], { headers })
                .then((response) => {

                    let obj = response.data;
                    obj.receivedOrder = true;
                    obj.prdKey = prdKey;
                    console.log(obj);
                    axios.put(config.chaincodes.Default + config.chaincodes.SAR + ListOfMaterialIDs[i], obj, { headers })
                        .then(() => {
                            return dispatch({
                                type: "UPDATE_SAR_DATA_LIST_BY_MATERIAL_ID_SUCCESS",
                                payload: true
                            });
                        })
                        .catch((error) => dispatch({
                            type: "UPDATE_SAR_DATA_LIST_BY_MATERIAL_ID_FAILED",
                            payload: error
                        }));
                    return dispatch({
                        type: "GET_SAR_DATA_LIST_BY_MATERIAL_ID_SUCCESS",
                        payload: obj
                    });
                })
                .catch((error) => dispatch({
                    type: "GET_SAR_DATA_LIST_BY_MATERIAL_ID_FAILED",
                    payload: error
                }));
        }
    };
}
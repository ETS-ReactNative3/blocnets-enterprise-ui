import axios from 'axios';


const token = localStorage.getItem('Token');

const chaincodes = {
    "Default": "https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1/chaincodes/", // API path
    "BOM": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-supplychain/latest/",
    "SAR": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-sar/latest/",
    "DRE": "4f374fb9-1164-4c22-876e-8fe13ab5def6-com-sap-blocnets-dre/latest/"
};

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
        axios.post(chaincodes.Default + chaincodes.SAR + url, body, { headers })
            .then((response) => {
                return dispatch({
                    type: "CREATE_SHIPPING_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_SHIPPING_DATA_FAILED",
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
        axios.get(chaincodes.Default + chaincodes.SAR + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('DataByShipmentID', data);
                return dispatch({
                    type: "GET_SHIPPING_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_SHIPPING_DATA_FAILED",
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
        axios.put(chaincodes.Default + chaincodes.SAR + url, body, {headers})
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
        axios.post(chaincodes.Default + chaincodes.SAR + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_SHIPPING_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_SHIPPING_DATA_FAILED",
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
        axios.get(chaincodes.Default + chaincodes.SAR + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('DataByMaterialID', data);
                return dispatch({
                    type: "GET_SHIPPING_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_SHIPPING_DATA_FAILED",
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
        axios.put(chaincodes.Default + chaincodes.SAR + url, body, {headers})
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
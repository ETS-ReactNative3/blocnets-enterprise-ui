import axios from 'axios';


const token = localStorage.getItem('Token');

const chaincodes = {
    "Default": "https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1/chaincodes/",
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

export function getShippingDataByShipmentID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.SAR + '/latest/' + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('DataByShipmentID', data);
                console.log("getShippingDataByShipmentID: " + response.data);
                return dispatch({
                    type: "GET_SHIPPING_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "REQUESTED_DATA_FAILED",
                payload: true
            }));
    };
}

export function getShippingDataByMaterialID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.SAR + '/latest/' + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('DataByMaterialID', data);
                console.log("getShippingDataByMaterialID: " + response.data);
                return dispatch({
                    type: "GET_SHIPPING_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "REQUESTED_DATA_FAILED",
                payload: true
            }));
    };
}

export function updateShippingDataByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(chaincodes.Default + chaincodes.SAR + '/latest/' + url,{ body }, { headers })
            .then((response) => {
                console.log("updateShipingDataByMaterialID: " + response);
                //resolve(response.data.content)
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATED_DATA_FAILED",
                payload: true
            }));
    };
}

export function createShippingDataByShipmentID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.SAR + '/latest/' + url,{ body }, { headers })
            .then((response) => {
                console.log("createShippingDataByShipmentID" + response);
                //resolve(response.data.content)
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATED_DATA_FAILED",
                payload: true
            }));
    };
}

export function createShippingDataByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.SAR + '/latest/' + url,{ body }, { headers })
            .then((response) => {
                console.log("createShippingDataByMaterialID" + response);
                //resolve(response.data.content)
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATED_DATA_FAILED",
                payload: true
            }));
    };
}
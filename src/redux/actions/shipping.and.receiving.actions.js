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
        axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + url, body, { headers })
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
        axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + url, { headers })
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
        axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + url, body, { headers })
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
        axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + url, body, { headers })
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
        axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + url, { headers })
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
        axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + url, body, { headers })
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

export function syncSARDataAndBindKeys(payload) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });

        if (payload.materialID && payload.shipmentID) {

            let materialKeyData = {
                materialID: payload.materialID,
                shipmentID: payload.shipmentID,
                listOfKeys: [{ guid: payload.shipmentID }],
                shipmentSent: true,
                shipmentCompleted: payload.shipmentCompleted,
                shipmentQuantity: payload.shipmentQuantity,
                manuallyShipped: payload.manuallyShipped,
                address1: payload.address1,
                address2: payload.address2,
                city: payload.city,
                state: payload.state,
                country: payload.country,
                postalCode: payload.postalCode,
                ipAddress: payload.ipAddress,
                receivedShipment: payload.receivedShipment,
                receivedOrder: payload.receivedOrder,
                deliverOrderNo: payload.deliverOrderNo,
                prdKey: payload.prdKey
            };

            let shipKeyData = {
                materialID: payload.materialID,
                shipmentID: payload.shipmentID,
                listOfKeys: payload.listOfKeys,
                shipmentSent: true,
                shipmentCompleted: payload.shipmentCompleted,
                shipmentQuantity: payload.shipmentQuantity,
                manuallyShipped: payload.manuallyShipped,
                shipped: true,
                address1: payload.address1,
                address2: payload.address2,
                city: payload.city,
                state: payload.state,
                country: payload.country,
                postalCode: payload.postalCode,
                ipAddress: payload.ipAddress,
                receivedShipment: '',
                receivedOrder: '',
                deliverOrderNo: '',
                prdKey: ''
            };

            axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + payload.shipmentID, payload, { headers })
                .then(() => {
                    dispatch({
                        type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                        payload: error
                    });
                })

            for (let i = 0; i < shipKeyData.listOfKeys.length; i++) {
                axios.head(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + shipKeyData.listOfKeys[i].materialID, { headers })
                    .then(() => {
                        dispatch({
                            type: "CHECKED_SAR_DATA_BY_MATERIAL_ID_DOES_EXIST",
                            payload: true
                        });
                        axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + shipKeyData.listOfKeys[i].materialID, { headers })
                            .then((response) => {
                                dispatch({
                                    type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                                    payload: true
                                });

                                if (response.data) {
                                    let updatedObj = {
                                        materialID: shipKeyData.listOfKeys[i].materialID,
                                        shipmentID: response.data.shipmentID,
                                        listOfKeys: [{ guid: payload.shipmentID }],
                                        shipmentSent: true,
                                        shipmentCompleted: response.data.shipmentCompleted,
                                        shipmentQuantity: response.data.shipmentQuantity,
                                        manuallyShipped: response.data.manuallyShipped,
                                        address1: response.data.address1,
                                        address2: response.data.address2,
                                        city: response.data.city,
                                        state: response.data.state,
                                        country: response.data.country,
                                        postalCode: response.data.postalCode,
                                        ipAddress: response.data.ipAddress,
                                        receivedShipment: response.data.receivedShipment,
                                        receivedOrder: response.data.receivedOrder,
                                        deliverOrderNo: response.data.deliverOrderNo,
                                        prdKey: response.data.prdKey
                                    };

                                    for (let i = 0; i < response.data.listOfKeys.length; i++) {
                                        if (response.data.listOfKeys[i].guid) {
                                            console.log(response.data.listOfKeys[i].guid);
                                            updatedObj.listOfKeys.push(response.data.listOfKeys[i]);
                                        } else {
                                            let obj = {
                                                guid: response.data.listOfKeys[i]
                                            };
                                            updatedObj.listOfKeys.push(obj);
                                        }
                                        axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + updatedObj.materialID, updatedObj, { headers })
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
                                    }
                                }

                            })
                            .catch((error) => {
                                dispatch({
                                    type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                                    payload: error
                                });
                            })

                    })
                    .catch(() => {
                        dispatch({
                            type: "CHECKED_SAR_DATA_BY_MATERIAL_ID_DOES_NOT_EXIST",
                            payload: true
                        });
                        axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + shipKeyData.listOfKeys[i].materialID, materialKeyData, { headers })
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
                    })
            }
        }
        dispatch({
            type: "SYNC_SAR_DATA_AND_BIND_KEYS_SUCCESS",
            payload: true
        });
    }
}

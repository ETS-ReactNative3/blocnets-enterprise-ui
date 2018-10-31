import axios from 'axios';
import config from '../config.json';
import { resolver } from '../../services/callback.resolver';
import {tokenResolver} from "../../services/token.resolver";

export function createShippingDataByShipmentID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getShippingDataByShipmentID(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateShippingDataByShipmentID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function createShippingDataByMaterialID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getShippingDataByMaterialID(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateShippingDataByMaterialID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                    payload: errorData
                })
            });
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
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        for (let i = 0; i < ListOfMaterialIDs.length; i++) {
            await axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + ListOfMaterialIDs[i], { headers })
                .then(async (response) => {

                    let obj = response.data;
                    obj.receivedOrder = true;
                    obj.prdKey = prdKey;
                    await axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + ListOfMaterialIDs[i], obj, { headers })
                        .then(() => {
                            return dispatch({
                                type: "UPDATE_SAR_DATA_LIST_BY_MATERIAL_ID_SUCCESS",
                                payload: true
                            });
                        })
                        .catch((error) => {
                            let errorData = resolver(error);
                            dispatch({
                                type: "UPDATE_SAR_DATA_LIST_BY_MATERIAL_ID_FAILED",
                                payload: errorData
                            })
                        });
                    return dispatch({
                        type: "GET_SAR_DATA_LIST_BY_MATERIAL_ID_SUCCESS",
                        payload: obj
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "GET_SAR_DATA_LIST_BY_MATERIAL_ID_FAILED",
                        payload: errorData
                    })
                });
        }
    };
}

export function syncSARDataAndBindKeys(payload) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
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
                prdKey: payload.prdKey,
                deviceUUID: payload.deviceUUID,
                plannedShipDate: payload.plannedShipDate,
                actualShipDate: payload.actualShipDate,
            };

            let shipKeyData = {
                materialID: payload.materialID,
                shipmentID: payload.shipmentID,
                listOfKeys: payload.listOfKeys,
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
                prdKey: payload.prdKey,
                deviceUUID: payload.deviceUUID,
                plannedShipDate: payload.plannedShipDate,
                actualShipDate: payload.actualShipDate,
            };

            await axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'shipmentId=' + payload.shipmentID, payload, { headers })
                .then(() => {
                    dispatch({
                        type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED",
                        payload: errorData
                    });
                })

            for (let i = 0; i < shipKeyData.listOfKeys.length; i++) {
                await axios.head(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + shipKeyData.listOfKeys[i].materialID, { headers })
                    .then(async () => {
                        dispatch({
                            type: "CHECKED_SAR_DATA_BY_MATERIAL_ID_DOES_EXIST",
                            payload: true
                        });
                        await axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + shipKeyData.listOfKeys[i].materialID, { headers })
                            .then(async (response) => {
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
                                        prdKey: response.data.prdKey,
                                        deviceUUID: response.data.deviceUUID,
                                        plannedShipDate: response.data.plannedShipDate,
                                        actualShipDate: response.data.actualShipDate,
                                    };

                                    if (response.data.listOfKeys === null) {
                                        response.data.listOfKeys = [{ guid: null }];
                                    }

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
                                        await axios.put(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + updatedObj.materialID, updatedObj, { headers })
                                            .then(() => {
                                                return dispatch({
                                                    type: "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                                                    payload: true
                                                });
                                            })
                                            .catch((error) => {
                                                let errorData = resolver(error);
                                                dispatch({
                                                    type: "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                                                    payload: errorData
                                                })
                                            });
                                    }
                                }

                            })
                            .catch((error) => {
                                let errorData = resolver(error);
                                dispatch({
                                    type: "GET_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                                    payload: errorData
                                });
                            })

                    })
                    .catch((error) => {
                        let errorData = resolver(error);
                        dispatch({
                            type: "CHECKED_SAR_DATA_BY_MATERIAL_ID_DOES_NOT_EXIST",
                            payload: errorData
                        });
                        axios.post(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + shipKeyData.listOfKeys[i].materialID, materialKeyData, { headers })
                            .then(() => {
                                return dispatch({
                                    type: "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS",
                                    payload: true
                                });
                            })
                            .catch((error) => {
                                let errorData = resolver(error);
                                dispatch({
                                    type: "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED",
                                    payload: errorData
                                })
                            });
                    })
            }
        }
        dispatch({
            type: "SYNC_SAR_DATA_AND_BIND_KEYS_SUCCESS",
            payload: true
        });
    }
}

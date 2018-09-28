import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';
import {tokenResolver} from '../../../services/token.resolver';

/**
 * BOM data by Material ID
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByMaterialID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_BOM_DATA_BY_MATERIAL_ID_FAILED",
                    payload: errorData
                });
            })
    };
}

export function getBillOfMaterialsByMaterialID(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.BOM + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_ID_FAILED",
                    payload: errorData
                })

            });
    };
}

export function updateBillOfMaterialsByMaterialID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.BOM + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_ID_FAILED",
                    payload: errorData
                })
            });
    };
}
/**
 * BOM data By Material Name
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByMaterialName(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_MATERIAL_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_BOM_DATA_MATERIAL_NAME_FAILED",
                    payload: errorData
                })
            })
    };
}

export function getBillOfMaterialsByMaterialName(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_NAME_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_NAME_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateBillOfMaterialsByMaterialName(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_NAME_FAILED",
                    payload: errorData
                })
            });
    };
}
/**
 * BOM data by Material Description
 */
export function createBillOfMaterialsByMaterialDesc(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_MATERIAL_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_BOM_DATA_BY_MATERIAL_DESC_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getBillOfMaterialsByMaterialDesc(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_DESC_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_DESC_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateBillOfMaterialsByMaterialDesc(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_DESC_FAILED",
                    payload: errorData
                })
            });
    };
}
/**
 * BOM data by Part Number 
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByPartNumber(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_NUMBER_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getBillOfMaterialsByPartNumber(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_BOM_DATA_BY_PART_NUMBER_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_BOM_DATA_BY_PART_NUMBER_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateBillOfMaterialsByPartNumber(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_NUMBER_FAILED",
                    payload: errorData
                })
            });
    };
}
/**
 * BOM data by Part Name
 * @param {*} url
 * @param {*} body
 */
export function createBillOfMaterialsByPartName(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_NAME_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getBillOfMaterialsByPartName(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.BOM + "partName=" + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_BOM_DATA_BY_PART_NAME_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_BOM_DATA_BY_PART_NAME_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateBillOfMaterialsByPartName(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.BOM + "partName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_NAME_FAILED",
                    payload: errorData
                })
            });
    };
}
/**
 * BOM data by Part Description
 * @param {*} url
 * @param {*} body
 */
export function createBillOfMaterialsByPartDesc(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_DESC_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getBillOfMaterialsByPartDesc(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_BOM_DATA_BY_PART_DESC_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_BOM_DATA_BY_PART_DESC_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateBillOfMaterialsByPartDesc(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_DESC_FAILED",
                    payload: errorData
                })
            });
    };
}
import axios from 'axios';
import config from '../config.json';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}
/**
 * BOM data by Material ID
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.BOM + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BOM_DATA_BY_MATERIAL_ID_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByMaterialID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.BOM + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByMaterialID', data);
                return dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BOM_DATA_BY_MATERIAL_ID_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.BOM + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BOM_DATA_BY_MATERIAL_ID_FAILED",
                payload: true
            }));
    };
}
/**
 * BOM data By Material Name
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByMaterialName(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_MATERIAL_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BOM_DATA_MATERIAL_NAME_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByMaterialName(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByMaterialName', data);
                return dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_NAME_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BOM_DATA_BY_MATERIAL_NAME_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByMaterialName(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BOM_DATA_BY_MATERIAL_NAME_FAILED",
                payload: true
            }));
    };
}
/**
 * BOM data by Material Description
 */
export function createBillOfMaterialsByMaterialDesc(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_MATERIAL_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BOM_DATA_BY_MATERIAL_DESC_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByMaterialDesc(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByMaterialDesc', data);
                return dispatch({
                    type: "GET_BOM_DATA_BY_MATERIAL_DESC_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BOM_DATA_BY_MATERIAL_DESC_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByMaterialDesc(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_MATERIAL_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BOM_DATA_BY_MATERIAL_DESC_FAILED",
                payload: true
            }));
    };
}
/**
 * BOM data by Part Number 
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByPartNumber(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BOM_DATA_BY_PART_NUMBER_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByPartNumber(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByPartNumber', data);
                return dispatch({
                    type: "GET_BOM_DATA_BY_PART_NUMBER_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BOM_DATA_BY_PART_NUMBER_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByPartNumber(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BOM_DATA_BY_PART_NUMBER_FAILED",
                payload: true
            }));
    };
}
/**
 * BOM data by Part Name
 * @param {*} url
 * @param {*} body
 */
export function createBillOfMaterialsByPartName(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BOM_DATA_BY_PART_NAME_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByPartName(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.BOM + "partName=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByPartName', data);
                return dispatch({
                    type: "GET_BOM_DATA_BY_PART_NAME_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BOM_DATA_BY_PART_NAME_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByPartName(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.put(
            config.chaincodes.Default + config.chaincodes.BOM + "partName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BOM_DATA_BY_PART_NAME_FAILED",
                payload: true
            }));
    };
}
/**
 * BOM data by Part Description
 * @param {*} url
 * @param {*} body
 */
export function createBillOfMaterialsByPartDesc(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BOM_DATA_BY_PART_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BOM_DATA_BY_PART_DESC_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByPartDesc(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByPartDesc', data);
                return dispatch({
                    type: "GET_BOM_DATA_BY_PART_DESC_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BOM_DATA_BY_PART_DESC_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByPartDesc(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_BOM_VIEW",
            payload: true
        });
        axios.put(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BOM_DATA_BY_PART_DESC_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BOM_DATA_BY_PART_DESC_FAILED",
                payload: true
            }));
    };
}
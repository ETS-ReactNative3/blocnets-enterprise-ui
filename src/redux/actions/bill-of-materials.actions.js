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
/**
 * BOM data by Material ID
 * @param {*} url 
 * @param {*} body 
 */
export function createBillOfMaterialsByMaterialID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.BOM + url, body, { headers })
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.BOM + url, { headers })
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(chaincodes.Default + chaincodes.BOM + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BILL_OF_MATERIALS_DATA_FAILED",
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.BOM + "materialName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByMaterialName(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.BOM + "materialName=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByMaterialName', data);
                return dispatch({
                    type: "GET_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByMaterialName(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(
            chaincodes.Default + chaincodes.BOM + "materialName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BILL_OF_MATERIALS_DATA_FAILED",
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.BOM + "materialDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByMaterialDesc(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.BOM + "materialDesc=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByMaterialDesc', data);
                return dispatch({
                    type: "GET_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByMaterialDesc(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(
            chaincodes.Default + chaincodes.BOM + "materialDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BILL_OF_MATERIALS_DATA_FAILED",
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByPartNumber(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByPartNumber', data);
                return dispatch({
                    type: "GET_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "GET_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByPartNumber(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(chaincodes.Default + chaincodes.BOM + "partNumber=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BILL_OF_MATERIALS_DATA_FAILED",
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.BOM + "partName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByPartName(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.BOM + "partName=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByPartName', data);
                return dispatch({
                    type: "GET_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByPartName(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(
            chaincodes.Default + chaincodes.BOM + "partName=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BILL_OF_MATERIALS_DATA_FAILED",
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
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.BOM + "partDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function getBillOfMaterialsByPartDesc(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.BOM + "partDesc=" + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data);
                sessionStorage.setItem('BOMDataByPartDesc', data);
                return dispatch({
                    type: "GET_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}

export function updateBillOfMaterialsByPartDesc(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.put(
            chaincodes.Default + chaincodes.BOM + "partDesc=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_BILL_OF_MATERIALS_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_BILL_OF_MATERIALS_DATA_FAILED",
                payload: true
            }));
    };
}
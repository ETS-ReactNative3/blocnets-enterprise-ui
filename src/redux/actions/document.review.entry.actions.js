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

export function createDocumentEntryByUserID(url, body) {
    return (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        axios.post(chaincodes.Default + chaincodes.DRE + "userid=" + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_DRE_DATA_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_DRE_DATA_FAILED",
                payload: true
            }));
    };
}

export function getDocumentEntryByUserID(url) {
    return (dispatch) => {
        dispatch({
            type: "LOADING VIEW",
            payload: true
        });
        axios.get(chaincodes.Default + chaincodes.DRE + url, { headers })
            .then((response) => {
                let data = JSON.stringify(response.data)
                console.log("DRE data:" + data);
                sessionStorage.setItem('messages', data);
                return dispatch({
                    type: "GET_DRE_DATA_SUCCESS",
                    payload: true + response
                });
            })
            .catch((error) => dispatch({
                type: "GET_DRE_DATA_FAILED",
                payload: true + error
            })
            )
    };
}
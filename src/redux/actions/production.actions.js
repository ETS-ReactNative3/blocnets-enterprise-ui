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
 * PRD data by Production Order Number
 * @param {*} url Production Order Number
 * @param {*} body PRD chaincode schema data
 */
export function createProductionOrderByProdOrderNo(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_PRD_VIEW",
            payload: true
        });
        await axios.post(config.chaincodes.Default + config.chaincodes.PRD + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED",
                payload: true
            }));
    };
}

export function getProductionOrderByProdOrderNo(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_PRD_VIEW",
            payload: true
        });
        await axios.get(config.chaincodes.Default + config.chaincodes.PRD + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED",
                payload: true
            }));
    };
}

export function updateProductionOrderByProdOrderNo(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_PRD_VIEW",
            payload: true
        });
        await axios.put(config.chaincodes.Default + config.chaincodes.PRD + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED",
                payload: true
            }));
    };
}
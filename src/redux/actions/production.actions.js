import axios from 'axios';
import config from '../config.json';
import { resolver } from '../../services/callback.resolver';
import { tokenResolver } from "../../services/token.resolver";
import { catalogue } from './CAT/catalogue.action';

/**
 * PRD data by Production Order Number
 * @param {*} url Production Order Number
 * @param {*} body PRD chaincode schema data
 */

// check whether Production Order No. exists or not
export function checkProductionOrderByProductionOrderNo(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_SAR_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.head(config.middleware.serviceUrl + config.chaincodes.PRD + url, { headers })
            .then(() => {
                return dispatch({
                    type: "CHECKED_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_DOES_EXIST",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CHECKED_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_DOES_NOT_EXIST",
                    payload: errorData
                })
            });
    };
}




export function createProductionOrderByProdOrderNo(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_PRD_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        const archive = catalogue('PRD', url);
        await axios.post(config.middleware.serviceUrl + config.chaincodes.PRD + url, body, { headers })
            .then(() => {
                return archive + dispatch({
                    type: "CREATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getProductionOrderByProdOrderNo(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_PRD_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.middleware.serviceUrl + config.chaincodes.PRD + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateProductionOrderByProdOrderNo(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_PRD_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.middleware.serviceUrl + config.chaincodes.PRD + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED",
                    payload: errorData
                })
            });
    };
}
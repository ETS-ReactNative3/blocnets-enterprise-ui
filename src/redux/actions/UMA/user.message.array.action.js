import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';
import { tokenResolver } from '../../../services/token.resolver';

export function createUserMessageDataByUserID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.middleware.serviceUrl + config.chaincodes.UMA + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_UMA_DATA_BY_USER_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_UMA_DATA_BY_USER_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getUserMessageDataByUserID(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.middleware.serviceUrl + config.chaincodes.UMA + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_UMA_DATA_BY_USER_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_UMA_DATA_BY_USER_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function updateUserMessageDataByUserID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.put(config.middleware.serviceUrl + config.chaincodes.UMA + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_UMA_DATA_BY_USER_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "UPDATE_UMA_DATA_BY_USER_ID_FAILED",
                    payload: errorData
                })
            });
    };
}

export function getEachMessageForUserID(user) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.middleware.serviceUrl + config.chaincodes.UMA + user, { headers })
            .then(async (response) => {
                let inbox = [];
                if (response.data && response.data.userMessages && response.data.userMessages.length > 0) {
                    for (let i = 0; i < response.data.userMessages.length; i++) {
                        if (response.data.userMessages[i] !== 'string') {
                            let url = response.data.userMessages[i];
                            await axios.get(config.middleware.serviceUrl + config.chaincodes.DRE + url, { headers })
                                .then((response) => {
                                    inbox.push(response.data);
                                    return dispatch({
                                        type: "GET_EACH_MESSAGE_FOR_USER_ID_SUCCESS",
                                        payload: inbox
                                    });
                                })
                                .catch((error) => {
                                    let errorData = resolver(error);
                                    dispatch({
                                        type: "GET_EACH_MESSAGE_FOR_USER_ID_FAILED",
                                        payload: errorData
                                    })
                                });
                        }
                    }
                }
            }).catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_UMA_DATA_FOR_USER_ID_FAILED",
                    payload: errorData
                });
            })
    }
}

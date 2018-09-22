import axios from 'axios';
import config from '../config.json';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}

export function createUserMessageDataByUserID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        await axios.post(config.chaincodes.Default + config.chaincodes.UMA + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_UMA_DATA_BY_USER_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "CREATE_UMA_DATA_BY_USER_ID_FAILED",
                payload: true
            }));
    };
}

export function getUserMessageDataByUserID(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        await axios.get(config.chaincodes.Default + config.chaincodes.UMA + url, { headers })
            .then((response) => {
                return dispatch({
                    type: "GET_UMA_DATA_BY_USER_ID_SUCCESS",
                    payload: response.data
                });
            })
            .catch(() => dispatch({
                type: "GET_UMA_DATA_BY_USER_ID_FAILED",
                payload: true
            }));
    };
}

export function updateUserMessageDataByUserID(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        await axios.put(config.chaincodes.Default + config.chaincodes.UMA + url, body, { headers })
            .then(() => {
                return dispatch({
                    type: "UPDATE_UMA_DATA_BY_USER_ID_SUCCESS",
                    payload: true
                });
            })
            .catch(() => dispatch({
                type: "UPDATE_UMA_DATA_BY_USER_ID_FAILED",
                payload: true
            }));
    };
}

export function getEachMessageForUserID(user) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_UMA_VIEW",
            payload: true
        });
        await axios.get(config.chaincodes.Default + config.chaincodes.UMA + user, { headers })
            .then((response) => {
                let inbox = [];
                if (response.data) {
                    for (let i = 0; i < response.data.userMessages.length; i++) {
                        let url = response.data.userMessages[i];
                        axios.get(config.chaincodes.Default + config.chaincodes.DRE + url, { headers })
                            .then((response) => {
                                inbox.push(response.data);
                                return dispatch({
                                    type: "GET_EACH_MESSAGE_FOR_USER_ID_SUCCESS",
                                    payload: inbox
                                });
                            })
                            .catch((error) => dispatch({
                                type: "GET_EACH_MESSAGE_FOR_USER_ID_FAILED",
                                payload: error
                            }));
                    }
                }
            }).catch((error) => dispatch({
                type: "GET_UMA_DATA_FOR_USER_ID_FAILED",
                payload: error
            }))
    }
}

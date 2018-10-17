import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';
import {tokenResolver} from '../../../services/token.resolver';

export function uploadFileByUserId(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_FILE_VIEW",
            payload: true
        })
        const headers = tokenResolver();
        if (body.file) {
            await axios.post(config.chaincodes.Default + config.chaincodes.FILE + url, body, { headers })
                .then(() => {
                    dispatch({
                        type: "UPLOAD_NEW_FILE_BY_USER_ID_SUCCESS",
                        payload: true
                    });
                })
                .then((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "UPLOAD_NEW_FILE_BY_USER_ID_FAILED",
                        payload: errorData
                    });
                })
        }
    }
}

export function retrieveFileByKey(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_FILE_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.get(config.chaincodes.Default + config.chaincodes.FILE + url, { headers })
            .then((response) => {
                dispatch({
                    type: "RETRIEVE_FILE_BY_KEY_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "RETRIEVE_FILE_BY_KEY_FAILED",
                    payload: errorData
                });
            })
    }
}
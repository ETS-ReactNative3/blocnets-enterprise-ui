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
                console.log(response.data);
                let base64ToFile = (dataurl, filename) => {
                    const arr = dataurl.split(',')
                    const mime = arr[0].match(/:(.*?);/)[1]
                    const bstr = atob(arr[1])
                    let n = bstr.length
                    const u8arr = new Uint8Array(n)
                    while (n) {
                        u8arr[n - 1] = bstr.charCodeAt(n - 1)
                        n -= 1 // to make eslint happy
                    }
                    return new File([u8arr], filename, { type: mime })
                }
                let file = base64ToFile(response.data.file);
                dispatch({
                    type: "RETRIEVE_FILE_BY_KEY_SUCCESS",
                    payload: file
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
import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}

export function uploadFileByUserId(url, body) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_FILE_VIEW",
            payload: true
        })
        if (body.file) {
            let fileToBase64 = {
                file: body.file,
                creatorID: body.creatorID
            }
            // Base64 String
            var reader = new FileReader();
            reader.readAsDataURL(body.file);
            fileToBase64.file = reader.result;
            console.log(reader.result);
            // Binary String
            /*  var binaryString = reader.result;
             console.log(btoa(binaryString));
             reader.onerror = function (error) {
                 alert('Error: ', error);
             }; */

            await axios.post(config.chaincodes.Default + config.chaincodes.FILE + url, fileToBase64, { headers })
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

export function retrieveFileByUserId(url) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_FILE_VIEW",
            payload: true
        });

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
                    type: "RETRIEVE_FILE_BY_USER_ID_SUCCESS",
                    payload: file
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "RETRIEVE_FILE_BY_USER_ID_FAILED",
                    payload: errorData
                });
            })
    }
}
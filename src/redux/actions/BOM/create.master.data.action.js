import axios from 'axios';
import config from '../../config.json';
import {
    createBillOfMaterialsByMaterialID,
    createBillOfMaterialsByMaterialName,
    createBillOfMaterialsByMaterialDesc,
    createBillOfMaterialsByPartNumber,
    createBillOfMaterialsByPartName,
    createBillOfMaterialsByPartDesc
} from './bill-of-materials.actions';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}

export function createMasterDataKeys(data) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });

        await createBillOfMaterialsByMaterialID(data.material.materialNumber, data)
            .then(() => {
                await createBillOfMaterialsByMaterialName(data.material.materialDescription, data);
            })
            .then(() => {
                await createBillOfMaterialsByMaterialDesc(data.material.materialSerialNumber, data);
            })
            .then(() => {
                if (data.material.materialMvmtMaterialNumber) {
                    await createBillOfMaterialsByPartNumber(data.material.materialMvmtMaterialNumber, data);
                }
            })
            .then(() => {
                if (data.material.materialMvmtCageCode) {
                    await createBillOfMaterialsByPartName(data.material.materialMvmtCageCode, data);
                }
            })
            .then(() => {
                if (data.material.materialMvmtSupplierName) {
                    await createBillOfMaterialsByPartDesc(data.material.materialMvmtSupplierName, data);
                }
            })
            .then(() => {
                dispatch({
                    type: "CREATE_MASTER_DATA_KEYS_SUCCESS",
                    payload: true
                })
            })
            .catch((error) => {
                dispatch({
                    type: "CREATE_MASTER_DATA_KEYS_FAILED",
                    payload: error
                })
            })
    }
}
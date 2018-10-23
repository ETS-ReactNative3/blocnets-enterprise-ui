import axios from 'axios';
import config from '../../config.json';
import { resolver } from '../../../services/callback.resolver';
import {tokenResolver} from '../../../services/token.resolver';

export function createMasterDataKeys(data) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_VIEW",
            payload: true
        });
        const headers = tokenResolver();
        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + data.material.materialNumber, data, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_MASTER_DATA_KEY_MATERIAL_ID_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_MASTER_DATA_KEY_MATERIAL_ID_FAILED",
                    payload: errorData
                });
            })

        await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "materialName=" + data.material.materialSerialNumber, data, { headers })
            .then(() => {
                return dispatch({
                    type: "CREATE_MASTER_DATA_KEY_MATERIAL_NAME_SUCCESS",
                    payload: true
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "CREATE_MASTER_DATA_KEY_MATERIAL_NAME_FAILED",
                    payload: errorData
                });
            })

        if (data.material.materialDescription) {
            await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "materialDesc=" + data.material.materialDescription, data, { headers })
                .then(() => {
                    return dispatch({
                        type: "CREATE_MASTER_DATA_KEY_MATERIAL_DESC_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "CREATE_MASTER_DATA_KEY_MATERIAL_DESC_FAILED",
                        payload: errorData
                    });
                })
        }

        if (data.material.materialMvmtMaterialNumber) {
            await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partNumber=" + data.material.materialMvmtMaterialNumber, data, { headers })
                .then(() => {
                    return dispatch({
                        type: "CREATE_MASTER_DATA_KEY_PART_NO_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "CREATE_MASTER_DATA_KEY_PART_NO_FAILED",
                        payload: errorData
                    });
                })

        }

        if (data.material.materialMvmtCageCode) {
            await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partName=" + data.material.materialMvmtCageCode, data, { headers })
                .then(() => {
                    return dispatch({
                        type: "CREATE_MASTER_DATA_KEY_PART_NAME_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "CREATE_MASTER_DATA_KEY_PART_NAME_FAILED",
                        payload: errorData
                    });
                })
        }

        if (data.material.materialMvmtSupplierName) {
            await axios.post(config.chaincodes.Default + config.chaincodes.BOM + "partDesc=" + data.material.materialMvmtSupplierName, data, { headers })
                .then(() => {
                    return dispatch({
                        type: "CREATE_MASTER_DATA_KEY_PART_DESC_SUCCESS",
                        payload: true
                    });
                })
                .catch((error) => {
                    let errorData = resolver(error);
                    dispatch({
                        type: "CREATE_MASTER_DATA_KEY_PART_DESC_FAILED",
                        payload: errorData
                    });
                })
        }
        return dispatch({
            type: "CREATE_MASTER_DATA_KEYS_SUCCESS",
            payload: true
        })
    }
}
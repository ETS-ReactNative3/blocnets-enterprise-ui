import axios from 'axios';
import config from '../config.json';
import { resolver } from '../../services/callback.resolver';

const token = localStorage.getItem('Token');

const headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'withCredentials': true
}
/**
 * Root = [
 * name: "string",
 * attributes: { MaterialID: "", materialName: "", ipAddress: "" },
 * children: []
 * ]
 * 
 * Push objects as children into Root.children
 * ====================================
 * Get productionOrderNo. from sarData.prdKey
 * Foreach element in prdData.oldMaterialID => treeData.children.push
 * children = []
 */

export function createConstruct(materialID) {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_CONSTRUCT",
            payload: true
        });
        await axios.get(config.chaincodes.Default + config.chaincodes.SAR + 'materialId=' + materialID, { headers })
            .then((response) => {
                let obj = response.data;
                let key = obj.prdKey;
                if (key) {
                    axios.get(config.chaincodes.Default + config.chaincodes.PRD + key, { headers })
                        .then((response) => {
                            let construct = {
                                name: key,
                                attributes: { ipAddress: response.data.ipAddress },
                                children: [],
                            };

                            for (var i = 0; i < response.data.oldMaterialID.length; i++) {
                                let nestedObj = {
                                    name: response.data.oldMaterialID[i].materialID,
                                    attributes: {
                                        parent: response.data.oldMaterialID[i].parent
                                    },
                                    children: response.data.oldMaterialID[i].children,
                                }
                                construct.children.push(nestedObj);
                            }
                            return dispatch({
                                type: "GET_PRD_DATA_FOR_CONSTRUCT_SUCCESS",
                                payload: construct
                            });
                        })
                        .catch((error) => {
                            let errorData = resolver(error);
                            dispatch({
                                type: "GET_PRD_DATA_FOR_CONSTRUCT_FAILED",
                                payload: errorData
                            })
                        });
                }
                return dispatch({
                    type: "GET_SHIPPING_DATA_FOR_CONSTRUCT_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => {
                let errorData = resolver(error);
                dispatch({
                    type: "GET_SHIPPING_DATA_FOR_CONSTRUCT_FAILED",
                    payload: errorData
                })
            });
    };
}
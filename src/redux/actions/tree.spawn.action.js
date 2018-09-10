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
    return (dispatch) => {
        dispatch({
            type: "LOADING_CONSTRUCT",
            payload: true
        });
        axios.get(config.chaincodes.Default + config.chaincodes.SAR + materialID, { headers })
            .then((response) => {
                let obj = response.data;
                if (obj.prdKey) {
                    axios.get(config.chaincodes.Default + config.chaincodes.PRD + obj.prdKey, { headers })
                        .then((response) => {
                            let prdObj = response.data
                            let construct = [
                                {
                                    name: obj.materialID,
                                    attributes: { ipAddress: obj.ipAddress },
                                    children: [],
                                },
                            ];

                            for (var i = 0; i < prdObj.oldMaterialID.length; i++) {
                                let nestedObj = {
                                    name: prdObj.oldMaterialID[i].materialID,
                                    attributes: {
                                        parent: prdObj.oldMaterialID[i].parent
                                    },
                                    children: [prdObj.oldMaterialID[i].children],
                                }
                                construct.children.push(nestedObj);
                            }

                            return dispatch({
                                type: "GET_PRD_DATA_FOR_CONSTRUCT_SUCCESS",
                                payload: construct
                            });
                        })
                        .catch((error) => dispatch({
                            type: "GET_PRD_DATA_FOR_CONSTRUCT_FAILED",
                            payload: error
                        }));
                }
                return dispatch({
                    type: "GET_SHIPPING_DATA_FOR_CONSTRUCT_SUCCESS",
                    payload: response.data
                });
            })
            .catch((error) => dispatch({
                type: "GET_SHIPPING_DATA_FOR_CONSTRUCT_FAILED",
                payload: error
            }));
    };
}
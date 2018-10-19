export function catReducer(state = {}, action) {
    switch (action.type) {
        case "CREATE_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS": {
            return { ...state, createCatalogueDataByChaincodeKeySuccess: action.payload }
        }
        case "CREATE_CAT_DATA_BY_CHAINCODE_KEY_FAILED": {
            return { ...state, createCatalogueDataByChaincodeKeyError: action.payload }
        }
        case "GET_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS": {
            return { ...state, getCatalogueDataByChaincodeKeySuccess: action.payload }
        }
        case "GET_CAT_DATA_BY_CHAINCODE_KEY_FAILED": {
            return { ...state, getCatalogueDataByChaincodeKeyError: action.payload }
        }
        case "UPDATE_CAT_DATA_BY_CHAINCODE_KEY_SUCCESS": {
            return { ...state, updateCatalogueDataByChaincodeKeySuccess: action.payload }
        }
        case "UPDATE_CAT_DATA_BY_CHAINCODE_KEY_FAILED": {
            return { ...state, updateCatalogueDataByChaincodeKeyError: action.payload }
        }
        default:
            return state;
    }
}
export function sarReducer(state = { items: [], errors: [] }, action) {
    switch (action.type) {
        case "LOADING_SAR_VIEW": {
            return state = { ...state, loadingSARView: action.payload }
        }
        case "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS": {
            return state = { ...state, createShippingDataByShipmentIDSuccess: action.payload }
        }
        case "CREATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED": {
            return state = { ...state, createShippingDataByShipmentIDFail: action.payload }
        }
        case "GET_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS": {
            return state = { ...state, getShippingDataByShipmentIDSuccess: action.payload }
        }
        case "GET_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED": {
            return state = { ...state, getShippingDataByShipmentIDFail: action.payload }
        }
        case "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS": {
            return state = { ...state, updateShippingDataByShipmentIDSuccess: action.payload }
        }
        case "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED": {
            return state = { ...state, updateShippingDataByShipmentIDFail: action.payload }
        }
        case "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, createShippingDataByMaterialIDSuccess: action.payload }
        }
        case "CREATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, createShippingDataByMaterialIDFail: action.payload }
        }
        case "GET_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, getShippingDataByMaterialIDSuccess: action.payload }
        }
        case "GET_SHIPPING_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, getShippingDataByMaterialIDFail: action.payload }
        }
        case "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, updateShippingDataByMaterialIDSuccess: action.payload }
        }
        case "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, updateShippingDataByMaterialIDFail: action.payload }
        }
        case "GET_SAR_DATA_LIST_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, items: [...state.items, action.payload] }
        }
        case "GET_SAR_DATA_LIST_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, errors: [...state.errors, action.payload] }
        }
        case "UPDATE_SAR_DATA_LIST_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, getAndUpdateSARListByMaterialIDSuccess: action.payload }
        }
        case "UPDATE_SAR_DATA_LIST_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, errors: [...state.errors, action.payload] }
        }
        case "CHECKED_SAR_DATA_BY_MATERIAL_ID_DOES_EXIST": {
            return state = { ...state, checkedSARDataByMaterialIDDoesExist: action.payload }
        }
        case "CHECKED_SAR_DATA_BY_MATERIAL_ID_DOES_NOT_EXIST": {
            return state = { ...state, checkedSARDataByMaterialIDDoesNotExist: action.payload }
        }
        case "SYNC_SAR_DATA_AND_BIND_KEYS_SUCCESS": {
            return state = { ...state, syncSARDataAndBindKeysSuccess: action.payload }
        }
        default:
            return state;
    }
}
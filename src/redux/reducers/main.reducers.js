export function authReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_VIEW": {
            return state = { ...state, loadView: action.payload }
        }
        case "ACCESS_GRANTED": {
            return state = { ...state, accessGranted: action.payload }
        }
        case "ACCESS_REQUEST_FAILED": {
            return state = { ...state, requestedDataFailed: action.payload }
        }
        default:
            return state;
    }
}

export function sarReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_SAR_VIEW": {
            return state = { ...state, loadView: action.payload }
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
            return state = { ...state, getShippingDataByMaterialIDSucess: action.payload }
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
        default:
            return state;
    }
}

export function bomReducer(state = { items: [] }, action) {
    switch (action.type) {
        case "LOADING_VIEW": {
            return state = { ...state, loadView: action.payload }
        }
        case "CREATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, success: action.payload }
        }
        case "CREATE_BOM_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, error: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, items: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, error: action.payload }
        }
        default:
            return state;
    }
}
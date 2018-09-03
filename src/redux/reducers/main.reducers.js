export function checkAuthReducer(state = {}, action) {
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

export function updateShippingDataReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_SAR_VIEW": {
            return state = {...state, loadView: action.payload}
        }
        case "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = {...state, updateShippingDataByMaterialIDSuccess: action.payload}
        }
        case "UPDATE_SHIPPING_DATA_BY_MATERIAL_ID_FAILED": {
            return state = {...state, updateShippingDataByMaterialIDFail: action.payload}
        }
        case "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_SUCCESS": {
            return state = {...state, updateShippingDataByShipmentIDSuccess: action.payload}
        }
        case "UPDATE_SHIPPING_DATA_BY_SHIPMENT_ID_FAILED": {
            return state = {...state, updateShippingDataByShipmentIDFail: action.payload}
        }
        default:
            return state;
    }
}


export function requestSucceededReducer(state = {}, action) {
    switch (action.type) {
        case "REQUESTED_DATA_SUCCESSFULLY": {
            return state = { ...state, address1: action.payload.address1 }
        }
        default:
            return state;
    }
}

export function loadingViewReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_VIEW": {
            return state = { ...state, loadView: action.payload }
        }
        default:
            return state;
    }
}

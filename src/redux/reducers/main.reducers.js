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

export function spawnConstructReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_CONSTRUCT": {
            return state = { ...state, loadingConstruct: action.payload }
        }
        case "GET_PRD_DATA_FOR_CONSTRUCT_SUCCESS": {
            return state = { ...state, construct: action.payload }
        }
        case "GET_PRD_DATA_FOR_CONSTRUCT_FAILED": {
            return state = { ...state, constructError: action.payload }
        }
        case "GET_SHIPPING_DATA_FOR_CONSTRUCT_SUCCESS": {
            return state = { ...state, readyToSpawn: action.payload }
        }
        case "GET_SHIPPING_DATA_FOR_CONSTRUCT_FAILED": {
            return state = { ...state, failedToSpawn: action.payload }
        }
        default:
            return state;
    }
}
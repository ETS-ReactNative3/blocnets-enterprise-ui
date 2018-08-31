export function checkAuthReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_VIEW": {
            state = { ...state, loadView: action.payload }
            break;
        }
        case "ACCESS_GRANTED": {
            state = { ...state, accessGranted: action.payload }
            break;
        }
        case "ACCESS_REQUEST_FAILED": {
            state = { ...state, requestedDataFailed: action.payload }
            break;
        }
    }
    return state
}

export function requestSucceededReducer(state = {}, action) {
    switch (action.type) {
        case "REQUESTED_DATA_SUCCESSFULLY": {
            state = { ...state, address1: action.payload.address1 }
            break;
        }
        default:
            return state;
    }
}

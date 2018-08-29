export function authenticate(state = false, action) {
    switch (action.type) {
        case 'ACCESS_GRANTED':
            return action.token;
        default:
            return state;
    }
}

export function loadingView(state = false, action) {
    switch (action.type) {
        case 'VIEW_IS_LOADING':
            return action.loadingView
        default:
            return state;
    }
}

export function getData(state = [], action) {
    switch (action.type) {
        case 'REQUESTED_DATA_SUCCESSFULLY':
            return action.getData;
        default:
            return state;
    }
}

export function requestFailed(state = false, action) {
    switch (action.type) {
        case 'REQUESTED_DATA_FAILED':
            return action.requestFailed;
        default:
            return state;
    }
}


export default (state = {}, action) => {
    return state;
};
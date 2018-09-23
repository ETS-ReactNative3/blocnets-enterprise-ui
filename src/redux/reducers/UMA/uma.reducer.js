export function umaReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_UMA_VIEW": {
            return state = { ...state, loadingUMAView: action.payload }
        }
        case "CREATE_UMA_DATA_BY_USER_ID_SUCCESS": {
            return state = { ...state, createUserMessageDataByUserIDSuccess: action.payload }
        }
        case "CREATE_UMA_DATA_BY_USER_ID_FAILED": {
            return state = { ...state, createUserMessageDataByUserIDError: action.payload }
        }
        case "GET_UMA_DATA_BY_USER_ID_SUCCESS": {
            return state = { ...state, getUserMessageDataByUserIDSuccess: action.payload }
        }
        case "GET_UMA_DATA_BY_USER_ID_FAILED": {
            return state = { ...state, getUserMessageDataByUserIDError: action.payload }
        }
        case "UPDATE_UMA_DATA_BY_USER_ID_SUCCESS": {
            return state = { ...state, updateUserMessageDataByUserIDSuccess: action.payload }
        }
        case "GET_EACH_MESSAGE_FOR_USER_ID_SUCCESS": {
            return state = { ...state, getEachMessageForUserIDSuccess: action.payload }
        }
        case "GET_EACH_MESSAGE_FOR_USER_ID_FAILED": {
            return state = { ...state, getEachMessageForUserIDError: action.payload }
        }
        default:
            return state;
    }
}
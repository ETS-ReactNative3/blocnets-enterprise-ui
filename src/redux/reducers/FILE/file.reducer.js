export function fileReducer(state = {}, action) {
    switch (action.type) {
        case "UPLOAD_NEW_FILE_BY_USER_ID_SUCCESS": {
            return { ...state, uploadFileByUserIdSuccess: action.payload }
        }
        case "UPLOAD_NEW_FILE_BY_USER_ID_FAILED": {
            return { ...state, uploadFileByUserIdError: action.payload }
        }
        case "RETRIEVE_FILE_BY_KEY_SUCCESS": {
            return { ...state, retrieveFileByKeySuccess: action.payload }
        }
        case "RETRIEVE_FILE_BY_KEY_FAILED": {
            return { ...state, retrieveFileByKeyError: action.payload }
        }
        default:
            return state;
    }
}
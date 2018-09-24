export function fileReducer(state = {}, action) {
    switch (action.type) {
        case "UPLOAD_NEW_FILE_BY_USER_ID_SUCCESS": {
            return { ...state, uploadFileByUserIdSuccess: action.payload }
        }
        case "UPLOAD_NEW_FiLE_BY_USER_ID_FAILED":{
            return { ...state, uploadFileByUserIdError: action.payload }
        }
        default:
            return state;
    }
}
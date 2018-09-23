export function dreReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_DRE_VIEW": {
            return state = { ...state, loadingDREView: action.payload }
        }
        case "CREATE_DRE_DATA_BY_UNIQUE_ID_SUCCESS": {
            return state = { ...state, createDocumentEntryByUniqueIDSuccess: action.payload }
        }
        case "CREATE_DRE_DATA_BY_UNIQUE_ID_FAILED": {
            return state = { ...state, createDocumentEntryByUniqueIDError: action.payload }
        }
        case "GET_DRE_DATA_BY_UNIQUE_ID_SUCCESS": {
            return state = { ...state, getDocumentEntryByUniqueIDSuccess: action.payload }
        }
        case "GET_DRE_DATA_BY_UNIQUE_ID_FAILED": {
            return state = { ...state, getDocumentEntryByUniqueIDError: action.payload }
        }
        case "UPDATE_DRE_DATA_BY_UNIQUE_ID_SUCCESS": {
            return state = { ...state, updateDocumentEntryByUniqueIDSuccess: action.payload }
        }
        case "UPDATE_DRE_DATA_BY_UNIQUE_ID_FAILED": {
            return state = { ...state, updateDocumentEntryByUniqueIDError: action.payload }
        }
        default:
            return state;
    }
}
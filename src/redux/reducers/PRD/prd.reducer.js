export function prdReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_PRD_VIEW": {
            return state = { ...state, loadingPRDView: action.payload }
        }
        case "CREATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS": {
            return state = { ...state, createProductionOrderByProdOrderNoSuccess: action.payload }
        }
        case "CREATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED": {
            return state = { ...state, createProductionOrderByProdOrderNoError: action.payload }
        }
        case "GET_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS": {
            return state = { ...state, getProductionOrderByProdOrderNoSuccess: action.payload }
        }
        case "GET_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED": {
            return state = { ...state, getProductionOrderByProdOrderNoError: action.payload }
        }
        case "UPDATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_SUCCESS": {
            return state = { ...state, updateProductionOrderByProdOrderNoSuccess: action.payload }
        }
        case "UPDATE_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_FAILED": {
            return state = { ...state, updateProductionOrderByProdOrderNoError: action.payload }
        }
        // checked prd data by production order no
        case "CHECKED_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_DOES_EXIST": {
            return state = {...state, checkedPRDDataByProductionOrderNoDoesExist: action.payload}
        }
        case "CHECKED_PRD_DATA_BY_PRODUCTION_ORDER_NUMBER_DOES_NOT_EXIST": {
            return state = { ...state, checkedPRDDataByProductionOrderNoDoesNotExist: action.payload }
        }
        default:
            return state;
    }
}
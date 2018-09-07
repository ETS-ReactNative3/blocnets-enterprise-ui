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

export function bomReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_BOM_VIEW": {
            return state = { ...state, loadingBOMView: action.payload }
        }
        case "CREATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, createBillOfMaterialsByMaterialIDSuccess: action.payload }
        }
        case "CREATE_BOM_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, createBillOfMaterialsByMaterialIDError: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, getBillOfMaterialsByMaterialIDSuccess: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, getBillOfMaterialsByMaterialIDError: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, updateBillOfMaterialsByMaterialIDSuccess: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, updateBillOfMaterialsByMaterialIDError: action.payload }
        }
        case "CREATE_BOM_DATA_MATERIAL_NAME_SUCCESS": {
            return state = { ...state, createBillOfMaterialsByMaterialNameSuccess: action.payload }
        }
        case "CREATE_BOM_DATA_MATERIAL_NAME_FAILED": {
            return state = { ...state, createBillOfMaterialsByMaterialNameError: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_NAME_SUCCESS": {
            return state = { ...state, getBillOfMaterialsByMaterialNameSuccess: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_NAME_FAILED": {
            return state = { ...state, getBillOfMaterialsByMaterialNameError: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_MATERIAL_NAME_SUCCESS": {
            return state = { ...state, updateBillOfMaterialsByMaterialNameSuccess: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_MATERIAL_NAME_FAILED": {
            return state = { ...state, updateBillOfMaterialsByMaterialNameError: action.payload }
        }
        case "CREATE_BOM_DATA_BY_MATERIAL_DESC_SUCCESS": {
            return state = { ...state, createBillOfMaterialsByMaterialDescSuccess: action.payload }
        }
        case "CREATE_BOM_DATA_BY_MATERIAL_DESC_FAILED": {
            return state = { ...state, createBillOfMaterialsByMaterialDescError: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_DESC_SUCCESS": {
            return state = { ...state, getBillOfMaterialsByMaterialDescSuccess: action.payload }
        }
        case "GET_BOM_DATA_BY_MATERIAL_DESC_FAILED": {
            return state = { ...state, getBillOfMaterialsByMaterialDescError: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_MATERIAL_DESC_SUCCESS": {
            return state = { ...state, updateBillOfMaterialsByMaterialDescSuccess: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_MATERIAL_DESC_FAILED": {
            return state = { ...state, updateBillOfMaterialsByMaterialDescError: action.payload }
        }
        case "CREATE_BOM_DATA_BY_PART_NUMBER_SUCCESS": {
            return state = { ...state, createBillOfMaterialsByPartNumberSuccess: action.payload }
        }
        case "CREATE_BOM_DATA_BY_PART_NUMBER_FAILED": {
            return state = { ...state, createBillOfMaterialsByPartNumberError: action.payload }
        }
        case "GET_BOM_DATA_BY_PART_NUMBER_SUCCESS": {
            return state = { ...state, getBillOfMaterialsByPartNumberSuccess: action.payload }
        }
        case "GET_BOM_DATA_BY_PART_NUMBER_FAILED": {
            return state = { ...state, getBillOfMaterialsByPartNumberError: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_PART_NUMBER_SUCCESS": {
            return state = { ...state, updateBillOfMaterialsByPartNumberSuccess: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_PART_NUMBER_FAILED": {
            return state = { ...state, updateBillOfMaterialsByPartNumberError: action.payload }
        }
        case "CREATE_BOM_DATA_BY_PART_NAME_SUCCESS": {
            return state = { ...state, createBillOfMaterialsByPartNameSuccess: action.payload }
        }
        case "CREATE_BOM_DATA_BY_PART_NAME_FAILED": {
            return state = { ...state, createBillOfMaterialsByPartNameError: action.payload }
        }
        case "GET_BOM_DATA_BY_PART_NAME_SUCCESS": {
            return state = { ...state, getBillOfMaterialsByPartNameSuccess: action.payload }
        }
        case "GET_BOM_DATA_BY_PART_NAME_FAILED": {
            return state = { ...state, getBillOfMaterialsByPartNameError: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_PART_NAME_SUCCESS": {
            return state = { ...state, updateBillOfMaterialsByPartNameSuccess: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_PART_NAME_FAILED": {
            return state = { ...state, updateBillOfMaterialsByPartNameError: action.payload }
        }
        case "CREATE_BOM_DATA_BY_PART_DESC_SUCCESS": {
            return state = { ...state, createBillOfMaterialsByPartDescSuccess: action.payload }
        }
        case "CREATE_BOM_DATA_BY_PART_DESC_FAILED": {
            return state = { ...state, createBillOfMaterialsByPartDescError: action.payload }
        }
        case "GET_BOM_DATA_BY_PART_DESC_SUCCESS": {
            return state = { ...state, getBillOfMaterialsByPartDescSuccess: action.payload }
        }
        case "GET_BOM_DATA_BY_PART_DESC_FAILED": {
            return state = { ...state, getBillOfMaterialsByPartDescError: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_PART_DESC_SUCCESS": {
            return state = { ...state, updateBillOfMaterialsByPartDescSuccess: action.payload }
        }
        case "UPDATE_BOM_DATA_BY_PART_DESC_FAILED": {
            return state = { ...state, updateBillOfMaterialsByPartDescError: action.payload }
        }
        default:
            return state;
    }
}

export function sarReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_SAR_VIEW": {
            return state = { ...state, loadingSARView: action.payload }
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
            return state = { ...state, getShippingDataByMaterialIDSuccess: action.payload }
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
        default:
            return state;
    }
}

export function dreReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_DRE_VIEW": {
            return state = { ...state, loadingDREView: action.payload }
        }
        case "CREATE_DRE_DATA_BY_USER_ID_SUCCESS": {
            return state = { ...state, createDocumentEntryByUserIDSuccess: action.payload }
        }
        case "CREATE_DRE_DATA_BY_USER_ID_FAILED": {
            return state = { ...state, createDocumentEntryByUserIDError: action.payload }
        }
        case "GET_DRE_DATA_BY_USER_ID_SUCCESS": {
            return state = { ...state, getDocumentEntryByUserIDSuccess: action.payload }
        }
        case "GET_DRE_DATA_BY_USER_ID_FAILED": {
            return state = { ...state, getDocumentEntryByUserIDError: action.payload }
        }
        case "UPDATE_DRE_DATA_BY_USER_ID_SUCCESS": {
            return state = { ...state, updateDocumentEntryByUserIDSuccess: action.payload }
        }
        case "UPDATE_DRE_DATA_BY_USER_ID_FAILED": {
            return state = { ...state, updateDocumentEntryByUserIDError: action.payload }
        }
        default:
            return state;
    }
}
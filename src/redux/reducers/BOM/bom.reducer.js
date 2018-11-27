export function bomReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_BOM_VIEW": {
            return state = { ...state, loadingBOMView: action.payload }
        }
        // check whether material id exists or not
        case "CHECKED_BOM_DATA_BY_MATERIAL_ID_DOES_EXIST": {
            return state = { ...state, checkedBOMDataByMaterialIDDoesExist: action.payload }
        }
        case "CHECKED_BOM_DATA_BY_MATERIAL_ID_DOES_NOT_EXIST": {
            return state = { ...state, checkedBOMDataByMaterialIDDoesNotExist: action.payload }
        }
        // check whether material name exists or not
        case "CHECKED_BOM_DATA_BY_MATERIAL_NAME_DOES_EXIST": {
            return state = { ...state, checkedBOMDataByMaterialNameDoesExist: action.payload }
        }
        case "CHECKED_BOM_DATA_BY_MATERIAL_NAME_DOES_NOT_EXIST": {
            return state = { ...state, checkedBOMDataByMaterialNameDoesNotExist: action.payload }
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
        case "GET_BOM_DATA_HISTORY_BY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, getBillOfMaterialsHistoryByMaterialIDSuccess: action.payload }
        }
        case "GET_BOM_DATA_HISTORY_BY_MATERIAL_ID_FAILED": {
            return state = { ...state, getBillOfMaterialsHistoryByMaterialIDError: action.payload }
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
        case "CREATE_MASTER_DATA_KEYS_SUCCESS": {
            return state = { ...state, createMasterDataKeysSuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_MATERIAL_ID_SUCCESS": {
            return state = { ...state, createMasterDataMaterialIdKeySuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_MATERIAL_ID_FAILED": {
            return state = { ...state, createMasterDataMaterialIdKeyError: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_MATERIAL_NAME_SUCCESS": {
            return state = { ...state, createMasterDataMaterialNameKeySuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_MATERIAL_NAME_FAILED": {
            return state = { ...state, createMasterDataMaterialNameKeyError: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_MATERIAL_DESC_SUCCESS": {
            return state = { ...state, createMasterDataMaterialDescKeySuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_MATERIAL_DESC_FAILED": {
            return state = { ...state, createMasterDataMaterialDescKeyError: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_PART_NO_SUCCESS": {
            return state = { ...state, createMasterDataPartNoSuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_PART_NO_FAILED": {
            return state = { ...state, createMasterDataPartNoError: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_PART_NAME_SUCCESS": {
            return state = { ...state, createMasterDataPartNameSuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_PART_NAME_FAILED": {
            return state = { ...state, createMasterDataPartNameError: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_PART_DESC_SUCCESS": {
            return state = { ...state, createMasterDataPartDescSuccess: action.payload }
        }
        case "CREATE_MASTER_DATA_KEY_PART_DESC_FAILED": {
            return state = { ...state, createMasterDataPartDescError: action.payload }
        }
        default:
            return state;
    }
}
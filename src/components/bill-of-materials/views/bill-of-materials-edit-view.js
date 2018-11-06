import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Divider from '@material-ui/core/Divider/Divider';
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import Input from '@material-ui/core/Input/Input';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListAlt from '@material-ui/icons/ListAlt';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Countries from '../countries';
import USStates from '../us_states';
import BillOfMaterialsReview from './bill-of-materials.review.view';

function createCountryMenuItems() {
    let countryMenuItems = [];
    for (let i = 0; i < Countries.length; i++) {
        countryMenuItems.push(Countries[i].label);
    }
    return countryMenuItems;
}

function createUSStatesMenuItems() {
    let usMenuItems = [];
    for (let i = 0; i < USStates.length; i++) {
        usMenuItems.push(USStates[i].name);
    }
    return usMenuItems;
}

function createOutboundList(outbound) {
    let outboundList = [];
    if (outbound.length > 1) {
        return outbound.slice(1, outbound.length);
    } else {
        return outboundList;
    }
}

function createInboundList(inbound) {
    let inboundList = [];
    if (inbound.length > 1) {
        return inbound.slice(1, inbound.length);
    } else {
        return inboundList;
    }
}

class BillOfMaterialsEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMasterMaterialData: true,
            countryMenuItems: createCountryMenuItems(),
            usStatesMenuItems: createUSStatesMenuItems(),
            materialID: this.props.masterMaterialData.material.materialID ? this.props.masterMaterialData.material.materialID : '',
            errorTextMaterialID: this.props.masterMaterialData.material.materialID ? '' : 'This is a required field.',
            materialName: this.props.masterMaterialData.material.materialName ? this.props.masterMaterialData.material.materialName : '',
            errorTextMaterialName: this.props.masterMaterialData.material.materialName ? '' : 'This is a required field.',
            materialDescription: this.props.masterMaterialData.material.materialDescription ? this.props.masterMaterialData.material.materialDescription : '',
            partNo: this.props.masterMaterialData.material.partNo ? this.props.masterMaterialData.material.partNo : '',
            partName: this.props.masterMaterialData.material.partName ? this.props.masterMaterialData.material.partName : '',
            partDescription: this.props.masterMaterialData.material.partDescription ? this.props.masterMaterialData.material.partDescription : '',
            outboundCompanyName: this.props.masterMaterialData.outbound[0].outboundCompanyName ? this.props.masterMaterialData.outbound[0].outboundCompanyName : '',
            outboundCountry: this.props.masterMaterialData.outbound[0].outboundCountry ? this.props.masterMaterialData.outbound[0].outboundCountry : '',
            errorTextOutboundCountry: this.props.masterMaterialData.outbound[0].outboundCountry ? '' : 'This is a required field.',
            outboundAddressLine1: this.props.masterMaterialData.outbound[0].outboundAddressLine1 ? this.props.masterMaterialData.outbound[0].outboundAddressLine1 : '',
            errorTextOutboundAddressLine1: this.props.masterMaterialData.outbound[0].outboundAddressLine1 ? '' : 'This is a required field.',
            outboundAddressLine2: this.props.masterMaterialData.outbound[0].outboundAddressLine2 ? this.props.masterMaterialData.outbound[0].outboundAddressLine2 : '',
            outboundCity: this.props.masterMaterialData.outbound[0].outboundCity ? this.props.masterMaterialData.outbound[0].outboundCity : '',
            errorTextOutboundCity: this.props.masterMaterialData.outbound[0].outboundCity ? '' : 'This is a required field.',
            outboundStateProvince: this.props.masterMaterialData.outbound[0].outboundStateProvince ? this.props.masterMaterialData.outbound[0].outboundStateProvince : '',
            errorTextOutboundStateProvince: this.props.masterMaterialData.outbound[0].outboundStateProvince ? '' : 'This is a required field.',
            outboundPostalCode: this.props.masterMaterialData.outbound[0].outboundPostalCode ? this.props.masterMaterialData.outbound[0].outboundPostalCode : '',
            errorTextOutboundPostalCode: this.props.masterMaterialData.outbound[0].outboundPostalCode ? '' : 'This is a required field.',
            outboundIPAddress: this.props.masterMaterialData.outbound[0].outboundIPAddress ? this.props.masterMaterialData.outbound[0].outboundIPAddress : '',
            outboundList: createOutboundList(this.props.masterMaterialData.outbound),
            volume: this.props.masterMaterialData.materialValidationCharacteristics.materialVolume ? this.props.masterMaterialData.materialValidationCharacteristics.materialVolume : '',
            weight: this.props.masterMaterialData.materialValidationCharacteristics.materialWeight ? this.props.masterMaterialData.materialValidationCharacteristics.materialWeight : '',
            materialLength: this.props.masterMaterialData.materialValidationCharacteristics.materialLength ? this.props.masterMaterialData.materialValidationCharacteristics.materialLength : '',
            width: this.props.masterMaterialData.materialValidationCharacteristics.materialWidth ? this.props.masterMaterialData.materialValidationCharacteristics.materialWidth : '',
            height: this.props.masterMaterialData.materialValidationCharacteristics.materialHeight ? this.props.masterMaterialData.materialValidationCharacteristics.materialHeight : '',
            temperatureLimits: this.props.masterMaterialData.materialValidationCharacteristics.materialTempLimits ? this.props.masterMaterialData.materialValidationCharacteristics.materialTempLimits : '',
            shockVibration: this.props.masterMaterialData.materialValidationCharacteristics.materialVibrationLimits ? this.props.masterMaterialData.materialValidationCharacteristics.materialVibrationLimits : '',
            altitudeRestrictions: this.props.masterMaterialData.materialValidationCharacteristics.materialAltitudeRestrictions ? this.props.masterMaterialData.materialValidationCharacteristics.materialAltitudeRestrictions : '',
            compressionRestrictions: this.props.masterMaterialData.materialValidationCharacteristics.materialCompressionRestrictions ? this.props.masterMaterialData.materialValidationCharacteristics.materialCompressionRestrictions : '',
            alwaysUpright: this.props.masterMaterialData.materialValidationCharacteristics.materialAlwaysUpRight ? this.props.masterMaterialData.materialValidationCharacteristics.materialAlwaysUpRight : false,
            alwaysUpright2: this.props.masterMaterialData.materialValidationCharacteristics.materialAlwaysUpRight === true ? 'YES' : 'NO',
            metallic: this.props.masterMaterialData.materialValidationCharacteristics.materialOther.metallic ? this.props.masterMaterialData.materialValidationCharacteristics.materialOther.metallic : false,
            metallic2: this.props.masterMaterialData.materialValidationCharacteristics.materialOther.metallic === true ? 'YES' : 'NO',
            hazmat: this.props.masterMaterialData.materialValidationCharacteristics.materialOther.hazmat ? this.props.masterMaterialData.materialValidationCharacteristics.materialOther.hazmat : false,
            hazmat2: this.props.masterMaterialData.materialValidationCharacteristics.materialOther.hazmat === true ? 'YES' : 'NO',
            magnetic: this.props.masterMaterialData.materialValidationCharacteristics.materialOther.magnetic ? this.props.masterMaterialData.materialValidationCharacteristics.materialOther.magnetic : false,
            magnetic2: this.props.masterMaterialData.materialValidationCharacteristics.materialOther.magnetic === true ? 'YES' : 'NO',
            lengthTolerance: this.props.masterMaterialData.materialValidationCharacteristics.materialLengthTolerance ? this.props.masterMaterialData.materialValidationCharacteristics.materialLengthTolerance : '',
            roundTolerance: this.props.masterMaterialData.materialValidationCharacteristics.materialRoundTolerance ? this.props.masterMaterialData.materialValidationCharacteristics.materialRoundTolerance : '',
            nonSkidTolerance: this.props.masterMaterialData.materialValidationCharacteristics.materialNonSkidTolerance ? this.props.masterMaterialData.materialValidationCharacteristics.materialNonSkidTolerance : '',
            minEOQuantities: this.props.masterMaterialData.supplierOrderQuantitiesControls.minimumEconomicOrderQuantity ? this.props.masterMaterialData.supplierOrderQuantitiesControls.minimumEconomicOrderQuantity : '',
            maxEOQuantities: this.props.masterMaterialData.supplierOrderQuantitiesControls.maximumEconomicOrderQuantity ? this.props.masterMaterialData.supplierOrderQuantitiesControls.maximumEconomicOrderQuantity : '',
            maxEPWithdrawRate: this.props.masterMaterialData.supplierOrderQuantitiesControls.maximumEconomicProductWithdrawRate ? this.props.masterMaterialData.supplierOrderQuantitiesControls.maximumEconomicProductWithdrawRate : '',
            minOrderLeadTimes: this.props.masterMaterialData.supplierOrderQuantitiesControls.minimumOrderLeadTime ? this.props.masterMaterialData.supplierOrderQuantitiesControls.minimumOrderLeadTime : '',
            inboundCountry: this.props.masterMaterialData.inbound[0].inboundCountry ? this.props.masterMaterialData.inbound[0].inboundCountry : '',
            inboundAddressLine1: this.props.masterMaterialData.inbound[0].inboundAddressLine1 ? this.props.masterMaterialData.inbound[0].inboundAddressLine1 : '',
            inboundAddressLine2: this.props.masterMaterialData.inbound[0].inboundAddressLine2 ? this.props.masterMaterialData.inbound[0].inboundAddressLine2 : '',
            inboundCity: this.props.masterMaterialData.inbound[0].inboundCity ? this.props.masterMaterialData.inbound[0].inboundCity : '',
            inboundStateProvince: this.props.masterMaterialData.inbound[0].inboundStateProvince ? this.props.masterMaterialData.inbound[0].inboundStateProvince : '',
            inboundPostalCode: this.props.masterMaterialData.inbound[0].inboundPostalCode ? this.props.masterMaterialData.inbound[0].inboundPostalCode : '',
            inboundSupplierPaymentTerms: this.props.masterMaterialData.inbound[0].inboundSupplierPaymentTerms ? this.props.masterMaterialData.inbound[0].inboundSupplierPaymentTerms : '',
            inboundMaterialID: this.props.masterMaterialData.inbound[0].inboundMaterialID ? this.props.masterMaterialData.inbound[0].inboundMaterialID : '',
            inboundQuantity: this.props.masterMaterialData.inbound[0].inboundQuantity ? this.props.masterMaterialData.inbound[0].inboundQuantity : '',
            inboundList: createInboundList(this.props.masterMaterialData.inbound),
            showBillOfMaterialsReview: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'materialID' && event.target.value) {
            this.setState({ errorTextMaterialID: '' });
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({ errorTextMaterialID: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'materialName' && event.target.value) {
            this.setState({ errorTextMaterialName: '' });
        } else if ([event.target.name].toString() === 'materialName' && !event.target.value) {
            this.setState({ errorTextMaterialName: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'outboundCountry' && event.target.value) {
            this.setState({
                errorTextOutboundCountry: '',
                outboundStateProvince: '',
                errorTextOutboundStateProvince: 'This is a required field.'
            });
        } else if ([event.target.name].toString() === 'outboundCountry' && !event.target.value) {
            this.setState({
                errorTextOutboundCountry: 'This is a required field.',
                outboundStateProvince: '',
                errorTextOutboundStateProvince: 'This is a required field.'
            });
        }
        if ([event.target.name].toString() === 'outboundAddressLine1' && event.target.value) {
            this.setState({ errorTextOutboundAddressLine1: '' });
        } else if ([event.target.name].toString() === 'outboundAddressLine1' && !event.target.value) {
            this.setState({ errorTextOutboundAddressLine1: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'outboundCity' && event.target.value) {
            this.setState({ errorTextOutboundCity: '' });
        } else if ([event.target.name].toString() === 'outboundCity' && !event.target.value) {
            this.setState({ errorTextOutboundCity: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'outboundStateProvince' && event.target.value) {
            this.setState({ errorTextOutboundStateProvince: '' });
        } else if ([event.target.name].toString() === 'outboundStateProvince' && !event.target.value) {
            this.setState({ errorTextOutboundStateProvince: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'outboundPostalCode' && event.target.value) {
            this.setState({ errorTextOutboundPostalCode: '' });
        } else if ([event.target.name].toString() === 'outboundPostalCode' && !event.target.value) {
            this.setState({ errorTextOutboundPostalCode: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'inboundCountry') {
            this.setState({ inboundStateProvince: '' });
        }
    };

    handleCheckboxChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
        if ([event.target.name].toString() === 'alwaysUpright' && event.target.checked === true) {
            this.setState({
                alwaysUpright: true,
                alwaysUpright2: 'YES'
            });
        } else if ([event.target.name].toString() === 'alwaysUpright' && event.target.checked === false) {
            this.setState({
                alwaysUpright: false,
                alwaysUpright2: 'NO'
            });
        }
        if ([event.target.name].toString() === 'metallic' && event.target.checked === true) {
            this.setState({
                metallic: true,
                metallic2: 'YES'
            });
        } else if ([event.target.name].toString() === 'metallic' && event.target.checked === false) {
            this.setState({
                metallic: false,
                metallic2: 'NO'
            });
        }
        if ([event.target.name].toString() === 'hazmat' && event.target.checked === true) {
            this.setState({
                hazmat: true,
                hazmat2: 'YES'
            });
        } else if ([event.target.name].toString() === 'hazmat' && event.target.checked === false) {
            this.setState({
                hazmat: false,
                hazmat2: 'NO'
            });
        }
        if ([event.target.name].toString() === 'magnetic' && event.target.checked === true) {
            this.setState({
                magnetic: true,
                magnetic2: 'YES'
            });
        } else if ([event.target.name].toString() === 'magnetic' && event.target.checked === false) {
            this.setState({
                magnetic: false,
                magnetic2: 'NO'
            });
        }
    };

    handleAdditionOutbound = (event) => {
        let outboundList = this.state.outboundList;
        let outboundList2 = {
            outboundCompanyName: '',
            outboundCountry: '',
            outboundAddressLine1: '',
            outboundAddressLine2: '',
            outboundCity: '',
            outboundStateProvince: '',
            outboundPostalCode: ''
        };
        let outboundListFinal = outboundList.concat(outboundList2);
        this.setState({ outboundList: outboundListFinal })
    };

    handleDeletionOutbound = (index) => (event) => {
        let outboundList = this.state.outboundList;
        let outboundList2 = outboundList.slice(0, index);
        let outboundList3 = outboundList.slice(index + 1);
        let outboundListFinal = outboundList2.concat(outboundList3);
        this.setState({ outboundList: outboundListFinal })
    };

    handleTextOutbound = (index) => (event) => {
        let outboundList = [...this.state.outboundList];
        if ([event.target.name].toString() === 'outboundCompanyNameList' && event.target.value) {
            outboundList[index].outboundCompanyName = event.target.value;
        } else if ([event.target.name].toString() === 'outboundCompanyNameList' && !event.target.value) {
            outboundList[index].outboundCompanyName = '';
        }
        if ([event.target.name].toString() === 'outboundCountryList' && event.target.value) {
            outboundList[index].outboundCountry = event.target.value;
            outboundList[index].outboundStateProvince = '';
        } else if ([event.target.name].toString() === 'outboundCountryList' && !event.target.value) {
            outboundList[index].outboundCountry = '';
            outboundList[index].outboundStateProvince = '';
        }
        if ([event.target.name].toString() === 'outboundAddressLine1List' && event.target.value) {
            outboundList[index].outboundAddressLine1 = event.target.value;
        } else if ([event.target.name].toString() === 'outboundAddressLine1List' && !event.target.value) {
            outboundList[index].outboundAddressLine1 = '';
        }
        if ([event.target.name].toString() === 'outboundAddressLine2List' && event.target.value) {
            outboundList[index].outboundAddressLine2 = event.target.value;
        } else if ([event.target.name].toString() === 'outboundAddressLine2List' && !event.target.value) {
            outboundList[index].outboundAddressLine2 = '';
        }
        if ([event.target.name].toString() === 'outboundCityList' && event.target.value) {
            outboundList[index].outboundCity = event.target.value;
        } else if ([event.target.name].toString() === 'outboundCityList' && !event.target.value) {
            outboundList[index].outboundCity = '';
        }
        if ([event.target.name].toString() === 'outboundStateProvinceList' && event.target.value) {
            outboundList[index].outboundStateProvince = event.target.value;
        } else if ([event.target.name].toString() === 'outboundStateProvinceList' && !event.target.value) {
            outboundList[index].outboundStateProvince = '';
        }
        if ([event.target.name].toString() === 'outboundPostalCodeList' && event.target.value) {
            outboundList[index].outboundPostalCode = event.target.value;
        } else if ([event.target.name].toString() === 'outboundPostalCodeList' && !event.target.value) {
            outboundList[index].outboundPostalCode = '';
        }
        this.setState({ outboundList: outboundList });
    };

    handleAdditionInbound = (event) => {
        let inboundList = this.state.inboundList;
        let inboundList2 = {
            inboundCountry: '',
            inboundAddressLine1: '',
            inboundAddressLine2: '',
            inboundCity: '',
            inboundStateProvince: '',
            inboundPostalCode: '',
            inboundSupplierPaymentTerms: '',
            inboundMaterialID: '',
            inboundQuantity: ''
        };
        let inboundListFinal = inboundList.concat(inboundList2);
        this.setState({ inboundList: inboundListFinal })
    };

    handleDeletionInbound = (index) => (event) => {
        let inboundList = this.state.inboundList;
        let inboundList2 = inboundList.slice(0, index);
        let inboundList3 = inboundList.slice(index + 1);
        let inboundListFinal = inboundList2.concat(inboundList3);
        this.setState({ inboundList: inboundListFinal })
    };

    handleTextInbound = (index) => (event) => {
        let inboundList = [...this.state.inboundList];
        if ([event.target.name].toString() === 'inboundCountryList' && event.target.value) {
            inboundList[index].inboundCountry = event.target.value;
            inboundList[index].inboundStateProvince = '';
        } else if ([event.target.name].toString() === 'inboundCountryList' && !event.target.value) {
            inboundList[index].inboundCountry = '';
            inboundList[index].inboundStateProvince = '';
        }
        if ([event.target.name].toString() === 'inboundAddressLine1List' && event.target.value) {
            inboundList[index].inboundAddressLine1 = event.target.value;
        } else if ([event.target.name].toString() === 'inboundAddressLine1List' && !event.target.value) {
            inboundList[index].inboundAddressLine1 = '';
        }
        if ([event.target.name].toString() === 'inboundAddressLine2List' && event.target.value) {
            inboundList[index].inboundAddressLine2 = event.target.value;
        } else if ([event.target.name].toString() === 'inboundAddressLine2List' && !event.target.value) {
            inboundList[index].inboundAddressLine2 = '';
        }
        if ([event.target.name].toString() === 'inboundCityList' && event.target.value) {
            inboundList[index].inboundCity = event.target.value;
        } else if ([event.target.name].toString() === 'inboundCityList' && !event.target.value) {
            inboundList[index].inboundCity = '';
        }
        if ([event.target.name].toString() === 'inboundStateProvinceList' && event.target.value) {
            inboundList[index].inboundStateProvince = event.target.value;
        } else if ([event.target.name].toString() === 'inboundStateProvinceList' && !event.target.value) {
            inboundList[index].inboundStateProvince = '';
        }
        if ([event.target.name].toString() === 'inboundPostalCodeList' && event.target.value) {
            inboundList[index].inboundPostalCode = event.target.value;
        } else if ([event.target.name].toString() === 'inboundPostalCodeList' && !event.target.value) {
            inboundList[index].inboundPostalCode = '';
        }
        if ([event.target.name].toString() === 'inboundSupplierPaymentTermsList' && event.target.value) {
            inboundList[index].inboundSupplierPaymentTerms = event.target.value;
        } else if ([event.target.name].toString() === 'inboundSupplierPaymentTermsList' && !event.target.value) {
            inboundList[index].inboundSupplierPaymentTerms = '';
        }
        if ([event.target.name].toString() === 'inboundMaterialIDList' && event.target.value) {
            inboundList[index].inboundMaterialID = event.target.value;
        } else if ([event.target.name].toString() === 'inboundMaterialIDList' && !event.target.value) {
            inboundList[index].inboundMaterialID = '';
        }
        if ([event.target.name].toString() === 'inboundQuantityList' && event.target.value) {
            inboundList[index].inboundQuantity = event.target.value;
        } else if ([event.target.name].toString() === 'inboundQuantityList' && !event.target.value) {
            inboundList[index].inboundQuantity = '';
        }
        this.setState({ inboundList: inboundList });
    };

    handleEditMasterData = () => {
        this.setState({ showBillOfMaterialsReview: true });
    };

    handleBillOfMaterialsReview = (id, snackbar) => {
        if (id === 'submit') {
            this.setState({ showBillOfMaterialsReview: true });
        } else {
            this.setState({ showBillOfMaterialsReview: false });
        }
        if (snackbar) {
            this.setState({
                snackbar: {
                    autoHideDuration: snackbar.autoHideDuration,
                    message: snackbar.message,
                    open: snackbar.open,
                    sbColor: snackbar.sbColor
                }
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        });
    };

    handleSnackbarOnExited = () => {
        if (this.state.showBillOfMaterialsReview === true) {
            this.props.viewHandler();
        }
    };

    render() {

        const formComplete = this.state.materialID && this.state.materialName && this.state.outboundCountry &&
            this.state.outboundAddressLine1 && this.state.outboundCity &&
            this.state.outboundStateProvince && this.state.outboundPostalCode;

        return (

            <div>

                {this.state.showBillOfMaterialsReview === false ?

                    <div className='Module'>
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={3}>
                                <TextField
                                    type='text'
                                    name='materialID'
                                    floatingLabelText='Material ID'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.materialID}
                                    onChange={this.handleChange}
                                    errorText={this.state.errorTextMaterialID}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={3}>
                                <TextField
                                    type='text'
                                    name='materialName'
                                    floatingLabelText='Material Name'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.materialName}
                                    onChange={this.handleChange}
                                    errorText={this.state.errorTextMaterialName}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={3}>
                                <TextField
                                    type='text'
                                    name='materialDescription'
                                    floatingLabelText='Material Description'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.materialDescription}
                                    onChange={this.handleChange}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={3} justify='flex-end'>
                                <Grid>
                                    <input
                                        className='Module-Button-Input'
                                        type='file'
                                    />
                                    <label>
                                        <Button type='submit' value='Upload' variant='contained'
                                                className='Module-Button' disabled={true}>
                                            Upload
                                            <CloudUploadIcon className='Module-Button-Icon' />
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            /* RELEASE-90: Hide Part No., Part Name and Part Description fields.
                            <Grid container spacing={24}>
                                <Grid container item xs={12} sm={3}>
                                    <TextField
                                        type='text'
                                        name='partNo'
                                        floatingLabelText='Part No.'
                                        floatingLabelFixed={true}
                                        className='Module-TextField'
                                        hintText=''
                                        value={this.state.partNo}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid container item xs={12} sm={3}>
                                    <TextField
                                        type='text'
                                        name='partName'
                                        floatingLabelText='Part Name'
                                        floatingLabelFixed={true}
                                        className='Module-TextField'
                                        hintText=''
                                        value={this.state.partName}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid container item xs={12} sm={3}>
                                    <TextField
                                        type='text'
                                        name='partDescription'
                                        floatingLabelText='Part Description'
                                        floatingLabelFixed={true}
                                        className='Module-TextField'
                                        hintText=''
                                        value={this.state.partDescription}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid container item xs={12} sm={3}>
                                </Grid>
                            </Grid>
                            */
                        }
                        <br /><br /><br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormLabel className='Module-FormLabel'>
                                    Outbound Customer Data
                                </FormLabel>
                            </Grid>
                        </Grid>
                        <br />
                        <Divider className='Module-Divider' />
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='outboundCompanyName'
                                    floatingLabelText='Company Name'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.outboundCompanyName}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <IconButton onClick={this.handleAdditionOutbound}>
                                    <AddCircleIcon className='Button-AddCircleIcon' />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel>Country</InputLabel>
                                    <Select value={this.state.outboundCountry} onChange={this.handleChange}
                                            input={<Input name='outboundCountry' className='Mobile-MenuItem' />}
                                            displayEmpty>
                                        {this.state.countryMenuItems.map((menuItem, i) => {
                                            return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                        })}
                                    </Select>
                                    <FormHelperText className='TT-Font-Red'>
                                        {this.state.errorTextOutboundCountry}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='outboundAddressLine1'
                                    floatingLabelText='Address'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.outboundAddressLine1}
                                    onChange={this.handleChange}
                                    errorText={this.state.errorTextOutboundAddressLine1}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='outboundAddressLine2'
                                    floatingLabelText='Address Line 2'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.outboundAddressLine2}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='outboundCity'
                                    floatingLabelText='City'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.outboundCity}
                                    onChange={this.handleChange}
                                    errorText={this.state.errorTextOutboundCity}
                                />
                            </Grid>
                            {this.state.outboundCountry === 'United States' ?
                                <Grid container item xs={6} sm={3}>
                                    <FormControl fullWidth={true}>
                                        <InputLabel>State/Province</InputLabel>
                                        <Select value={this.state.outboundStateProvince} onChange={this.handleChange}
                                                input={<Input name='outboundStateProvince'
                                                              className='Mobile-MenuItem' />}
                                                displayEmpty>
                                            {this.state.usStatesMenuItems.map((menuItem, i) => {
                                                return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                            })}
                                        </Select>
                                        <FormHelperText className='TT-Font-Red'>
                                            {this.state.errorTextOutboundStateProvince}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                :
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type='text'
                                        name='outboundStateProvince'
                                        floatingLabelText='State/Province'
                                        floatingLabelFixed={true}
                                        className='BOM-TextField'
                                        hintText=''
                                        value={this.state.outboundStateProvince}
                                        onChange={this.handleChange}
                                        errorText={this.state.errorTextOutboundStateProvince}
                                    />
                                </Grid>
                            }
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='outboundPostalCode'
                                    floatingLabelText='Postal Code'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.outboundPostalCode}
                                    onChange={this.handleChange}
                                    errorText={this.state.errorTextOutboundPostalCode}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        {this.state.outboundList.map((outboundList, index) => (
                            <span key={index}>
                                <br /><br />
                                <Divider className='Module-Divider' />
                                <br />
                                <Grid container spacing={24}>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='outboundCompanyNameList'
                                            floatingLabelText='Company Name'
                                            floatingLabelFixed={true}
                                            className='Module-TextField'
                                            hintText=''
                                            value={outboundList.outboundCompanyName}
                                            onChange={this.handleTextOutbound(index)}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleDeletionOutbound(index)}>
                                            <DeleteIcon className='Button-DeleteCircleIcon' />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid container item xs={6} sm={3}>
                                        <FormControl fullWidth={true}>
                                            <InputLabel>Country</InputLabel>
                                            <Select value={outboundList.outboundCountry}
                                                    onChange={this.handleTextOutbound(index)}
                                                    input={<Input name='outboundCountryList'
                                                                  className='Mobile-MenuItem' />}
                                                    displayEmpty>
                                                {this.state.countryMenuItems.map((menuItem, i) => {
                                                    return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='outboundAddressLine1List'
                                            floatingLabelText='Address'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={outboundList.outboundAddressLine1}
                                            onChange={this.handleTextOutbound(index)}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='outboundAddressLine2List'
                                            floatingLabelText='Address Line 2'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={outboundList.outboundAddressLine2}
                                            onChange={this.handleTextOutbound(index)}
                                        />
                                    </Grid>
                                </Grid>
                                <br /><br />
                                <Grid container spacing={24}>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='outboundCityList'
                                            floatingLabelText='City'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={outboundList.outboundCity}
                                            onChange={this.handleTextOutbound(index)}
                                        />
                                    </Grid>
                                    {outboundList.outboundCountry === 'United States' ?
                                        <Grid container item xs={6} sm={3}>
                                            <FormControl fullWidth={true}>
                                                <InputLabel>State/Province</InputLabel>
                                                <Select value={outboundList.outboundStateProvince}
                                                        onChange={this.handleTextOutbound(index)}
                                                        input={<Input name='outboundStateProvinceList'
                                                                      className='Mobile-MenuItem' />}
                                                        displayEmpty>
                                                    {this.state.usStatesMenuItems.map((menuItem, i) => {
                                                        return (
                                                            <MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        :
                                        <Grid container item xs={6} sm={3}>
                                            <TextField
                                                type='text'
                                                name='outboundStateProvinceList'
                                                floatingLabelText='State/Province'
                                                floatingLabelFixed={true}
                                                className='BOM-TextField'
                                                hintText=''
                                                value={outboundList.outboundStateProvince}
                                                onChange={this.handleTextOutbound(index)}
                                            />
                                        </Grid>
                                    }
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='outboundPostalCodeList'
                                            floatingLabelText='Postal Code'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={outboundList.outboundPostalCode}
                                            onChange={this.handleTextOutbound(index)}
                                        />
                                    </Grid>
                                </Grid>
                            </span>
                        ))}
                        <br /><br /><br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormLabel className='Module-FormLabel'>
                                    Material Validation Characteristics
                                </FormLabel>
                            </Grid>
                        </Grid>
                        <br />
                        <Divider className='Module-Divider' />
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='volume'
                                    floatingLabelText='Volume'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.volume}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='weight'
                                    floatingLabelText='Weight'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.weight}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='materialLength'
                                    floatingLabelText='Length'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.materialLength}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='width'
                                    floatingLabelText='Width'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.width}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='height'
                                    floatingLabelText='Height'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.height}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='temperatureLimits'
                                    floatingLabelText='Temperature Limits'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.temperatureLimits}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='shockVibration'
                                    floatingLabelText='Shock/Vibration'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.shockVibration}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='altitudeRestrictions'
                                    floatingLabelText='Altitude Restrictions'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.altitudeRestrictions}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='compressionRestrictions'
                                    floatingLabelText='Compression Restrictions'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.compressionRestrictions}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name='alwaysUpright'
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.alwaysUpright}
                                                classes={{
                                                    root: 'Module-Checkbox-Root',
                                                    checked: 'Module-Checkbox-Checked'
                                                }}
                                            />
                                        }
                                        label='Always Upright'
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name='metallic'
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.metallic}
                                                classes={{
                                                    root: 'Module-Checkbox-Root',
                                                    checked: 'Module-Checkbox-Checked'
                                                }}
                                            />
                                        }
                                        label='Metallic'
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name='hazmat'
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.hazmat}
                                                classes={{
                                                    root: 'Module-Checkbox-Root',
                                                    checked: 'Module-Checkbox-Checked'
                                                }}
                                            />
                                        }
                                        label='Hazmat'
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name='magnetic'
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.magnetic}
                                                classes={{
                                                    root: 'Module-Checkbox-Root',
                                                    checked: 'Module-Checkbox-Checked'
                                                }}
                                            />
                                        }
                                        label='Magnetic'
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='lengthTolerance'
                                    floatingLabelText='Length Tolerance'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.lengthTolerance}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='roundTolerance'
                                    floatingLabelText='Round Tolerance'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.roundTolerance}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='nonSkidTolerance'
                                    floatingLabelText='Non-Skid Tolerance'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.nonSkidTolerance}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormLabel className='Module-FormLabel'>
                                    Supplier Order Quantities Controls
                                </FormLabel>
                            </Grid>
                        </Grid>
                        <br />
                        <Divider className='Module-Divider' />
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type='text'
                                    name='minEOQuantities'
                                    floatingLabelText='Minimum Economic Order Quantities'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    fullWidth={true}
                                    value={this.state.minEOQuantities}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type='text'
                                    name='maxEOQuantities'
                                    floatingLabelText='Maximum Economic Order Quantities'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText='' fullWidth={true}
                                    value={this.state.maxEOQuantities}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type='text'
                                    name='maxEPWithdrawRate'
                                    floatingLabelText='Maximum Economic Product Withdraw Rate'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    fullWidth={true}
                                    value={this.state.maxEPWithdrawRate}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type='text'
                                    name='minOrderLeadTimes'
                                    floatingLabelText='Minimum Order Lead Times'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.minOrderLeadTimes}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <br /><br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormLabel className='Module-FormLabel'>
                                    Inbound Supplier(s)
                                </FormLabel>
                            </Grid>
                        </Grid>
                        <br />
                        <Divider className='Module-Divider' />
                        <br /><br />
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel>Country</InputLabel>
                                    <Select value={this.state.inboundCountry} onChange={this.handleChange}
                                            input={<Input name='inboundCountry' className='Mobile-MenuItem' />}
                                            displayEmpty>
                                        {this.state.countryMenuItems.map((menuItem, i) => {
                                            return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='inboundAddressLine1'
                                    floatingLabelText='Address'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.inboundAddressLine1}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='inboundAddressLine2'
                                    floatingLabelText='Address Line 2'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.inboundAddressLine2}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <IconButton onClick={this.handleAdditionInbound}>
                                    <AddCircleIcon className='Button-AddCircleIcon' />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='inboundCity'
                                    floatingLabelText='City'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.inboundCity}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            {this.state.inboundCountry === 'United States' ?
                                <Grid container item xs={6} sm={3}>
                                    <FormControl fullWidth={true}>
                                        <InputLabel>State/Province</InputLabel>
                                        <Select value={this.state.inboundStateProvince} onChange={this.handleChange}
                                                input={<Input name='inboundStateProvince'
                                                              className='Mobile-MenuItem' />}
                                                displayEmpty>
                                            {this.state.usStatesMenuItems.map((menuItem, i) => {
                                                return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                :
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type='text'
                                        name='inboundStateProvince'
                                        floatingLabelText='State/Province'
                                        floatingLabelFixed={true}
                                        className='BOM-TextField'
                                        hintText=''
                                        value={this.state.inboundStateProvince}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                            }
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='inboundPostalCode'
                                    floatingLabelText='Postal Code'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.inboundPostalCode}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='inboundSupplierPaymentTerms'
                                    floatingLabelText='Supplier Payment Terms'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.inboundSupplierPaymentTerms}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='inboundMaterialID'
                                    floatingLabelText='Material ID'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.inboundMaterialID}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='number'
                                    name='inboundQuantity'
                                    floatingLabelText='Quantity'
                                    floatingLabelFixed={true}
                                    className='Module-TextField'
                                    hintText=''
                                    value={this.state.inboundQuantity}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        {this.state.inboundList.map((inboundList, index) => (
                            <span key={index}>
                                <br />
                                <Divider className='Module-Divider' />
                                <br />
                                <Grid container spacing={24}>
                                    <Grid container item xs={6} sm={3}>
                                        <FormControl fullWidth={true}>
                                            <InputLabel>Country</InputLabel>
                                            <Select value={inboundList.inboundCountry}
                                                    onChange={this.handleTextInbound(index)}
                                                    input={<Input name='inboundCountryList'
                                                                  className='Mobile-MenuItem' />}
                                                    displayEmpty>
                                                {this.state.countryMenuItems.map((menuItem, i) => {
                                                    return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='inboundAddressLine1List'
                                            floatingLabelText='Address'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={inboundList.inboundAddressLine1}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='inboundAddressLine2List'
                                            floatingLabelText='Address Line 2'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={inboundList.inboundAddressLine2}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleDeletionInbound(index)}>
                                            <DeleteIcon className='Button-DeleteCircleIcon' />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='inboundCityList'
                                            floatingLabelText='City'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={inboundList.inboundCity}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                    {inboundList.inboundCountry === 'United States' ?
                                        <Grid container item xs={6} sm={3}>
                                            <FormControl fullWidth={true}>
                                                <InputLabel>State/Province</InputLabel>
                                                <Select value={inboundList.inboundStateProvince}
                                                        onChange={this.handleTextInbound(index)}
                                                        input={<Input name='inboundStateProvinceList'
                                                                      className='Mobile-MenuItem' />}
                                                        displayEmpty>
                                                    {this.state.usStatesMenuItems.map((menuItem, i) => {
                                                        return (
                                                            <MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        :
                                        <Grid container item xs={6} sm={3}>
                                            <TextField
                                                type='text'
                                                name='inboundStateProvinceList'
                                                floatingLabelText='State/Province'
                                                floatingLabelFixed={true}
                                                className='BOM-TextField'
                                                hintText=''
                                                value={inboundList.inboundStateProvince}
                                                onChange={this.handleTextInbound(index)}
                                            />
                                        </Grid>
                                    }
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='inboundPostalCodeList'
                                            floatingLabelText='Postal Code'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={inboundList.inboundPostalCode}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='inboundSupplierPaymentTermsList'
                                            floatingLabelText='Supplier Payment Terms'
                                            floatingLabelFixed={true}
                                            className='Module-TextField'
                                            hintText=''
                                            value={inboundList.inboundSupplierPaymentTerms}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='text'
                                            name='inboundMaterialIDList'
                                            floatingLabelText='Material ID'
                                            floatingLabelFixed={true}
                                            className='Module-TextField'
                                            hintText=''
                                            value={inboundList.inboundMaterialID}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                    <Grid container item xs={6} sm={3}>
                                        <TextField
                                            type='number'
                                            name='inboundQuantityList'
                                            floatingLabelText='Quantity'
                                            floatingLabelFixed={true}
                                            className='Module-TextField'
                                            hintText=''
                                            value={inboundList.inboundQuantity}
                                            onChange={this.handleTextInbound(index)}
                                        />
                                    </Grid>
                                </Grid>
                            </span>
                        ))}
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <Button type='submit' value='Submit' variant='contained' className='Module-Button'
                                        fullWidth={true} disabled={!formComplete} onClick={this.handleEditMasterData}>
                                    Edit Master Data
                                    <ListAlt className='Module-Button-Icon' />
                                </Button>
                            </Grid>
                        </Grid>
                    </div>

                    :

                    <div>
                        <BillOfMaterialsReview
                            eBOMData={this.state}
                            snackbar={this.state.snackbar}
                            viewHandler={this.handleBillOfMaterialsReview} />
                    </div>

                }

                <Snackbar open={this.state.snackbar.open} autoHideDuration={this.state.snackbar.autoHideDuration}
                          onClose={this.handleSnackbarClose} onExited={this.handleSnackbarOnExited}>
                    <SnackbarContent
                        message={this.state.snackbar.message}
                        className={this.state.snackbar.sbColor}
                        classes={{ message: 'Module-Snackbar-Message' }}
                    />
                </Snackbar>

            </div>

        );

    }

}

export default BillOfMaterialsEdit;
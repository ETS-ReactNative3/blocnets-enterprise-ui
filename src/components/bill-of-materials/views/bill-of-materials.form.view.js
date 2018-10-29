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

class BillOfMaterialsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countryMenuItems: createCountryMenuItems(),
            usStatesMenuItems: createUSStatesMenuItems(),
            materialID: this.props.eBOMData.materialID ? this.props.eBOMData.materialID : '',
            errorTextMaterialID: this.props.eBOMData.materialID ? '' : 'This is a required field.',
            materialName: this.props.eBOMData.materialName ? this.props.eBOMData.materialName : '',
            errorTextMaterialName: this.props.eBOMData.materialName ? '' : 'This is a required field.',
            materialDescription: this.props.eBOMData.materialDescription ? this.props.eBOMData.materialDescription : '',
            partNo: this.props.eBOMData.partNo ? this.props.eBOMData.partNo : '',
            partName: this.props.eBOMData.partName ? this.props.eBOMData.partName : '',
            partDescription: this.props.eBOMData.partDescription ? this.props.eBOMData.partDescription : '',
            materialCompanyName: this.props.eBOMData.materialCompanyName ? this.props.eBOMData.materialCompanyName : '',
            materialCountry: this.props.eBOMData.materialCountry ? this.props.eBOMData.materialCountry : '',
            errorTextMaterialCountry: this.props.eBOMData.materialCountry ? '' : 'This is a required field.',
            materialAddressLine1: this.props.eBOMData.materialAddressLine1 ? this.props.eBOMData.materialAddressLine1 : '',
            errorTextMaterialAddressLine1: this.props.eBOMData.materialAddressLine1 ? '' : 'This is a required field.',
            materialAddressLine2: this.props.eBOMData.materialAddressLine2 ? this.props.eBOMData.materialAddressLine2 : '',
            materialCity: this.props.eBOMData.materialCity ? this.props.eBOMData.materialCity : '',
            errorTextMaterialCity: this.props.eBOMData.materialCity ? '' : 'This is a required field.',
            materialStateProvince: this.props.eBOMData.materialStateProvince ? this.props.eBOMData.materialStateProvince : '',
            errorTextMaterialStateProvince: this.props.eBOMData.materialStateProvince ? '' : 'This is a required field.',
            materialPostalCode: this.props.eBOMData.materialPostalCode ? this.props.eBOMData.materialPostalCode : '',
            errorTextMaterialPostalCode: this.props.eBOMData.materialPostalCode ? '' : 'This is a required field.',
            materialIPAddress: this.props.eBOMData.materialIPAddress ? this.props.eBOMData.materialIPAddress : '',
            outboundList: this.props.eBOMData.outboundList ? this.props.eBOMData.outboundList : [],
            volume: this.props.eBOMData.volume ? this.props.eBOMData.volume : '',
            weight: this.props.eBOMData.weight ? this.props.eBOMData.weight : '',
            materialLength: this.props.eBOMData.materialLength ? this.props.eBOMData.materialLength : '',
            width: this.props.eBOMData.width ? this.props.eBOMData.width : '',
            height: this.props.eBOMData.height ? this.props.eBOMData.height : '',
            temperatureLimits: this.props.eBOMData.temperatureLimits ? this.props.eBOMData.temperatureLimits : '',
            shockVibration: this.props.eBOMData.shockVibration ? this.props.eBOMData.shockVibration : '',
            altitudeRestrictions: this.props.eBOMData.altitudeRestrictions ? this.props.eBOMData.altitudeRestrictions : '',
            compressionRestrictions: this.props.eBOMData.compressionRestrictions ? this.props.eBOMData.compressionRestrictions : '',
            alwaysUpright: this.props.eBOMData.alwaysUpright ? this.props.eBOMData.alwaysUpright : false,
            alwaysUpright2: this.props.eBOMData.alwaysUpright === true ? 'YES' : 'NO',
            metallic: this.props.eBOMData.metallic ? this.props.eBOMData.metallic : false,
            metallic2: this.props.eBOMData.metallic === true ? 'YES' : 'NO',
            hazmat: this.props.eBOMData.hazmat ? this.props.eBOMData.hazmat : false,
            hazmat2: this.props.eBOMData.hazmat === true ? 'YES' : 'NO',
            magnetic: this.props.eBOMData.magnetic ? this.props.eBOMData.magnetic : false,
            magnetic2: this.props.eBOMData.magnetic === true ? 'YES' : 'NO',
            lengthTolerance: this.props.eBOMData.lengthTolerance ? this.props.eBOMData.lengthTolerance : '',
            roundTolerance: this.props.eBOMData.roundTolerance ? this.props.eBOMData.roundTolerance : '',
            nonSkidTolerance: this.props.eBOMData.nonSkidTolerance ? this.props.eBOMData.nonSkidTolerance : '',
            minEOQuantities: this.props.eBOMData.minEOQuantities ? this.props.eBOMData.minEOQuantities : '',
            maxEOQuantities: this.props.eBOMData.maxEOQuantities ? this.props.eBOMData.maxEOQuantities : '',
            maxEPWithdrawRate: this.props.eBOMData.maxEPWithdrawRate ? this.props.eBOMData.maxEPWithdrawRate : '',
            minOrderLeadTimes: this.props.eBOMData.minOrderLeadTimes ? this.props.eBOMData.minOrderLeadTimes : '',
            country: this.props.eBOMData.country ? this.props.eBOMData.country : '',
            addressLine1: this.props.eBOMData.addressLine1 ? this.props.eBOMData.addressLine1 : '',
            addressLine2: this.props.eBOMData.addressLine2 ? this.props.eBOMData.addressLine2 : '',
            city: this.props.eBOMData.city ? this.props.eBOMData.city : '',
            stateProvince: this.props.eBOMData.stateProvince ? this.props.eBOMData.stateProvince : '',
            postalCode: this.props.eBOMData.postalCode ? this.props.eBOMData.postalCode : '',
            supPaymentTerms: this.props.eBOMData.supPaymentTerms ? this.props.eBOMData.supPaymentTerms : '',
            snackbar: this.props.snackbar
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
        if ([event.target.name].toString() === 'materialCountry' && event.target.value) {
            this.setState({
                errorTextMaterialCountry: '',
                materialStateProvince: '',
                errorTextMaterialStateProvince: 'This is a required field.'
            });
        } else if ([event.target.name].toString() === 'materialCountry' && !event.target.value) {
            this.setState({
                errorTextMaterialCountry: 'This is a required field.',
                materialStateProvince: '',
                errorTextMaterialStateProvince: 'This is a required field.'
            });
        }
        if ([event.target.name].toString() === 'materialAddressLine1' && event.target.value) {
            this.setState({ errorTextMaterialAddressLine1: '' });
        } else if ([event.target.name].toString() === 'materialAddressLine1' && !event.target.value) {
            this.setState({ errorTextMaterialAddressLine1: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'materialCity' && event.target.value) {
            this.setState({ errorTextMaterialCity: '' });
        } else if ([event.target.name].toString() === 'materialCity' && !event.target.value) {
            this.setState({ errorTextMaterialCity: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'materialStateProvince' && event.target.value) {
            this.setState({ errorTextMaterialStateProvince: '' });
        } else if ([event.target.name].toString() === 'materialStateProvince' && !event.target.value) {
            this.setState({ errorTextMaterialStateProvince: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'materialPostalCode' && event.target.value) {
            this.setState({ errorTextMaterialPostalCode: '' });
        } else if ([event.target.name].toString() === 'materialPostalCode' && !event.target.value) {
            this.setState({ errorTextMaterialPostalCode: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'country') {
            this.setState({ stateProvince: '' });
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
            materialCompanyName: '',
            materialCountry: '',
            materialAddressLine1: '',
            materialAddressLine2: '',
            materialCity: '',
            materialStateProvince: '',
            materialPostalCode: ''
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
        if ([event.target.name].toString() === 'materialCompanyNameList' && event.target.value) {
            outboundList[index].materialCompanyName = event.target.value;
        } else if ([event.target.name].toString() === 'materialCompanyNameList' && !event.target.value) {
            outboundList[index].materialCompanyName = '';
        }
        if ([event.target.name].toString() === 'materialCountryList' && event.target.value) {
            outboundList[index].materialCountry = event.target.value;
            outboundList[index].materialStateProvince = '';
        } else if ([event.target.name].toString() === 'materialCountryList' && !event.target.value) {
            outboundList[index].materialCountry = '';
            outboundList[index].materialStateProvince = '';
        }
        if ([event.target.name].toString() === 'materialAddressLine1List' && event.target.value) {
            outboundList[index].materialAddressLine1 = event.target.value;
        } else if ([event.target.name].toString() === 'materialAddressLine1List' && !event.target.value) {
            outboundList[index].materialAddressLine1 = '';
        }
        if ([event.target.name].toString() === 'materialAddressLine2List' && event.target.value) {
            outboundList[index].materialAddressLine2 = event.target.value;
        } else if ([event.target.name].toString() === 'materialAddressLine2List' && !event.target.value) {
            outboundList[index].materialAddressLine2 = '';
        }
        if ([event.target.name].toString() === 'materialCityList' && event.target.value) {
            outboundList[index].materialCity = event.target.value;
        } else if ([event.target.name].toString() === 'materialCityList' && !event.target.value) {
            outboundList[index].materialCity = '';
        }
        if ([event.target.name].toString() === 'materialStateProvinceList' && event.target.value) {
            outboundList[index].materialStateProvince = event.target.value;
        } else if ([event.target.name].toString() === 'materialStateProvinceList' && !event.target.value) {
            outboundList[index].materialStateProvince = '';
        }
        if ([event.target.name].toString() === 'materialPostalCodeList' && event.target.value) {
            outboundList[index].materialPostalCode = event.target.value;
        } else if ([event.target.name].toString() === 'materialPostalCodeList' && !event.target.value) {
            outboundList[index].materialPostalCode = '';
        }
        this.setState({ outboundList: outboundList });
    };

    handleCreateMasterData = () => {
        this.props.viewHandler(false, true, this.state, this.state.snackbar);
    };

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
    };

    render() {

        const formComplete = this.state.materialID && this.state.materialName && this.state.materialCountry &&
            this.state.materialAddressLine1 && this.state.materialCity &&
            this.state.materialStateProvince && this.state.materialPostalCode;

        return (
            <div>
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
                                name='materialCompanyName'
                                floatingLabelText='Company Name'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.materialCompanyName}
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
                                <Select value={this.state.materialCountry} onChange={this.handleChange}
                                        input={<Input name='materialCountry' className='Mobile-MenuItem' />}
                                        displayEmpty>
                                    {this.state.countryMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText className='TT-Font-Red'>
                                    {this.state.errorTextMaterialCountry}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialAddressLine1'
                                floatingLabelText='Address'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.materialAddressLine1}
                                onChange={this.handleChange}
                                errorText={this.state.errorTextMaterialAddressLine1}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialAddressLine2'
                                floatingLabelText='Address Line 2'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.materialAddressLine2}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialCity'
                                floatingLabelText='City'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.materialCity}
                                onChange={this.handleChange}
                                errorText={this.state.errorTextMaterialCity}
                            />
                        </Grid>
                        {this.state.materialCountry === 'United States' ?
                            <Grid container item xs={6} sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel>State/Province</InputLabel>
                                    <Select value={this.state.materialStateProvince} onChange={this.handleChange}
                                            input={<Input name='materialStateProvince' className='Mobile-MenuItem' />}
                                            displayEmpty>
                                        {this.state.usStatesMenuItems.map((menuItem, i) => {
                                            return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                        })}
                                    </Select>
                                    <FormHelperText className='TT-Font-Red'>
                                        {this.state.errorTextMaterialStateProvince}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            :
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type='text'
                                    name='materialStateProvince'
                                    floatingLabelText='State/Province'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.materialStateProvince}
                                    onChange={this.handleChange}
                                    errorText={this.state.errorTextMaterialStateProvince}
                                />
                            </Grid>
                        }
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialPostalCode'
                                floatingLabelText='Postal Code'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.materialPostalCode}
                                onChange={this.handleChange}
                                errorText={this.state.errorTextMaterialPostalCode}
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
                                        name='materialCompanyNameList'
                                        floatingLabelText='Company Name'
                                        floatingLabelFixed={true}
                                        className='Module-TextField'
                                        hintText=''
                                        value={outboundList.materialCompanyName}
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
                                        <Select value={outboundList.materialCountry}
                                                onChange={this.handleTextOutbound(index)}
                                                input={<Input name='materialCountryList' className='Mobile-MenuItem' />}
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
                                        name='materialAddressLine1List'
                                        floatingLabelText='Address'
                                        floatingLabelFixed={true}
                                        className='BOM-TextField'
                                        hintText=''
                                        value={outboundList.materialAddressLine1}
                                        onChange={this.handleTextOutbound(index)}
                                    />
                                </Grid>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type='text'
                                        name='materialAddressLine2List'
                                        floatingLabelText='Address Line 2'
                                        floatingLabelFixed={true}
                                        className='BOM-TextField'
                                        hintText=''
                                        value={outboundList.materialAddressLine2}
                                        onChange={this.handleTextOutbound(index)}
                                    />
                                </Grid>
                            </Grid>
                            <br /><br />
                            <Grid container spacing={24}>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type='text'
                                        name='materialCityList'
                                        floatingLabelText='City'
                                        floatingLabelFixed={true}
                                        className='BOM-TextField'
                                        hintText=''
                                        value={outboundList.materialCity}
                                        onChange={this.handleTextOutbound(index)}
                                    />
                                </Grid>
                                {outboundList.materialCountry === 'United States' ?
                                    <Grid container item xs={6} sm={3}>
                                        <FormControl fullWidth={true}>
                                            <InputLabel>State/Province</InputLabel>
                                            <Select value={outboundList.materialStateProvince}
                                                    onChange={this.handleTextOutbound(index)}
                                                    input={<Input name='materialStateProvinceList'
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
                                            name='materialStateProvinceList'
                                            floatingLabelText='State/Province'
                                            floatingLabelFixed={true}
                                            className='BOM-TextField'
                                            hintText=''
                                            value={outboundList.materialStateProvince}
                                            onChange={this.handleTextOutbound(index)}
                                        />
                                    </Grid>
                                }
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type='text'
                                        name='materialPostalCodeList'
                                        floatingLabelText='Postal Code'
                                        floatingLabelFixed={true}
                                        className='BOM-TextField'
                                        hintText=''
                                        value={outboundList.materialPostalCode}
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
                                <Select value={this.state.country} onChange={this.handleChange}
                                        input={<Input name='country' className='Mobile-MenuItem' />}
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
                                name='addressLine1'
                                floatingLabelText='Address'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.addressLine1}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='addressLine2'
                                floatingLabelText='Address Line 2'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.addressLine2}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='city'
                                floatingLabelText='City'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        {this.state.country === 'United States' ?
                            <Grid container item xs={6} sm={3}>
                                <FormControl fullWidth={true}>
                                    <InputLabel>State/Province</InputLabel>
                                    <Select value={this.state.stateProvince} onChange={this.handleChange}
                                            input={<Input name='stateProvince'
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
                                    name='stateProvince'
                                    floatingLabelText='State/Province'
                                    floatingLabelFixed={true}
                                    className='BOM-TextField'
                                    hintText=''
                                    value={this.state.stateProvince}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        }
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='postalCode'
                                floatingLabelText='Postal Code'
                                floatingLabelFixed={true}
                                className='BOM-TextField'
                                hintText=''
                                value={this.state.postalCode}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='supPaymentTerms'
                                floatingLabelText='Supplier Payment Terms'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.supPaymentTerms}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button type='submit' value='Submit' variant='contained' className='Module-Button'
                                    fullWidth={true} disabled={!formComplete} onClick={this.handleCreateMasterData}>
                                Create Master Data
                                <ListAlt className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar open={this.props.snackbar.open} autoHideDuration={this.props.snackbar.autoHideDuration}
                          onClose={this.handleSnackbarClose}>
                    <SnackbarContent
                        message={this.props.snackbar.message}
                        className={this.props.snackbar.sbColor}
                        classes={{ message: 'Module-Snackbar-Message' }}
                    />
                </Snackbar>
            </div>
        );

    }
}

export default BillOfMaterialsForm;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Divider from '@material-ui/core/Divider/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListAlt from '@material-ui/icons/ListAlt';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

class BillOfMaterialsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            materialID: this.props.eBOMData.materialID ? this.props.eBOMData.materialID : '',
            errorTextMaterialID: this.props.eBOMData.materialID ? '' : 'This is a required field.',
            materialName: this.props.eBOMData.materialName ? this.props.eBOMData.materialName : '',
            errorTextMaterialName: this.props.eBOMData.materialName ? '' : 'This is a required field.',
            materialDescription: this.props.eBOMData.materialDescription ? this.props.eBOMData.materialDescription : '',
            partNo: this.props.eBOMData.partNo ? this.props.eBOMData.partNo : '',
            partName: this.props.eBOMData.partName ? this.props.eBOMData.partName : '',
            partDescription: this.props.eBOMData.partDescription ? this.props.eBOMData.partDescription : '',
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
            shipToAddressLine1: this.props.eBOMData.shipToAddressLine1 ? this.props.eBOMData.shipToAddressLine1 : '',
            shipToAddressLine2: this.props.eBOMData.shipToAddressLine2 ? this.props.eBOMData.shipToAddressLine2 : '',
            shipToCity: this.props.eBOMData.shipToCity ? this.props.eBOMData.shipToCity : '',
            shipToAddressState: this.props.eBOMData.shipToAddressState ? this.props.eBOMData.shipToAddressState : '',
            shipToPostalCode: this.props.eBOMData.shipToPostalCode ? this.props.eBOMData.shipToPostalCode : '',
            shipToCountry: this.props.eBOMData.shipToCountry ? this.props.eBOMData.shipToCountry : '',
            shipToIPAddress: this.props.eBOMData.shipToIPAddress ? this.props.eBOMData.shipToIPAddress : '',
            billToAddressLine1: this.props.eBOMData.billToAddressLine1 ? this.props.eBOMData.billToAddressLine1 : '',
            billToAddressLine2: this.props.eBOMData.billToAddressLine2 ? this.props.eBOMData.billToAddressLine2 : '',
            billToCity: this.props.eBOMData.billToCity ? this.props.eBOMData.billToCity : '',
            billToAddressState: this.props.eBOMData.billToAddressState ? this.props.eBOMData.billToAddressState : '',
            billToPostalCode: this.props.eBOMData.billToPostalCode ? this.props.eBOMData.billToPostalCode : '',
            billToCountry: this.props.eBOMData.billToCountry ? this.props.eBOMData.billToCountry : '',
            billToIPAddress: this.props.eBOMData.billToIPAddress ? this.props.eBOMData.billToIPAddress : '',
            paymentTerms: this.props.eBOMData.paymentTerms ? this.props.eBOMData.paymentTerms : '',
            minEOQuantities: this.props.eBOMData.minEOQuantities ? this.props.eBOMData.minEOQuantities : '',
            maxEOQuantities: this.props.eBOMData.maxEOQuantities ? this.props.eBOMData.maxEOQuantities : '',
            maxEPWithdrawRate: this.props.eBOMData.maxEPWithdrawRate ? this.props.eBOMData.maxEPWithdrawRate : '',
            minOrderLeadTimes: this.props.eBOMData.minOrderLeadTimes ? this.props.eBOMData.minOrderLeadTimes : '',
            addressLine1: this.props.eBOMData.addressLine1 ? this.props.eBOMData.addressLine1 : '',
            addressLine2: this.props.eBOMData.addressLine2 ? this.props.eBOMData.addressLine2 : '',
            city: this.props.eBOMData.city ? this.props.eBOMData.city : '',
            addressState: this.props.eBOMData.addressState ? this.props.eBOMData.addressState : '',
            postalCode: this.props.eBOMData.postalCode ? this.props.eBOMData.postalCode : '',
            country: this.props.eBOMData.country ? this.props.eBOMData.country : '',
            ipAddress: this.props.eBOMData.ipAddress ? this.props.eBOMData.ipAddress : '',
            matSupPerIPAddress: this.props.eBOMData.matSupPerIPAddress ? this.props.eBOMData.matSupPerIPAddress : '',
            supPaymentTerms: this.props.eBOMData.supPaymentTerms ? this.props.eBOMData.supPaymentTerms : '',
            supOrderPolicy: this.props.eBOMData.supOrderPolicy ? this.props.eBOMData.supOrderPolicy : '',
            materialAddressLine1: this.props.eBOMData.materialAddressLine1 ? this.props.eBOMData.materialAddressLine1 : '',
            errorTextMaterialAddressLine1: this.props.eBOMData.materialAddressLine1 ? '' : 'This is a required field.',
            materialAddressLine2: this.props.eBOMData.materialAddressLine2 ? this.props.eBOMData.materialAddressLine2 : '',
            materialCity: this.props.eBOMData.materialCity ? this.props.eBOMData.materialCity : '',
            errorTextMaterialCity: this.props.eBOMData.materialCity ? '' : 'This is a required field.',
            materialAddressState: this.props.eBOMData.materialAddressState ? this.props.eBOMData.materialAddressState : '',
            errorTextMaterialAddressState: this.props.eBOMData.materialAddressState ? '' : 'This is a required field.',
            materialPostalCode: this.props.eBOMData.materialPostalCode ? this.props.eBOMData.materialPostalCode : '',
            errorTextMaterialPostalCode: this.props.eBOMData.materialPostalCode ? '' : 'This is a required field.',
            materialCountry: this.props.eBOMData.materialCountry ? this.props.eBOMData.materialCountry : '',
            materialIPAddress: this.props.eBOMData.materialIPAddress ? this.props.eBOMData.materialIPAddress : '',
            materialCompanyName: this.props.eBOMData.materialCompanyName ? this.props.eBOMData.materialCompanyName : '',
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
        if ([event.target.name].toString() === 'materialAddressState' && event.target.value) {
            this.setState({ errorTextMaterialAddressState: '' });
        } else if ([event.target.name].toString() === 'materialAddressState' && !event.target.value) {
            this.setState({ errorTextMaterialAddressState: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'materialPostalCode' && event.target.value) {
            this.setState({ errorTextMaterialPostalCode: '' });
        } else if ([event.target.name].toString() === 'materialPostalCode' && !event.target.value) {
            this.setState({ errorTextMaterialPostalCode: 'This is a required field.' });
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

    handleCreateMasterData = () => {
        this.props.viewHandler(false, true, this.state, this.state.snackbar);
    };

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
    };

    render() {

        const formComplete = this.state.materialID && this.state.materialName &&
            this.state.materialAddressLine1 && this.state.materialCity &&
            this.state.materialAddressState && this.state.materialPostalCode;

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
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Material Shipping Information
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
                                name='materialAddressLine1'
                                floatingLabelText='Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
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
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Address Line 2'
                                value={this.state.materialAddressLine2}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialCity'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='City'
                                value={this.state.materialCity}
                                onChange={this.handleChange}
                                errorText={this.state.errorTextMaterialCity}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialAddressState'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='State'
                                value={this.state.materialAddressState}
                                onChange={this.handleChange}
                                errorText={this.state.errorTextMaterialAddressState}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialPostalCode'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Postal Code'
                                value={this.state.materialPostalCode}
                                onChange={this.handleChange}
                                errorText={this.state.errorTextMaterialPostalCode}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialCountry'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Country'
                                value={this.state.materialCountry}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='materialIPAddress'
                                floatingLabelText='IP Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.materialIPAddress}
                                onChange={this.handleChange}
                            />
                        </Grid>
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
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Material Dimensions
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
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Material Handling Characteristics
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
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Material Other
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider className='Module-Divider' />
                    <br /><br />
                    <Grid container spacing={24}>
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
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Material Quality Standards
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
                                Supplier Customer Definition
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
                                name='shipToAddressLine1'
                                floatingLabelText='Ship To Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.shipToAddressLine1}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='shipToAddressLine2'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Address Line 2'
                                value={this.state.shipToAddressLine2}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='shipToCity'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='City'
                                value={this.state.shipToCity}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='shipToAddressState'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='State'
                                value={this.state.shipToAddressState}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='shipToPostalCode'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Postal Code'
                                value={this.state.shipToPostalCode}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='shipToCountry'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Country'
                                value={this.state.shipToCountry}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='shipToIPAddress'
                                floatingLabelText='Ship To IP Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.shipToIPAddress}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToAddressLine1'
                                floatingLabelText='Bill To Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.billToAddressLine1}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToAddressLine2'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Address Line 2'
                                value={this.state.billToAddressLine2}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToCity'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='City'
                                value={this.state.billToCity}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToAddressState'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='State'
                                value={this.state.billToAddressState}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToPostalCode'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Postal Code'
                                value={this.state.billToPostalCode}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToCountry'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Country'
                                value={this.state.billToCountry}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='billToIPAddress'
                                floatingLabelText='Bill To IP Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.billToIPAddress}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Supplier Payment Terms
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
                                name='paymentTerms'
                                floatingLabelText='Payment Terms'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.paymentTerms}
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
                                Suppliers
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
                                name='addressLine1'
                                floatingLabelText='Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.addressLine1}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='addressLine2'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Address Line 2'
                                value={this.state.addressLine2}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='city'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='City'
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='addressState'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='State'
                                value={this.state.addressState}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='postalCode'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Postal Code'
                                value={this.state.postalCode}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='country'
                                floatingLabelText=' '
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText='Country'
                                value={this.state.country}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='ipAddress'
                                floatingLabelText='IP Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.ipAddress}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='matSupPerIPAddress'
                                floatingLabelText='Material Supplied Per IP Address'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.matSupPerIPAddress}
                                onChange={this.handleChange}
                            />
                        </Grid>
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
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type='text'
                                name='supOrderPolicy'
                                floatingLabelText='Supplier Order Policy'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                value={this.state.supOrderPolicy}
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
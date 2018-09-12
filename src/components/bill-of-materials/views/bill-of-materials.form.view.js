import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from 'material-ui/Checkbox';
import Snackbar from "material-ui/Snackbar";

class BillOfMaterialsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            materialID: this.props.eBOMData.materialID,
            errorText1: this.props.eBOMData.materialID ? '' : 'This is a required field.',
            materialName: this.props.eBOMData.materialName,
            errorText2: this.props.eBOMData.materialName ? '' : 'This is a required field.',
            materialDescription: this.props.eBOMData.materialDescription,
            errorText3: this.props.eBOMData.materialDescription ? '' : 'This is a required field.',
            partNo: this.props.eBOMData.partNo,
            partName: this.props.eBOMData.partName,
            partDescription: this.props.eBOMData.partDescription,
            volume: this.props.eBOMData.volume,
            weight: this.props.eBOMData.weight,
            materialLength: this.props.eBOMData.materialLength,
            width: this.props.eBOMData.width,
            height: this.props.eBOMData.height,
            temperatureLimits: this.props.eBOMData.temperatureLimits,
            shockVibration: this.props.eBOMData.shockVibration,
            altitudeRestrictions: this.props.eBOMData.altitudeRestrictions,
            compressionRestrictions: this.props.eBOMData.compressionRestrictions,
            alwaysUpright: this.props.eBOMData.alwaysUpright ? this.props.eBOMData.alwaysUpright : false,
            alwaysUpright2: this.props.eBOMData.alwaysUpright === true ? 'YES' : 'NO',
            metallic: this.props.eBOMData.metallic ? this.props.eBOMData.metallic : false,
            metallic2: this.props.eBOMData.metallic === true ? 'YES' : 'NO',
            hazmat: this.props.eBOMData.hazmat ? this.props.eBOMData.hazmat : false,
            hazmat2: this.props.eBOMData.hazmat === true ? 'YES' : 'NO',
            magnetic: this.props.eBOMData.magnetic ? this.props.eBOMData.magnetic : false,
            magnetic2: this.props.eBOMData.magnetic === true ? 'YES' : 'NO',
            lengthTolerance: this.props.eBOMData.lengthTolerance,
            roundTolerance: this.props.eBOMData.roundTolerance,
            nonSkidTolerance: this.props.eBOMData.nonSkidTolerance,
            shipToAddressLine1: this.props.eBOMData.shipToAddressLine1 ? this.props.eBOMData.shipToAddressLine1 : '',
            shipToAddressLine2: this.props.eBOMData.shipToAddressLine2 ? this.props.eBOMData.shipToAddressLine2 : '',
            shipToCity: this.props.eBOMData.shipToCity ? this.props.eBOMData.shipToCity : '',
            shipToAddressState: this.props.eBOMData.shipToAddressState ? this.props.eBOMData.shipToAddressState : '',
            shipToPostalCode: this.props.eBOMData.shipToPostalCode ? this.props.eBOMData.shipToPostalCode : '',
            shipToCountry: this.props.eBOMData.shipToCountry ? this.props.eBOMData.shipToCountry : '',
            shipToIPAddress: this.props.eBOMData.shipToIPAddress,
            billToAddressLine1: this.props.eBOMData.billToAddressLine1 ? this.props.eBOMData.billToAddressLine1 : '',
            billToAddressLine2: this.props.eBOMData.billToAddressLine2 ? this.props.eBOMData.billToAddressLine2 : '',
            billToCity: this.props.eBOMData.billToCity ? this.props.eBOMData.billToCity : '',
            billToAddressState: this.props.eBOMData.billToAddressState ? this.props.eBOMData.billToAddressState : '',
            billToPostalCode: this.props.eBOMData.billToPostalCode ? this.props.eBOMData.billToPostalCode : '',
            billToCountry: this.props.eBOMData.billToCountry ? this.props.eBOMData.billToCountry : '',
            billToIPAddress: this.props.eBOMData.billToIPAddress ? this.props.eBOMData.billToIPAddress : '',
            paymentTerms: this.props.eBOMData.paymentTerms,
            minEOQuantities: this.props.eBOMData.minEOQuantities,
            maxEOQuantities: this.props.eBOMData.maxEOQuantities,
            maxEPWithdrawRate: this.props.eBOMData.maxEPWithdrawRate,
            minOrderLeadTimes: this.props.eBOMData.minOrderLeadTimes,
            addressLine1: this.props.eBOMData.addressLine1 ? this.props.eBOMData.addressLine1 : '',
            addressLine2: this.props.eBOMData.addressLine2 ? this.props.eBOMData.addressLine2 : '',
            city: this.props.eBOMData.city ? this.props.eBOMData.city : '',
            addressState: this.props.eBOMData.addressState ? this.props.eBOMData.addressState : '',
            postalCode: this.props.eBOMData.postalCode ? this.props.eBOMData.postalCode : '',
            country: this.props.eBOMData.country ? this.props.eBOMData.country : '',
            ipAddress: this.props.eBOMData.ipAddress,
            matSupPerIPAddress: this.props.eBOMData.matSupPerIPAddress,
            supPaymentTerms: this.props.eBOMData.supPaymentTerms,
            supOrderPolicy: this.props.eBOMData.supOrderPolicy,
            snackbar: this.props.snackbar
        };
    }

    getSteps = () => {
        return ['Material Dimensions',
            'Material Handling Characteristics',
            'Material Other',
            'Material Quality Standards',
            'Supplier Customer Definition',
            'Supplier Payment Terms',
            'Supplier Order Quantities Controls',
            'Suppliers'];
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="volume"
                                    floatingLabelText="Volume"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.volume}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="weight"
                                    floatingLabelText="Weight"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.weight}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="materialLength"
                                    floatingLabelText="Length"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.materialLength}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="width"
                                    floatingLabelText="Width"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.width}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="height"
                                    floatingLabelText="Height"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.height}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="temperatureLimits"
                                    floatingLabelText="Temperature Limits"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.temperatureLimits}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shockVibration"
                                    floatingLabelText="Shock/Vibration"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.shockVibration}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="altitudeRestrictions"
                                    floatingLabelText="Altitude Restrictions"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.altitudeRestrictions}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="compressionRestrictions"
                                    floatingLabelText="Compression Restrictions"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
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
                                                name="alwaysUpright"
                                                color="default"
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.alwaysUpright}
                                            />
                                        }
                                        label=""
                                    />
                                </FormGroup>
                                Always Upright
                            </Grid>
                        </Grid>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="metallic"
                                                color="default"
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.metallic}
                                            />
                                        }
                                        label=""
                                    />
                                </FormGroup>
                                Metallic
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="hazmat"
                                                color="default"
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.hazmat}
                                            />
                                        }
                                        label=""
                                    />
                                </FormGroup>
                                Hazmat
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="magnetic"
                                                color="default"
                                                onClick={this.handleCheckboxChange}
                                                checked={this.state.magnetic}
                                            />
                                        }
                                        label=""
                                    />
                                </FormGroup>
                                Magnetic
                            </Grid>
                        </Grid>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="lengthTolerance"
                                    floatingLabelText="Length Tolerance"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.lengthTolerance}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="roundTolerance"
                                    floatingLabelText="Round Tolerance"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.roundTolerance}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="nonSkidTolerance"
                                    floatingLabelText="Non-Skid Tolerance"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.nonSkidTolerance}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToAddressLine1"
                                    floatingLabelText="Ship To Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.shipToAddressLine1}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToAddressLine2"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Address Line 2"
                                    value={this.state.shipToAddressLine2}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToCity"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="City"
                                    value={this.state.shipToCity}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToAddressState"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="State"
                                    value={this.state.shipToAddressState}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToPostalCode"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Postal Code"
                                    value={this.state.shipToPostalCode}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToCountry"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Country"
                                    value={this.state.shipToCountry}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="shipToIPAddress"
                                    floatingLabelText="Ship To IP Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.shipToIPAddress}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToAddressLine1"
                                    floatingLabelText="Bill To Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.billToAddressLine1}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToAddressLine2"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Address Line 2"
                                    value={this.state.billToAddressLine2}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToCity"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="City"
                                    value={this.state.billToCity}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToAddressState"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="State"
                                    value={this.state.billToAddressState}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToPostalCode"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Postal Code"
                                    value={this.state.billToPostalCode}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToCountry"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Country"
                                    value={this.state.billToCountry}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="billToIPAddress"
                                    floatingLabelText="Bill To IP Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.billToIPAddress}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="paymentTerms"
                                    floatingLabelText="Payment Terms"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.paymentTerms}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>);
            case 6:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    name="minEOQuantities"
                                    floatingLabelText="Minimum Economic Order Quantities"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    fullWidth={true}
                                    value={this.state.minEOQuantities}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    name="maxEOQuantities"
                                    floatingLabelText="Maximum Economic Order Quantities"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="" fullWidth={true}
                                    value={this.state.maxEOQuantities}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    name="maxEPWithdrawRate"
                                    floatingLabelText="Maximum Economic Product Withdraw Rate"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    fullWidth={true}
                                    value={this.state.maxEPWithdrawRate}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <TextField
                                    type="text"
                                    name="minOrderLeadTimes"
                                    floatingLabelText="Minimum Order Lead Times"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.minOrderLeadTimes}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="addressLine1"
                                    floatingLabelText="Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.addressLine1}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="addressLine2"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Address Line 2"
                                    value={this.state.addressLine2}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="city"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="City"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="addressState"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="State"
                                    value={this.state.addressState}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="postalCode"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Postal Code"
                                    value={this.state.postalCode}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="country"
                                    floatingLabelText=" "
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText="Country"
                                    value={this.state.country}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="ipAddress"
                                    floatingLabelText="IP Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.ipAddress}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="matSupPerIPAddress"
                                    floatingLabelText="Material Supplied Per IP Address"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.matSupPerIPAddress}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="supPaymentTerms"
                                    floatingLabelText="Supplier Payment Terms"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.supPaymentTerms}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid container item xs={6} sm={3}>
                                <TextField
                                    type="text"
                                    name="supOrderPolicy"
                                    floatingLabelText="Supplier Order Policy"
                                    floatingLabelFixed={true}
                                    style={{"float": "left", "textAlign": "left"}}
                                    hintText=""
                                    value={this.state.supOrderPolicy}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                );
            default:
                return 'Unknown step.';
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if ([event.target.name].toString() === 'materialID' && event.target.value) {
            this.setState({errorText1: ''});
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({errorText1: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'materialName' && event.target.value) {
            this.setState({errorText2: ''});
        } else if ([event.target.name].toString() === 'materialName' && !event.target.value) {
            this.setState({errorText2: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'materialDescription' && event.target.value) {
            this.setState({errorText3: ''});
        } else if ([event.target.name].toString() === 'materialDescription' && !event.target.value) {
            this.setState({errorText3: 'This is a required field.'});
        }
    };

    handleCheckboxChange = (event) => {
        this.setState({[event.target.name]: event.target.checked});
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

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleNext = (event, steps) => {
        if (this.state.activeStep !== steps.length - 1) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        } else {
            this.props.viewHandler(false, true, this.state, this.state.snackbar);
        }
    };

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
    };

    render() {

        const steps = this.getSteps();

        const {activeStep} = this.state;

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const formComplete = this.state.materialID && this.state.materialName && this.state.materialDescription;

        return (
            <div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                type="text"
                                name="materialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                errorText={this.state.errorText1}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                type="text"
                                name="materialName"
                                floatingLabelText="Material Name"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                value={this.state.materialName}
                                onChange={this.handleChange}
                                errorText={this.state.errorText2}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                type="text"
                                name="materialDescription"
                                floatingLabelText="Material Description"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                value={this.state.materialDescription}
                                onChange={this.handleChange}
                                errorText={this.state.errorText3}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3} justify="flex-end">
                            <Grid>
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Upload" variant="contained"
                                            color="primary" disabled>
                                        Upload...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                type="text"
                                name="partNo"
                                floatingLabelText="Part No."
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                value={this.state.partNo}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                type="text"
                                name="partName"
                                floatingLabelText="Part Name"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                value={this.state.partName}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                type="text"
                                name="partDescription"
                                floatingLabelText="Part Description"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                value={this.state.partDescription}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                        </Grid>
                    </Grid>
                </div>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <div>{this.getStepContent(index)}</div>
                                    <div>
                                        <div>
                                            <br/>
                                            <Grid container spacing={24}>
                                                <Grid container item xs={12} sm={3}>
                                                    <Grid container item xs>
                                                        <MuiThemeProvider theme={buttonThemeYellow}>
                                                            <Button type="submit" value="Submit" variant="contained"
                                                                    color="primary" disabled={activeStep === 0}
                                                                    onClick={this.handleBack}>
                                                                Back
                                                            </Button>
                                                        </MuiThemeProvider>
                                                    </Grid>
                                                    <Grid container item xs>
                                                        <MuiThemeProvider theme={buttonThemeYellow}>
                                                            <Button type="submit" value="Submit" variant="contained"
                                                                    color="primary" disabled={!formComplete}
                                                                    onClick={(event) => {
                                                                        this.handleNext(event, steps)
                                                                    }}>
                                                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                                            </Button>
                                                        </MuiThemeProvider>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <br/>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                <Snackbar
                    open={this.props.snackbar.open}
                    message={this.props.snackbar.message}
                    autoHideDuration={this.props.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.props.snackbar.sbColor}}
                />
            </div>
        );
    }
}

export default BillOfMaterialsForm;
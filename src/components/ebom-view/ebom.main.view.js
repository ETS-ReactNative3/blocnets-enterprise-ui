import React from 'react';
import PropTypes from 'prop-types';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField';


import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import Divider from 'material-ui/Divider';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Button from '@material-ui/core/Button';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from 'material-ui/Checkbox';
import EBOMView from './ebom.view';


function getSteps() {
    return ['Material Dimensions',
        'Material Handling Characteristics',
        'Material Other',
        'Material Quality Standards',
        'Supplier Customer Definition',
        'Supplier Payment Terms',
        'Supplier Order Quantities Controls',
        'Suppliers'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <div>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="volume" floatingLabelText="Volume" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="weight" floatingLabelText="Weight" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="length" floatingLabelText="Length" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="width" floatingLabelText="Width" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="height" floatingLabelText="Height" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
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
                                type="text" name="temperatureLimits" floatingLabelText="Temperature Limits"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shockVibration" floatingLabelText="Shock/Vibration"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="altitudeRestrictions" floatingLabelText="Altitude Restrictions"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="compressionRestrictions"
                                floatingLabelText="Compression Restrictions" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="alwaysUpright" color="default"
                                        />
                                    }
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
                                            name="metallic" color="default"
                                        />
                                    }
                                />
                            </FormGroup>
                            Metallic
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="hazmat" color="default"
                                        />
                                    }
                                />
                            </FormGroup>
                            Hazmat
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="magnetic" color="default"
                                        />
                                    }
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
                                type="text" name="lengthTolerance" floatingLabelText="Length Tolerance"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="roundTolerance" floatingLabelText="Round Tolerance"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="nonSkidTolerance" floatingLabelText="Non-Skid Tolerance"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
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
                                type="text" name="shipAddressLine1" floatingLabelText="Ship To Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shipAddressLine2" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Address Line 2"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shipCity" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="City"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shipAddressState" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="State"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shipPostalCode" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Postal Code"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shipCountry" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Country"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="shipIPAddress" floatingLabelText="Ship To IP Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billAddressLine1" floatingLabelText="Bill To Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billAddressLine2" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Address Line 2"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billCity" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="City"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billAddressState" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="State"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billPostalCode" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Postal Code"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billCountry" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Country"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="billIPAddress" floatingLabelText="Bill To IP Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
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
                                type="text" name="paymentTerms" floatingLabelText="Payment Terms"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
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
                                type="text" name="minEOQuantities" floatingLabelText="Minimum Economic Order Quantities"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="" fullWidth={true}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                            <TextField
                                type="text" name="maxEOQuantities" floatingLabelText="Maximum Economic Order Quantities"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="" fullWidth={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={6}>
                            <TextField
                                type="text" name="maxEPWithdrawRate" floatingLabelText="Maximum Economic Product Withdraw Rate"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="" fullWidth={true}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                            <TextField
                                type="text" name="minOrderLeadTimes" floatingLabelText="Minimum Order Lead Times"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
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
                                type="text" name="addressLine1" floatingLabelText="Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="addressLine2" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Address Line 2"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="city" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="City"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="addressState" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="State"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="postalCode" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Postal Code"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="country" floatingLabelText=" "
                                floatingLabelFixed={true} style={{"float": "left"}} hintText="Country"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="ipAddress" floatingLabelText="IP Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="matSupPerIPAddress" floatingLabelText="Material Supplied Per IP Address"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="supPaymentTerms" floatingLabelText="Supplier Payment Terms"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                type="text" name="supOrderPolicy" floatingLabelText="Supplier Order Policy"
                                floatingLabelFixed={true} style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                </div>
            );
        default:
            return 'Unknown step';
    }
}

class EBOMMain extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.state = {
            showEBOMMain: false,
            showEBOMReview: true,
            activeStep: 0,
            materialID: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleNext = (event, steps) => {
        if (this.state.activeStep !== steps.length - 1) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        } else {
            event.preventDefault();
            this.props.viewHandler(this.state);
        }

    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const styles = theme => ({
            root: {
                width: '90%',
            },
            button: {
                marginTop: theme.spacing.unit,
                marginRight: theme.spacing.unit,
            },
            actionsContainer: {
                marginBottom: theme.spacing.unit * 2,
            },
            resetContainer: {
                padding: theme.spacing.unit * 3,
            },
        });
        const steps = getSteps();
        const {activeStep} = this.state;

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        return (
            <div className={styles.root}>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={9}>
                            <TextField
                                type="text" name="materialID" floatingLabelText="Material ID"
                                floatingLabelFixed={true} style={{"float": "left"}}
                                value={this.state.materialID} onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <Grid>
                                <MuiThemeProvider theme={buttonTheme}>
                                    <Button type="submit" value="Upload" variant="contained"
                                            color="primary" className={styles.button}>
                                        Upload...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <div>{getStepContent(index)}</div>
                                    <div className={styles.actionsContainer}>
                                        <div>
                                            <br/>
                                            <Grid container spacing={24}>
                                                <Grid container item xs={12} sm={3}>
                                                    <Grid container item xs>
                                                        <MuiThemeProvider theme={buttonTheme}>
                                                            <Button type="submit" value="Submit" variant="contained"
                                                                    color="primary" disabled={activeStep === 0}
                                                                    onClick={this.handleBack} className={styles.button}>
                                                                Back
                                                            </Button>
                                                        </MuiThemeProvider>
                                                    </Grid>
                                                    <Grid container item xs>
                                                        <MuiThemeProvider theme={buttonTheme}>
                                                            <Button type="submit" value="Submit" variant="contained"
                                                                    color="primary"
                                                                    onClick={(event) => {this.handleNext(event, steps)}} className={styles.button}>
                                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
                {activeStep === steps.length && (
                    <Paper square elevation={0} className={styles.resetContainer}>
                        <div>All steps completed - you&quot;re finished</div>
                        <FlatButton onClick={this.handleReset} className={styles.button}>
                            Reset
                        </FlatButton>
                    </Paper>
                )}
            </div>
        );
    }
}



export default EBOMMain;
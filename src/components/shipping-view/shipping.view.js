import React, {Component} from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import Snackbar from 'material-ui/Snackbar';

class ShippingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            addressState: '',
            postalCode: '',
            country: '',
            ipAddress: '',
            manualShipping: '',
            manualShipping2: 'NO',
            formComplete: '',
            openDialog: false,
            count: 0,
            doNotAskAgain: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value, formComplete: true});
    }

    handleCheckboxChange(event) {
        this.setState({[event.target.name]: event.target.checked, formComplete: true});
        [event.target.name].toString() === 'manualShipping' && event.target.checked === true
            ? this.state.manualShipping2 = 'YES' : this.state.manualShipping2 = 'NO'
    }

    handleConfirmation(event) {
        this.setState({openDialog: true});
        event.preventDefault();
    }

    handleSubmit(event) {
        this.setState({showProgressLogo: true, openDialog: false});

        event.preventDefault();
    }

    createData(info1, info2) {
        this.state.count += 1;
        return {id: this.state.count, info1, info2};
    }

    handlePrint = () => {
    };


    handleDialogClose = () => {
        this.setState({openDialog: false});
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                message: '',
                open: false
            },
        });
    };

    render() {

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const button2Theme = createMuiTheme({
            palette: {
                primary: red
            },
        });

        const rows = [
            this.createData('Material ID', this.state.materialID),
            this.createData('Address', this.state.addressLine1 + ' ' + this.state.addressLine2 + ' '
                + this.state.city + ' ' + this.state.addressState + ' ' + this.state.postalCode + ' '
                + this.state.country),
            this.createData('IP Address', this.state.ipAddress),
            this.createData('Manual Shipping', this.state.manualShipping2),
        ];

        return (
            <form onSubmit={this.handleConfirmation}>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} className="App-logo-progress"/> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs>
                            <TextField
                                value={this.state.materialID} onChange={this.handleChange} type="text"
                                name="materialID" floatingLabelText="Material ID" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressLine1} onChange={this.handleChange} type="text"
                                name="addressLine1" floatingLabelText="Address" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressLine2} onChange={this.handleChange} type="text"
                                name="addressLine2" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="Address Line 2"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.city} onChange={this.handleChange} type="text"
                                name="city" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="City"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.addressState} onChange={this.handleChange} type="text"
                                name="addressState" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="State"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.postalCode} onChange={this.handleChange} type="text"
                                name="postalCode" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="Postal Code"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.country} onChange={this.handleChange} type="text"
                                name="country" floatingLabelText=" " floatingLabelFixed={true}
                                style={{"float": "left"}} hintText="Country"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.ipAddress} onChange={this.handleChange} type="text"
                                name="ipAddress" floatingLabelText="IP Address" floatingLabelFixed={true}
                                style={{"float": "left"}} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={6}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="manualShipping" color="default"
                                        />
                                    }
                                    label="Manual Shipping"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!this.state.formComplete}>
                                    Submit
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{padding: 24}}>
                        <Grid container>
                            <Grid container item xs={12}>
                                Please confirm information.
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container justify="center">
                            <Grid container item xs={12}>
                                <Paper style={{"width": "100%"}}>
                                    <div style={{"overflowX": "auto"}}>
                                        <Table>
                                            <TableBody>
                                                {rows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>
                                                                {row.info1}
                                                            </TableCell>
                                                            <TableCell>{row.info2}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={this.state.doNotAskAgain} onChange={this.handleCheckboxChange}
                                                name="doNotAskAgain" color="default"
                                            />
                                        }
                                        label="Do not ask again."
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="print" value="Print" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handlePrint}>
                                        Print...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="ok" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="cancel" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogClose}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open} message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </form>
        );

    }

}

export default ShippingView;
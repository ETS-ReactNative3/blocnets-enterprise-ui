import React, { Component } from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import {
    getProductionOrderByProdOrderNo,
    updateProductionOrderByProdOrderNo
}
    from '../../../redux/actions/production.actions';

class CompleteProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorText0: 'This is a required field.',
            errorText1: 'This is a required field.',
            errorText2: 'This is a required field.',
            errorText3: 'This is a required field.',
            productionOrderNo: '',
            newMaterialID: '',
            newIpAddress: '',
            productionQuantity: '',
            productionComplete: false,
            showProgressLogo: false,
            openDialog: false,
            showProgressLogoDialog: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        };
    }

    handleDialogClose = () => {
        this.setState({
            showProgressLogo: false,
            openDialog: false,
            showProgressLogoDialog: false
        });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'productionOrderNo' && event.target.value !== '') {
            this.setState({ errorText0: '' });
        } else if ([event.target.name].toString() === 'productionOrderNo' && !event.target.value) {
            this.setState({ errorText0: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'newMaterialID' && event.target.value !== '') {
            this.setState({ errorText1: '' });
        } else if ([event.target.name].toString() === 'newMaterialID' && !event.target.value) {
            this.setState({ errorText1: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'newIpAddress' && event.target.value !== '') {
            this.setState({ errorText2: '' });
        } else if ([event.target.name].toString() === 'newIpAddress' && !event.target.value) {
            this.setState({ errorText2: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'productionQuantity' && event.target.value !== '') {
            this.setState({ errorText3: '' });
        } else if ([event.target.name].toString() === 'productionQuantity' && !event.target.value) {
            this.setState({ errorText3: 'This is a required field.' });
        }
    };

    handleCompleteProduction = (event) => {
        this.setState({ openDialog: true });
        event.preventDefault();
    };

    handleSubmit = () => {

        this.setState({
            showProgressLogo: true,
            showProgressLogoDialog: true
        });
    };

    render() {

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const buttonThemeRed = createMuiTheme({
            palette: {
                primary: red
            },
        });

        const formComplete = this.state.productionOrderNo && this.state.newMaterialID && this.state.newIpAddress;

        return (
            <form onSubmit={this.handleStartProduction}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.productionOrderNo}
                                onChange={this.handleChange}
                                type="text"
                                name="productionOrderNo"
                                floatingLabelText="Production Order No."
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                                hintText=""
                                errorText={this.state.errorText0}
                                errorStyle={{ "float": "left" }}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.newMaterialID}
                                onChange={this.handleChange}
                                type="text"
                                name="newMaterialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                                hintText=""
                                errorText={this.state.errorText1}
                                errorStyle={{ "float": "left" }}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.newIpAddress}
                                onChange={this.handleChange}
                                type="text"
                                name="newIpAddress"
                                floatingLabelText="IP Address"
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                                hintText=""
                                errorText={this.state.errorText2}
                                errorStyle={{ "float": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                    fullWidth={true} disabled={!formComplete}>
                                    Complete Production
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{ padding: 24 }}>
                        <Grid container>
                            <Grid container item xs={12}>
                                <Checkbox></Checkbox>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify="center">
                            <Grid container item xs={12}>
                                <Paper style={{ "width": "100%" }}>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                className="App-logo-progress" alt="" />
                                            </div> : ""}
                                    </div>
                                    <div style={{ "overflowX": "auto" }}>
                                        <Grid container justify="center">
                                            <Grid container item xs={12}>
                                                <TextField
                                                    value={this.state.productionOrderNo}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    name="productionQuantity"
                                                    floatingLabelText="Quantity"
                                                    floatingLabelFixed={true}
                                                    style={{ "float": "left" }}
                                                    hintText=""
                                                    errorText={this.state.errorText3}
                                                    errorStyle={{ "float": "left" }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="OK" variant="flat" color="primary" fullWidth={true}
                                        onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                        onClick={this.handleDialogClose}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{ backgroundColor: this.state.snackbar.sbColor }}
                />
            </form>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProductionOrderByProdOrderNo: (url) => dispatch(getProductionOrderByProdOrderNo(url)),
        updateProductionOrderByProdOrderNo: (url, body) => dispatch(updateProductionOrderByProdOrderNo(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProduction);
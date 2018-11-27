import React, { Component } from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { getProductionOrderByProdOrderNo, updateProductionOrderByProdOrderNo } from '../../../redux/actions/production.actions';
import { checkBillOfMaterialsByMaterialID } from "../../../redux/actions/BOM/bill-of-materials.actions";

let data = [];

class CompleteProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            productionOrderNo: '',
            errorTextProductionOrderNo: 'This is a required field.',
            materialID: '',
            errorTextMaterialID: 'This is a required field.',
            ipAddress: '',
            openDialog: false,
            showProgressLogoDialog: false,
            quantity: '',
            errorTextQuantity: 'This is a required field.',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    // validate Material ID
    handleMaterialIDChange = (event) => {
        if (event.target.value) {
            this.props.data.bomReducer.checkedBOMDataByMaterialIDDoesExist = '';
            this.props.data.bomReducer.checkedBOMDataByMaterialIDDoesNotExist = '';
            this.setState({ showProgressLogo: true });
            Promise.resolve(this.props.checkBillOfMaterialsByMaterialID(event.target.value))
                .then(() => {
                    if (this.props.data.bomReducer.checkedBOMDataByMaterialIDDoesExist &&
                        this.props.data.bomReducer.checkedBOMDataByMaterialIDDoesNotExist === '') {
                        this.setState({
                            showProgressLogo: false,
                            materialID: '',
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Material ID already exists!',
                                open: true,
                                sbColor: '#e32c1c'
                            }
                        });
                    } else if (this.props.data.bomReducer.checkedBOMDataByMaterialIDDoesExist === '' &&
                        this.props.data.bomReducer.checkedBOMDataByMaterialIDDoesNotExist) {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Material ID is valid',
                                open: true,
                                sbColor: '#23CE6B'
                            }
                        })
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            materialID: '',
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Unknown Error',
                                open: true,
                                sbColor: '#e32c1c'
                            }
                        });
                    }
                });
            // TODO: handle an edge case saf,l/asgm
            // cannot put / because it understands it as directory
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'productionOrderNo' && event.target.value !== '') {
            this.setState({ errorTextProductionOrderNo: '' });
        } else if ([event.target.name].toString() === 'productionOrderNo' && !event.target.value) {
            this.setState({ errorTextProductionOrderNo: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'materialID' && event.target.value !== '') {
            this.setState({ errorTextMaterialID: '' });
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({ errorTextMaterialID: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'quantity' && event.target.value !== '') {
            this.setState({ errorTextQuantity: '' });
        } else if ([event.target.name].toString() === 'quantity' && !event.target.value) {
            this.setState({ errorTextQuantity: 'This is a required field.' });
        }
    };

    handleCompleteProduction = (event) => {
        event.preventDefault();
        this.props.data.prdReducer.getProductionOrderByProdOrderNoSuccess = '';
        this.setState({
            showProgressLogo: true,
            openDialog: true,
            showProgressLogoDialog: false,
            quantity: ''
        });
        Promise.resolve(this.props.getProductionOrderByProdOrderNo(this.state.productionOrderNo))
            .then(() => {
                if (this.props.data.prdReducer.getProductionOrderByProdOrderNoSuccess) {
                    data = this.props.data.prdReducer.getProductionOrderByProdOrderNoSuccess;
                    this.setState({ showProgressLogo: false });
                } else {
                    data = [];
                    this.setState({ showProgressLogo: false });
                }
            });
    };

    handleDialogClose = () => {
        this.setState({
            showProgressLogo: false,
            openDialog: false,
            showProgressLogoDialog: false
        });
    };

    handleSubmit = () => {
        this.props.data.sarReducer.updateProductionOrderByProdOrderNoSuccess = '';
        this.setState({ showProgressLogoDialog: true });
        let url = this.state.productionOrderNo;
        let body = {
            materialID: this.state.materialID,
            oldMaterialID: data.oldMaterialID,
            ipAddress: this.state.ipAddress,
            oldProdOrders: data.oldProdOrders,
            productionOrderNo: this.state.productionOrderNo,
            receivedOrder: data.receivedOrder,
            completedProductionOrder: '',
            productionQuantity: this.state.quantity
        };
        Promise.resolve(this.props.updateProductionOrderByProdOrderNo(url, body))
            .then(() => {
                if (this.props.data.prdReducer.updateProductionOrderByProdOrderNoSuccess === true) {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Production Completed Successfully!',
                            open: true,
                            sbColor: '#23CE6B'
                        },
                        openDialog: false,
                        productionOrderNo: '',
                        errorTextProductionOrderNo: 'This is a required field.',
                        materialID: '',
                        errorTextMaterialID: 'This is a required field.',
                        ipAddress: '',
                        quantity: ''
                    });
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error Completing Production! Please try again.',
                            open: true,
                            sbColor: 'red'
                        }
                    })
                }
            });
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

        const formComplete = this.state.productionOrderNo && this.state.materialID;

        return (
            <form>
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
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                                errorText={this.state.errorTextProductionOrderNo}
                                errorStyle={{ "float": "left", "textAlign": "left" }}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                onBlur={this.handleMaterialIDChange}
                                type="text"
                                name="materialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                                errorText={this.state.errorTextMaterialID}
                                errorStyle={{ "float": "left", "textAlign": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="completeProduction" variant="contained" color="primary"
                                    fullWidth={true} onClick={this.handleCompleteProduction}
                                    disabled={!formComplete}>
                                    Complete Production
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose} autoScrollBodyContent={true}>
                    <div style={{ padding: 24 }}>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <div>
                                    {this.state.showProgressLogoDialog ?
                                        <div className="overlay"><img src={blocnetsLogo}
                                            className="App-logo-progress" alt="" />
                                        </div> : ""}
                                </div>
                            </Grid>
                        </Grid>
                        Are you sure you want to complete production?
                        <br />< br />
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Yes" variant="flat" color="primary" fullWidth={true}
                                        onClick={this.handleSubmit}>
                                        Yes
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}></Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="No" variant="flat" color="primary" fullWidth={true}
                                        onClick={this.handleDialogClose}>
                                        No
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
        updateProductionOrderByProdOrderNo: (url, body) => dispatch(updateProductionOrderByProdOrderNo(url, body)),
        checkBillOfMaterialsByMaterialID: (url) => dispatch(checkBillOfMaterialsByMaterialID(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProduction);
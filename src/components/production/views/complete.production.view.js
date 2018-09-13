import React, {Component} from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Fade from "@material-ui/core/Fade/Fade";
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import {
    getProductionOrderByProdOrderNo,
    updateProductionOrderByProdOrderNo
}
    from '../../../redux/actions/production.actions';

let data = [];

class CompleteProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            productionOrderNo: '',
            errorText1: 'This is a required field.',
            materialID: '',
            errorText2: 'This is a required field.',
            ipAddress: '',
            errorText3: 'This is a required field.',
            productionCompleted: false,
            quantity: '',
            errorText4: 'This is a required field.',
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

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if ([event.target.name].toString() === 'productionOrderNo' && event.target.value !== '') {
            this.setState({errorText1: ''});
        } else if ([event.target.name].toString() === 'productionOrderNo' && !event.target.value) {
            this.setState({errorText1: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'materialID' && event.target.value !== '') {
            this.setState({errorText2: ''});
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({errorText2: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'ipAddress' && event.target.value !== '') {
            this.setState({errorText3: ''});
        } else if ([event.target.name].toString() === 'ipAddress' && !event.target.value) {
            this.setState({errorText3: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'quantity' && event.target.value !== '') {
            this.setState({errorText4: ''});
        } else if ([event.target.name].toString() === 'quantity' && !event.target.value) {
            this.setState({errorText4: 'This is a required field.'});
        }
    };

    handleCheckboxChange = (event) => {
        this.setState({[event.target.name]: event.target.checked});
        if ([event.target.name].toString() === 'productionCompleted' && event.target.checked === true) {
            this.setState({productionCompleted: true});
        } else if ([event.target.name].toString() === 'productionCompleted' && event.target.checked === false) {
            this.setState({productionCompleted: false});
        }
    };

    handleCompleteProduction = (event) => {
        this.props.data.prdReducer.getProductionOrderByProdOrderNoSuccess = '';
        this.setState({
            showProgressLogo: true,
            openDialog: true,
            showProgressLogoDialog: false,
            productionCompleted: false,
            quantity: '',
        });
        this.props.getProductionOrderByProdOrderNo(this.state.productionOrderNo);
        setTimeout(
            function () {
                if (this.props.data.prdReducer.getProductionOrderByProdOrderNoSuccess) {
                    data = this.props.data.prdReducer.getProductionOrderByProdOrderNoSuccess;
                    this.setState({showProgressLogo: false});
                } else {
                    data = [];
                    this.setState({showProgressLogo: false});
                }
            }
                .bind(this),
            1000);
        event.preventDefault();
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
        this.setState({showProgressLogoDialog: true});
        let url = this.state.productionOrderNo;
        let body = {
            materialID: this.state.materialID,
            oldMaterialID: data.oldMaterialID,
            ipAddress: this.state.ipAddress,
            oldProdOrders: data.oldProdOrders,
            productionOrderNo: this.state.productionOrderNo,
            receivedOrder: data.receivedOrder,
            completedProductionOrder: this.state.productionCompleted,
            productionQuantity: this.state.quantity
        };
        this.props.updateProductionOrderByProdOrderNo(url, body);
        setTimeout(
            function () {
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
                        errorText1: 'This is a required field.',
                        materialID: '',
                        errorText2: 'This is a required field.',
                        ipAddress: '',
                        errorText3: 'This is a required field.',
                        productionCompleted: false,
                        quantity: '',
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
            }
                .bind(this),
            3000
        );
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

        const formComplete = this.state.productionOrderNo && this.state.materialID && this.state.ipAddress;

        const productionComplete = this.state.productionCompleted === true ||
            (this.state.productionCompleted === false && this.state.quantity);

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt=""/>
                        </div> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.productionOrderNo}
                                onChange={this.handleChange}
                                type="text"
                                name="productionOrderNo"
                                floatingLabelText="Production Order No."
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                errorText={this.state.errorText1}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                type="text"
                                name="materialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                errorText={this.state.errorText2}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.ipAddress}
                                onChange={this.handleChange}
                                type="text"
                                name="ipAddress"
                                floatingLabelText="IP Address"
                                floatingLabelFixed={true}
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                errorText={this.state.errorText3}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                    </Grid>
                    <br/><br/>
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
                    <div style={{padding: 24}}>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <div>
                                    {this.state.showProgressLogoDialog ?
                                        <div className="overlay"><img src={blocnetsLogo}
                                                                      className="App-logo-progress" alt=""/>
                                        </div> : ""}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={this.handleCheckboxChange}
                                                name="productionCompleted"
                                                color="default"
                                                checked={this.state.productionCompleted}
                                            />
                                        }
                                        label="Production Completed"
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Fade in={this.state.productionCompleted === false}>
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <TextField
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        type="text"
                                        name="quantity"
                                        floatingLabelText="Quantity"
                                        floatingLabelFixed={true}
                                        style={{"float": "left", "textAlign": "left"}}
                                        hintText=""
                                        errorText={this.state.errorText4}
                                        errorStyle={{"float": "left", "textAlign": "left"}}
                                    />
                                </Grid>
                            </Grid>
                        </Fade>
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmit} disabled={!productionComplete}>
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
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
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
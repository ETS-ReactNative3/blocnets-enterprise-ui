import React, { Component } from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Snackbar from 'material-ui/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import {
    createProductionOrderByProdOrderNo
}
    from '../../../redux/actions/production.actions';
import {
    getShippingDataByMaterialID,
    updateShippingDataByMaterialID,
    updateShippingDataByShipmentID
}
    from '../../../redux/actions/shipping.and.receiving.actions';


const addCircleIconStyle = {
    color: "black",
    transform: "scale(1.8)"
}

const deleteIconStyle = {
    color: "black",
    transform: "scale(1.6)"
}

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return { id: counter, info1, info2 };
}

class StartProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorText: 'This is a required field.',
            errorText1: 'This is a required field.',
            productionOrderNo: '',
            initialMaterialID: '',
            materialID: [],
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

    handleText = i => e => {
        let materialID = [...this.state.materialID]
        materialID[i] = e.target.value
        this.setState({
            materialID
        })
    };

    handleDeletion = i => e => {
        e.preventDefault()
        let materialID = [
            ...this.state.materialID.slice(0, i),
            ...this.state.materialID.slice(i + 1)
        ]
        this.setState({
            materialID
        })
    };

    handleAddition = e => {
        e.preventDefault()
        let materialID = this.state.materialID.concat(['']);
        this.setState({
            materialID
        })
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'productionOrderNo' && event.target.value !== '') {
            this.setState({ errorText: '' });
        } else if ([event.target.name].toString() === 'productionOrderNo' && !event.target.value) {
            this.setState({ errorText: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'initialMaterialID' && event.target.value !== '') {
            this.setState({ errorText1: '' });
        } else if ([event.target.name].toString() === 'initialMaterialID' && !event.target.value) {
            this.setState({ errorText1: 'This is a required field.' });
        }
    };

    handleStartProduction = (event) => {
        this.setState({ openDialog: true });
        event.preventDefault();
    };

    handleSubmit = () => {
        this.setState({
            showProgressLogo: true,
            showProgressLogoDialog: true
        });
        let data = {
            materialID: '',
            oldMaterialID: [
                {
                    materialID: this.state.initialMaterialID,
                    parent: this.state.productionOrderNo,
                    children: []
                }
            ],
            ipAddress: '',
            oldProdOrders: [],
            productionOrderNo: this.state.productionOrderNo,
            receivedOrder: true,
            completedProductionOrder: false,
            productionQuantity: ''
        }

        // Foreach Material ID in this state, get it's shipping data
        /*  this.state.materialID.forEach(
             element => this.props.getShippingDataByMaterialID(element))
             .then(() => {
                 // this.props.getShippingDataByMaterialID
                 // then update each of it's data field of 'receivedOrder' to true.
                 return this.props.data.sarReducer.getShippingDataByMaterialIDSuccess;
             }); */

        for (let i = 0; i < this.state.materialID.length; i++) {
            if (this.state.materialID[i]) {
                let obj = {
                    materialID: this.state.materialID[i],
                    parent: this.state.productionOrderNo,
                    children: []
                }
                data.oldMaterialID.push(obj);
            }
        };

        this.props.createProductionOrderByProdOrderNo(this.state.productionOrderNo, data);

        setTimeout(
            function () {
                if (this.props.data.prdReducer.createProductionOrderByProdOrderNoSuccess) {
                    this.setState({
                        errorText: 'This is a required field.',
                        errorText1: 'This is a required field.',
                        productionOrderNo: '',
                        initialMaterialID: '',
                        materialID: [],
                        showProgressLogo: false,
                        openDialog: false,
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Started Production!',
                            open: true,
                            sbColor: '#23CE6B'
                        }
                    });
                } else if (this.props.data.prdReducer.createProductionOrderByProdOrderNoError) {
                    this.setState({
                        showProgressLogo: false,
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Production Error! Please try again.',
                            open: true,
                            sbColor: 'red'
                        }
                    })
                }
            }
                .bind(this),
            3000
        );
    }

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

        const formComplete = this.state.productionOrderNo && this.state.initialMaterialID;
        const rows = [
            createData('Production Order No.', this.state.productionOrderNo),
            createData('Material ID', this.state.initialMaterialID + ',' + this.state.materialID),
        ];

        return (
            <form onSubmit={this.handleStartProduction}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                value={this.state.productionOrderNo}
                                onChange={this.handleChange}
                                type="text"
                                name="productionOrderNo"
                                floatingLabelText="Production Order No."
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                                hintText=""
                                errorText={this.state.errorText}
                                errorStyle={{ "float": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                onChange={this.handleChange}
                                value={this.state.initialMaterialID}
                                type="text"
                                name="initialMaterialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                                hintText=""
                                errorText={this.state.errorText1}
                                errorStyle={{ "float": "left" }}
                            />
                            <IconButton onClick={this.handleAddition}>
                                <AddCircleIcon style={addCircleIconStyle} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {this.state.materialID.map((materialID, index) => (
                        <span key={index}>
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <TextField
                                        type="text"
                                        name="materialID"
                                        onChange={this.handleText(index)}
                                        value={materialID}
                                    />
                                    <IconButton onClick={this.handleDeletion(index)}>
                                        <DeleteIcon style={deleteIconStyle} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </span>
                    ))}
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                    fullWidth={true} disabled={!formComplete}>
                                    Start Production
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{ padding: 24 }}>
                        <Grid container>
                            <Grid container item xs={12}>
                                Please confirm information.
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
                                        <Table>
                                            <TableBody>
                                                {rows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>{row.info1}</TableCell>
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProductionOrderByProdOrderNo: (url, body) => dispatch(createProductionOrderByProdOrderNo(url, body)),
        getShippingDataByMaterialID: (url) => dispatch(getShippingDataByMaterialID(url)),
        updateShippingDataByMaterialID: (url, body) => dispatch(updateShippingDataByMaterialID(url, body)),
        updateShippingDataByShipmentID: (url, body) => dispatch(updateShippingDataByShipmentID(url, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartProduction);
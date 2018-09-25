import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import {
    getAndUpdateSARListByMaterialID
}
    from '../../../redux/actions/shipping.and.receiving.actions';
import {
    createProductionOrderByProdOrderNo
}
    from '../../../redux/actions/production.actions';

const addCircleIconStyle = {
    color: 'black',
    transform: 'scale(1.8)'
};

const deleteIconStyle = {
    color: 'black',
    transform: 'scale(1.6)'
};

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return {id: counter, info1, info2};
}

class StartProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productionOrderNo: '',
            errorTextProductionOrderNo: 'This is a required field.',
            initialMaterialID: '',
            errorTextMaterialID: 'This is a required field.',
            materialID: [],
            openDialog: false,
            showProgressLogoDialog: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if ([event.target.name].toString() === 'productionOrderNo' && event.target.value !== '') {
            this.setState({errorTextProductionOrderNo: ''});
        } else if ([event.target.name].toString() === 'productionOrderNo' && !event.target.value) {
            this.setState({errorTextProductionOrderNo: 'This is a required field.'});
        }
        if ([event.target.name].toString() === 'initialMaterialID' && event.target.value !== '') {
            this.setState({errorTextMaterialID: ''});
        } else if ([event.target.name].toString() === 'initialMaterialID' && !event.target.value) {
            this.setState({errorTextMaterialID: 'This is a required field.'});
        }
    };

    handleAddition = () => {
        let materialID = this.state.materialID.concat(['']);
        this.setState({
            materialID
        })
    };

    handleDeletion = (index) => (event) => {
        let materialID = [
            ...this.state.materialID.slice(0, index),
            ...this.state.materialID.slice(index + 1)
        ];
        this.setState({
            materialID
        })
    };

    handleText = (index) => (event) => {
        let materialID = [...this.state.materialID];
        materialID[index] = event.target.value;
        this.setState({
            materialID
        })
    };

    handleStartProduction = (event) => {
        event.preventDefault();
        this.setState({openDialog: true});
    };

    handleDialogClose = () => {
        this.setState({
            openDialog: false,
            showProgressLogoDialog: false
        });
    };

    handleSubmit = () => {
        this.setState({
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
        };
        let tmp = [];
        /**
         * For each Material ID in this state,
         * get it's shipping data and update "receivedOrder" flags
         * and the new Production Order No.
         */
        if (data.oldMaterialID[0].materialID) {
            tmp.push(data.oldMaterialID[0].materialID);
            this.state.materialID.forEach(element => tmp.push(element));
            if (tmp) {
                Promise.resolve(this.props.getAndUpdateSARListByMaterialID(tmp, this.state.productionOrderNo));
            }
        }
        for (let i = 0; i < this.state.materialID.length; i++) {
            if (this.state.materialID[i]) {
                let obj = {
                    materialID: this.state.materialID[i],
                    parent: this.state.productionOrderNo,
                    children: []
                };
                data.oldMaterialID.push(obj);
            }
        }
        Promise.resolve(this.props.createProductionOrderByProdOrderNo(this.state.productionOrderNo, data))
            .then(() => {
                if (this.props.data.prdReducer.createProductionOrderByProdOrderNoSuccess) {
                    this.setState({
                        productionOrderNo: '',
                        errorTextProductionOrderNo: 'This is a required field.',
                        initialMaterialID: '',
                        errorTextMaterialID: 'This is a required field.',
                        materialID: [],
                        openDialog: false,
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Production Started Successfully!',
                            open: true,
                            sbColor: '#23CE6B'
                        }
                    });
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error Starting Production! Please try again.',
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

        const formComplete = this.state.productionOrderNo && this.state.initialMaterialID;

        const rows = [
            createData('Production Order No.', this.state.productionOrderNo),
            createData('Material ID', this.state.initialMaterialID + ',' + this.state.materialID),
        ];

        return (
            <form>
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
                                style={{"float": "left"}}
                                hintText=""
                                errorText={this.state.errorTextProductionOrderNo}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                onChange={this.handleChange}
                                value={this.state.initialMaterialID}
                                type="text"
                                name="initialMaterialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{"float": "left"}}
                                hintText=""
                                errorText={this.state.errorTextMaterialID}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <IconButton onClick={this.handleAddition}>
                                <AddCircleIcon style={addCircleIconStyle}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <br/>
                    {this.state.materialID.map((materialID, index) => (
                        <span key={index}>
                            <Grid container spacing={24}>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type="text"
                                        name="materialID"
                                        onChange={this.handleText(index)}
                                        value={materialID}
                                    />
                                </Grid>
                                <Grid container item xs={6} sm={3}>
                                    <IconButton onClick={this.handleDeletion(index)}>
                                        <DeleteIcon style={deleteIconStyle}/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </span>
                    ))}
                    <br/><br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!formComplete} onClick={this.handleStartProduction}>
                                    Start Production
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}
                        autoScrollBodyContent={true}>
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
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                                          className="App-logo-progress" alt=""/>
                                            </div> : ""}
                                    </div>
                                    <div style={{"overflowX": "auto"}}>
                                        <Table style={{"tableLayout": "fixed"}}>
                                            <TableBody style={{"overflowWrap": "break-word"}}>
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
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                            </Grid>
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
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
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
        getAndUpdateSARListByMaterialID: (array, key) => dispatch(getAndUpdateSARListByMaterialID(array, key)),
        createProductionOrderByProdOrderNo: (url, body) => dispatch(createProductionOrderByProdOrderNo(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartProduction);


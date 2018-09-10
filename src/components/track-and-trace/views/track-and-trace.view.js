import React, { Component } from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from 'material-ui/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from "@material-ui/core/Switch/Switch";
import Fade from "@material-ui/core/Fade/Fade";
import Tree from 'react-d3-tree';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { getShippingDataByMaterialID } from '../../../redux/actions/shipping.and.receiving.actions';
import { createConstruct } from '../../../redux/actions/tree.spawn.action';

let data = [];
let tree = [];

let dataManualShipping = 'NO';
let dataShipmentSent = 'NO';
let dataShipmentCompleted = 'NO';
let dataShipped = 'NO';
let dataReceivedShipent = 'NO';
let dataReceivedOrder = 'NO';

let rows = [];

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return { id: counter, info1, info2 };
}

class TrackAndTraceView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            shipmentID: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            ipAddress: '',
            manuallyShipped: '',
            deliveryOrderNo: '',
            shipmentQuantity: '',
            shipmentSent: '',
            shipmentCompleted: '',
            shipped: true,
            receivedShipment: '',
            receivedOrder: '',
            prdKey: '',
            tree: '',
            openDialog: false,
            showMaterialMap: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'showMaterialMapSwitch' && event.target.checked === true) {
            this.setState({ showMaterialMap: true });
        } else if ([event.target.name].toString() === 'showMaterialMapSwitch' && event.target.checked === false) {
            this.setState({ showMaterialMap: false });
        }
    };

    handleTrack = (event) => {
        tree = []; // Clean Tree
        this.props.data.sarReducer.getShippingDataByMaterialIDSuccess = '';
        this.setState({ showProgressLogo: true });
        this.props.getShippingDataByMaterialID(this.state.materialID);
        this.props.createConstruct(this.state.materialID);
        setTimeout(
            function () {
                if (this.props.data.sarReducer.getShippingDataByMaterialIDSuccess) {
                    data = this.props.data.sarReducer.getShippingDataByMaterialIDSuccess;
                    tree.push(this.props.data.spawnConstructReducer.construct);
                    if (data.manuallyShipped === true) {
                        dataManualShipping = 'YES'
                    }
                    if (data.shipmentSent === true) {
                        dataShipmentSent = 'YES'
                    }
                    if (data.shipmentCompleted === true) {
                        dataShipmentCompleted = 'YES'
                    }
                    if (data.shipped === true) {
                        dataShipped = 'YES'
                    }
                    if (data.receivedShipment === true) {
                        dataReceivedShipent = 'YES'
                    }
                    if (data.receivedOrder === true) {
                        dataReceivedOrder = 'YES'
                    }
                    rows = [
                        createData('Material ID', this.state.materialID),
                        createData('Shipment ID', data.shipmentID),
                        createData('Address', data.address1 + ' ' + data.address2 + ' ' + data.city + ' ' + data.state + ' ' + data.country + ' ' + data.postalCode),
                        createData('IP Address', data.ipAddress),
                        createData('Manual Shipping', dataManualShipping),
                        createData('Delivery Order No.', data.deliverOrderNo),
                        createData('Shipment Quantity', data.shipmentQuantity),
                        createData('Shipment Sent', dataShipmentSent),
                        createData('Shipment Completed', dataShipmentCompleted),
                        createData('Shipped', dataShipped),
                        createData('Received Shipment', dataReceivedShipent),
                        createData('Received Shipment', dataReceivedOrder),
                    ];
                    this.setState({
                        showProgressLogo: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Successfully tracked a block!',
                            open: true,
                            sbColor: '#23CE6B'
                        },
                        openDialog: true,
                        tree: tree
                    });
                } else {
                    this.setState({
                        showProgressLogo: false,
                        snackbar: {
                            open: true,
                            message: 'Error tracking a block!',
                            autoHideDuration: 2000,
                            sbColor: 'red'
                        },
                        openDialog: false
                    });
                }
            }
                .bind(this),
            1000);
        event.preventDefault();
    };

    handleDialogClose = () => {
        this.setState({
            showProgressLogo: false,
            openDialog: false
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
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                type="text"
                                name="materialID"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Track" variant="contained" color="primary"
                                    fullWidth={true} onClick={this.handleTrack}
                                    disabled={!this.state.materialID}>
                                    Track
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}
                    title="Block Information" autoScrollBodyContent={true}>
                    <div style={{ padding: 24 }}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <i className="material-icons" style={{ "cursor": "pointer" }}
                                    onClick={this.handleDialogClose}>close</i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <Paper style={{ "width": "100%" }}>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                className="App-logo-progress" alt="" />
                                            </div> : ""}
                                    </div>
                                    <div style={{ "overflowX": "auto" }}>
                                        <Table style={{ "tableLayout": "fixed" }}>
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
                        <Grid container>
                            <Grid item>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Switch
                                        onChange={this.handleChange}
                                        name="showMaterialMapSwitch"
                                    />
                                    Show Material Map
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                        <br />
                        <Fade in={this.state.showMaterialMap}>
                            <Grid container>
                                <Grid item>
                                    <Tree data={this.state.tree} orientation={'horizontal'}/>
                                </Grid>
                            </Grid>
                        </Fade>
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
        data: state,
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getShippingDataByMaterialID: (url) => dispatch(getShippingDataByMaterialID(url)),
        createConstruct: (materialID) => dispatch(createConstruct(materialID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackAndTraceView);
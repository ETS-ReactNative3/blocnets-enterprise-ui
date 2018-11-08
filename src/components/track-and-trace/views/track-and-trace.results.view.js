import React, { Component } from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Paper from 'material-ui/Paper';
import Switch from '@material-ui/core/Switch/Switch';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from 'material-ui/Snackbar';
import HistoryIcon from '@material-ui/icons/History';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import TrackAndTraceTreeView from './track-and-trace.tree.view';

let SARcounter = 0;

class TrackAndTraceResultsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMaterialMap: false,
            showMaterialMapSwitch: false,
            showProgressLogo: false,
            showShipmentHistory: {
                open: false,
                shipmentID: ''
            },
            SARrowsPerPage: 10,
            SARpage: 0,
            SARHistory: [],
            tree: this.props.tree,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    };

    createSARTableContent = (id) => {
        let tableContent = [];
        let createSARData = (info1, info2) => {
            SARcounter += 1;
            return { id: SARcounter, info1, info2 };
        };
        if (id === 'Material ID') {
            if (this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess &&
                this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess.length >= 0) {
                for (let i = 0; i < this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess.length; i++) {
                    if (this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess[i] !== 'string') {
                        let tmp = this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess[i];
                        tableContent.push(
                            createSARData('Material ID', tmp.materialID),
                            createSARData('Shipment ID', tmp.shipmentID),
                            createSARData('Planned Ship Date', tmp.plannedShipDate),
                            createSARData('Actual Ship Date', tmp.actualShipDate),
                            createSARData('Address', tmp.address1),
                            createSARData('IP Address', tmp.ipAddress),
                            createSARData('Manual Shipping', tmp.manuallyShipped === true ? 'YES' : 'NO'),
                            createSARData('Shipment Completed', tmp.shipmentCompleted === true ? 'YES' : 'NO'),
                            createSARData('Shipment Quantity', tmp.shipmentQuantity),
                            createSARData('Shipment Sent', tmp.shipmentSent === true ? 'YES' : 'NO'),
                            createSARData('Received Shipment', tmp.receivedShipment === true ? 'YES' : 'NO'),
                            createSARData('Received Order', tmp.receivedOrder === true ? 'YES' : 'NO'),
                            createSARData('Delivery Order No.', tmp.deliverOrderNo),
                            createSARData('Production Order No.', tmp.prdKey),
                            createSARData('Device UUID', tmp.deviceUUID)
                        );
                    }
                }
            }
        } else if (id === 'Shipment ID') {
            if (this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess &&
                this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess.length >= 0) {
                for (let i = 0; i < this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess.length; i++) {
                    if (this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess[i] !== 'string') {
                        let tmp = this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess[i];
                        tableContent.push(
                            createSARData('Material ID', tmp.materialID),
                            createSARData('Shipment ID', tmp.shipmentID),
                            createSARData('List of Materials / Quantity', ''));
                        if (tmp.listOfKeys) {
                            for (let j = 0; j < tmp.listOfKeys.length; j++) {
                                if (tmp.listOfKeys[j].materialID && tmp.listOfKeys[j].quantity) {
                                    tableContent.push(
                                        createSARData('Material ID: ' + tmp.listOfKeys[j].materialID, 'Quantity: ' + tmp.listOfKeys[j].quantity)
                                    );
                                } else {
                                    tableContent.push(
                                        createSARData('No Material ID for this record.', 'No Quantity for this Material ID record.')
                                    );
                                }
                            }
                        }
                        tableContent.push(
                            createSARData('Planned Ship Date', tmp.plannedShipDate),
                            createSARData('Actual Ship Date', tmp.actualShipDate),
                            createSARData('Address', tmp.address1),
                            createSARData('IP Address', tmp.ipAddress),
                            createSARData('Manual Shipping', tmp.manuallyShipped === true ? 'YES' : 'NO'),
                            createSARData('Shipment Completed', tmp.shipmentCompleted === true ? 'YES' : 'NO'),
                            createSARData('Shipment Quantity', tmp.shipmentQuantity),
                            createSARData('Shipment Sent', tmp.shipmentSent === true ? 'YES' : 'NO'),
                            createSARData('Received Shipment', tmp.receivedShipment === true ? 'YES' : 'NO'),
                            createSARData('Received Order', tmp.receivedOrder === true ? 'YES' : 'NO'),
                            createSARData('Delivery Order No.', tmp.deliverOrderNo),
                            createSARData('Production Order No.', tmp.prdKey),
                            createSARData('Device UUID', tmp.deviceUUID)
                        );
                    }
                }
            }
        }
        return tableContent;
    };

    handleChange = (event) => {
        if ([event.target.name].toString() === 'showMaterialMapSwitch' && event.target.checked === true) {
            this.setState({
                showMaterialMap: true,
                showMaterialMapSwitch: true
            });
        } else if ([event.target.name].toString() === 'showMaterialMapSwitch' && event.target.checked === false) {
            this.setState({
                showMaterialMap: false,
                showMaterialMapSwitch: false
            });
        }
    };

    handleTreeClose = () => {
        this.setState({
            showMaterialMap: false,
            showMaterialMapSwitch: false
        });
    };

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        });
    };

    handleEditMasterData = () => {
        let masterMaterialData = this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByMaterialNameSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByMaterialDescSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByPartNumberSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByPartNameSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByPartDescSuccess;
        this.props.viewHandler(masterMaterialData);
    };

    handleShipmentHistoryClose = () => {
        this.setState({
            showShipmentHistory: {
                open: false
            }
        })
    };

    handleChangeRowsPerPage = event => {
        this.setState({
            SARrowsPerPage: event.target.value
        });
    };

    handleChangePage = (event, page) => {
        this.setState({
            SARPage: page
        });
    };

    showShipmentHistory = (event, id) => {
        this.setState({ showProgressLogo: true });
        if (this.props.blockInformation === 'Shipping Information') {
            this.setState({
                showProgressLogo: false,
                showShipmentHistory: {
                    open: true,
                    shipmentID: this.props.tatData[1].info2,  // GET Shipment ID from Prop
                },
                SARHistory: this.createSARTableContent(id)
            })
        } else {
            this.setState({
                showProgressLogo: false,
                showShipmentHistory: {
                    open: true,
                    shipmentID: this.props.shippingData[1].info2,  // GET Shipment ID from Prop
                },
                SARHistory: this.createSARTableContent(id)
            })
        }
    };

    render() {

        const { SARHistory } = this.state;

        const buttonThemeRed = createMuiTheme({
            palette: {
                primary: red
            },
        });

        return (
            <form>
                <div>
                    <div>
                        {this.state.showProgressLogo ?
                            <div className='overlay'><img src={blocnetsLogo} className='App-logo-progress' alt='' />
                            </div> : ''}
                    </div>
                    <div style={{ padding: 24 }}>
                        <Grid container>
                            <Grid container item xs={12}>
                                {this.props.blockInformation}
                                {this.props.blockInformation === 'Master Material Data' ?
                                    <EditIcon
                                        onClick={this.handleEditMasterData}
                                        style={{
                                            'cursor': 'pointer',
                                            'marginTop': '-5px',
                                            'paddingLeft': '10px'
                                        }}
                                    />
                                    :
                                    ''
                                }
                            </Grid>
                        </Grid>
                        <br />
                        {this.props.tatData.length !== 0 ?
                            <Grid container justify="center">
                                <Grid container item xs={12}>
                                    <Paper style={{ "width": "100%" }}>
                                        <div style={{ "overflowX": "auto" }}>
                                            <Table style={{ "tableLayout": "fixed" }}>
                                                <TableBody style={{ "overflowWrap": "break-word" }}>
                                                    {this.props.tatData.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                <TableCell>{row.info1}{(this.props.blockInformation === 'Shipping Information' && row.info1 === 'Material ID' && this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess)
                                                                || (row.info1 === 'Shipment ID' && this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess) ?
                                                                    <Tooltip title='Show History'>
                                                                        <IconButton
                                                                            onClick={event => this.showShipmentHistory(event, row.info1)}>
                                                                            <HistoryIcon />
                                                                        </IconButton>
                                                                    </Tooltip> : ''}
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
                            </Grid> :
                            <Grid container justify="center">
                                <Grid container item xs={12}>
                                    <Paper style={{ "width": "100%", "height": "50vh" }}>
                                        <div style={{ "overflowX": "auto" }}>
                                            <Typography align="left">
                                            </Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        }
                        <br />
                        {this.props.tree.length !== 0 ?
                            <Grid container>
                                <Grid item>
                                    <MuiThemeProvider theme={buttonThemeRed}>
                                        <Switch
                                            onChange={this.handleChange}
                                            name="showMaterialMapSwitch"
                                            checked={this.state.showMaterialMapSwitch}
                                        />
                                        Show Material Map
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid> :
                            ''
                        }
                        <br />
                        {this.props.shippingData.length !== 0 ?
                            <Grid container>
                                <Grid container item xs={12}>
                                    Shipping Information
                                </Grid>
                            </Grid> :
                            ''
                        }
                        <br />
                        {this.props.shippingData.length !== 0 ?
                            <Grid container justify="center">
                                <Grid container item xs={12}>
                                    <Paper style={{ "width": "100%" }}>
                                        <div style={{ "overflowX": "auto" }}>
                                            <Table style={{ "tableLayout": "fixed" }}>
                                                <TableBody style={{ "overflowWrap": "break-word" }}>
                                                    {this.props.shippingData.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                <TableCell>{row.info1}{(row.info1 === 'Material ID' && this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess)
                                                                || (row.info1 === 'Shipment ID' && this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess) ?
                                                                    <Tooltip title='Show History'>
                                                                        <IconButton
                                                                            onClick={event => this.showShipmentHistory(event, row.info1)}>
                                                                            <HistoryIcon />
                                                                        </IconButton>
                                                                    </Tooltip> : ''}
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
                            </Grid> :
                            ''
                        }
                        <br />
                        <Dialog fullScreen open={this.state.showMaterialMap} onClose={this.handleTreeClose}>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <i className="material-icons" style={{ "cursor": "pointer" }}
                                       onClick={this.handleTreeClose}>close</i>
                                </Grid>
                            </Grid>
                            <br />
                            <div>
                                <TrackAndTraceTreeView data={this.state} />
                            </div>
                        </Dialog>
                        <Dialog open={this.state.showShipmentHistory.open} onClose={this.handleShipmentHistoryClose}
                                autoScrollBodyContent={true}>
                            <div style={{ padding: 24 }}>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <i className="material-icons" style={{ "cursor": "pointer" }}
                                           onClick={this.handleShipmentHistoryClose}>close</i>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid container item xs={12}>
                                        Shipment History
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container justify="center">
                                    <Grid container item xs={12}>
                                        <Paper style={{ "width": "100%" }}>
                                            <div style={{ "overflowX": "auto" }}>
                                                <Table style={{ "tableLayout": "fixed" }}>
                                                    <TableBody style={{ "overflowWrap": "break-word" }}>
                                                        {SARHistory
                                                            .map(row => {
                                                                return (
                                                                    <TableRow key={row.id}>
                                                                        {
                                                                            row.info1 === 'Material ID' ?
                                                                                <TableCell style={{
                                                                                    "background-color": "black",
                                                                                    "color": "white"
                                                                                }}>{row.info1}</TableCell>
                                                                                :
                                                                                <TableCell>{row.info1}</TableCell>
                                                                        }
                                                                        {
                                                                            row.info1 === 'Material ID' ?
                                                                                <TableCell style={{
                                                                                    "background-color": "black",
                                                                                    "color": "white"
                                                                                }}>{row.info2}</TableCell>
                                                                                :
                                                                                <TableCell>{row.info2}</TableCell>
                                                                        }
                                                                    </TableRow>

                                                                );
                                                            })}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                        </Dialog>
                    </div>
                    <Snackbar
                        open={this.props.snackbar.open}
                        message={this.props.snackbar.message}
                        autoHideDuration={this.props.snackbar.autoHideDuration}
                        onRequestClose={this.handleSnackbarClose}
                        bodyStyle={{ backgroundColor: this.props.snackbar.sbColor }}
                    />
                    <Snackbar
                        open={this.state.snackbar.open}
                        message={this.state.snackbar.message}
                        autoHideDuration={this.state.snackbar.autoHideDuration}
                        onRequestClose={this.handleSnackbarClose}
                        bodyStyle={{ backgroundColor: this.state.snackbar.sbColor }}
                    />
                </div>
            </form>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        data: state,
    };
};

export default connect(mapStateToProps)(TrackAndTraceResultsView);
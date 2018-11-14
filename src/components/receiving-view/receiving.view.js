import React, { Component } from 'react';
import blocnetsLogo from '../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import DomainIcon from '@material-ui/icons/Domain';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';
import {
    getShippingDataByMaterialID,
    getShippingDataByShipmentID,
    updateShippingDataByMaterialID,
    updateShippingDataByShipmentID
} from '../../redux/actions/shipping.and.receiving.actions';

let dataByMaterialID = [];
let dataByShipmentID = [];

let dataByMaterialIDManuallyShipped = 'NO';
let dataByShipmentIDManuallyShipped = 'NO';

let materialIDRows = [];
let shipmentIDRows = [];

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return { id: counter, info1, info2 };
}

class ReceivingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            materialIDInformed: false,
            shipmentID: '',
            shipmentIDInformed: false,
            openMaterialIDDialog: false,
            openShipmentIDDialog: false,
            showProgressLogoDialog: false,
            receivedShipment: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            }
        };
    }

    handleIDChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'materialID' && event.target.value !== '') {
            this.setState({ materialIDInformed: true });
        } else if ([event.target.name].toString() === 'materialID' && event.target.value === '') {
            this.setState({ materialIDInformed: false });
        }
        if ([event.target.name].toString() === 'shipmentID' && event.target.value !== '') {
            this.setState({ shipmentIDInformed: true });
        } else if ([event.target.name].toString() === 'shipmentID' && event.target.value === '') {
            this.setState({ shipmentIDInformed: false });
        }
    };

    handleRetrieveShipment = (event) => {
        event.preventDefault();
        this.props.data.sarReducer.getShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.getShippingDataByShipmentIDSuccess = '';
        this.setState({
            showProgressLogo: true,
            openMaterialIDDialog: false,
            openShipmentIDDialog: false,
            showProgressLogoDialog: false
        });
        if (this.state.shipmentIDInformed === false) {
            let url = this.state.materialID;
            Promise.resolve(this.props.getShippingDataByMaterialID(url))
                .then(() => {
                    if (this.props.data.sarReducer.getShippingDataByMaterialIDSuccess) {
                        dataByMaterialID = this.props.data.sarReducer.getShippingDataByMaterialIDSuccess;
                        if (dataByMaterialID.manuallyShipped === true) {
                            dataByMaterialIDManuallyShipped = 'YES'
                        }
                        materialIDRows = [
                            createData('Material ID', this.state.materialID),
                            createData('Shipment ID', dataByMaterialID.shipmentID),
                            createData('Planned Ship Date', dataByMaterialID.plannedShipDate),
                            createData('Actual Ship Date', dataByMaterialID.actualShipDate),
                            createData('Address', dataByMaterialID.address1),
                            createData('Manual Shipping', dataByMaterialIDManuallyShipped)
                        ];
                        this.setState({
                            showProgressLogo: false,
                            openMaterialIDDialog: true,
                            receivedShipment: dataByMaterialID.receivedShipment
                        });
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            openMaterialIDDialog: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'No shipping information!',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            }
                        })
                    }
                });
        } else if (this.state.materialIDInformed === false) {
            let url = this.state.shipmentID;
            Promise.resolve(this.props.getShippingDataByShipmentID(url))
                .then(() => {
                    if (this.props.data.sarReducer.getShippingDataByShipmentIDSuccess) {
                        dataByShipmentID = this.props.data.sarReducer.getShippingDataByShipmentIDSuccess;
                        if (dataByShipmentID.manuallyShipped === true) {
                            dataByShipmentIDManuallyShipped = 'YES'
                        }
                        shipmentIDRows = [
                            createData('Material ID', dataByShipmentID.materialID),
                            createData('Shipment ID', this.state.shipmentID),
                            createData('Planned Ship Date', dataByShipmentID.plannedShipDate),
                            createData('Actual Ship Date', dataByShipmentID.actualShipDate),
                            createData('Address', dataByShipmentID.address1),
                            createData('Manual Shipping', dataByShipmentIDManuallyShipped)
                        ];
                        this.setState({
                            showProgressLogo: false,
                            openShipmentIDDialog: true,
                            receivedShipment: dataByShipmentID.receivedShipment
                        });
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            openShipmentIDDialog: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'No shipping information!',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            }
                        })
                    }
                });
        }
    };

    handleDialogClose = () => {
        this.setState({
            showProgressLogo: false,
            openMaterialIDDialog: false,
            openShipmentIDDialog: false,
            showProgressLogoDialog: false
        });
    };

    handleMIDialogReceiveShipment = (event) => {
        this.props.data.sarReducer.updateShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.updateShippingDataByShipmentIDSuccess = '';
        this.setState({ showProgressLogoDialog: true });
        let urlMaterialID = this.state.materialID;
        let bodyMaterialID = {
            materialID: this.state.materialID,
            shipmentID: dataByMaterialID.shipmentID,
            listOfKeys: dataByMaterialID.listOfKeys,
            shipmentSent: dataByMaterialID.shipmentSent,
            shipmentCompleted: dataByMaterialID.shipmentCompleted,
            shipmentQuantity: dataByMaterialID.shipmentQuantity,
            manuallyShipped: dataByMaterialID.manuallyShipped,
            address1: dataByMaterialID.address1,
            address2: dataByMaterialID.address2,
            city: dataByMaterialID.city,
            state: dataByMaterialID.state,
            country: dataByMaterialID.country,
            postalCode: dataByMaterialID.postalCode,
            ipAddress: dataByMaterialID.ipAddress,
            receivedShipment: true,
            receivedOrder: dataByMaterialID.receivedOrder,
            deliverOrderNo: dataByMaterialID.deliverOrderNo,
            prdKey: dataByMaterialID.prdKey,
            deviceUUID: dataByMaterialID.deviceUUID,
            plannedShipDate: dataByMaterialID.plannedShipDate,
            actualShipDate: dataByMaterialID.actualShipDate,
        };
        let urlShipmentID = dataByMaterialID.shipmentID;
        let bodyShipmentID = {
            materialID: this.state.materialID,
            shipmentID: dataByMaterialID.shipmentID,
            listOfKeys: dataByMaterialID.listOfKeys,
            shipmentSent: dataByMaterialID.shipmentSent,
            shipmentCompleted: dataByMaterialID.shipmentCompleted,
            shipmentQuantity: dataByMaterialID.shipmentQuantity,
            manuallyShipped: dataByMaterialID.manuallyShipped,
            address1: dataByMaterialID.address1,
            address2: dataByMaterialID.address2,
            city: dataByMaterialID.city,
            state: dataByMaterialID.state,
            country: dataByMaterialID.country,
            postalCode: dataByMaterialID.postalCode,
            ipAddress: dataByMaterialID.ipAddress,
            receivedShipment: true,
            receivedOrder: dataByMaterialID.receivedOrder,
            deliverOrderNo: dataByMaterialID.deliverOrderNo,
            prdKey: dataByMaterialID.prdKey,
            deviceUUID: dataByMaterialID.deviceUUID,
            plannedShipDate: dataByMaterialID.plannedShipDate,
            actualShipDate: dataByMaterialID.actualShipDate
        };
        Promise.resolve(this.props.updateShippingDataByMaterialID(urlMaterialID, bodyMaterialID))
            .then(() => {
                Promise.resolve(this.props.updateShippingDataByShipmentID(urlShipmentID, bodyShipmentID))
                    .then(() => {
                        if (this.props.data.sarReducer.updateShippingDataByMaterialIDSuccess === true
                            && this.props.data.sarReducer.updateShippingDataByShipmentIDSuccess === true) {
                            this.setState({
                                showProgressLogoDialog: false,
                                openMaterialIDDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Receive Shipment Success!',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Success'
                                },
                                materialID: '',
                                materialIDInformed: false,
                                shipmentID: '',
                                shipmentIDInformed: false
                            });
                        } else {
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Receive Shipment Error! Please try again.',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Error'
                                }
                            })
                        }
                    });
            });
    };

    handleSIDialogReceiveShipment = (event) => {
        this.props.data.sarReducer.updateShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.updateShippingDataByShipmentIDSuccess = '';
        this.setState({ showProgressLogoDialog: true });
        let urlMaterialID = dataByShipmentID.materialID;
        let bodyMaterialID = {
            materialID: dataByShipmentID.materialID,
            shipmentID: this.state.shipmentID,
            listOfKeys: dataByShipmentID.listOfKeys,
            shipmentSent: dataByShipmentID.shipmentSent,
            shipmentCompleted: dataByShipmentID.shipmentCompleted,
            shipmentQuantity: dataByShipmentID.shipmentQuantity,
            manuallyShipped: dataByShipmentID.manuallyShipped,
            address1: dataByShipmentID.address1,
            address2: dataByShipmentID.address2,
            city: dataByShipmentID.city,
            state: dataByShipmentID.state,
            country: dataByShipmentID.country,
            postalCode: dataByShipmentID.postalCode,
            ipAddress: dataByShipmentID.ipAddress,
            receivedShipment: true,
            receivedOrder: dataByShipmentID.receivedOrder,
            deliverOrderNo: dataByShipmentID.deliverOrderNo,
            prdKey: dataByShipmentID.prdKey,
            deviceUUID: dataByShipmentID.deviceUUID,
            plannedShipDate: dataByShipmentID.plannedShipDate,
            actualShipDate: dataByShipmentID.actualShipDate
        };
        let urlShipmentID = this.state.shipmentID;
        let bodyShipmentID = {
            materialID: dataByShipmentID.materialID,
            shipmentID: this.state.shipmentID,
            listOfKeys: dataByShipmentID.listOfKeys,
            shipmentSent: dataByShipmentID.shipmentSent,
            shipmentCompleted: dataByShipmentID.shipmentCompleted,
            shipmentQuantity: dataByShipmentID.shipmentQuantity,
            manuallyShipped: dataByShipmentID.manuallyShipped,
            address1: dataByShipmentID.address1,
            address2: dataByShipmentID.address2,
            city: dataByShipmentID.city,
            state: dataByShipmentID.state,
            country: dataByShipmentID.country,
            postalCode: dataByShipmentID.postalCode,
            ipAddress: dataByShipmentID.ipAddress,
            receivedShipment: true,
            receivedOrder: dataByShipmentID.receivedOrder,
            deliverOrderNo: dataByShipmentID.deliverOrderNo,
            prdKey: dataByShipmentID.prdKey,
            deviceUUID: dataByShipmentID.deviceUUID,
            plannedShipDate: dataByShipmentID.plannedShipDate,
            actualShipDate: dataByShipmentID.actualShipDate
        };
        Promise.resolve(this.props.updateShippingDataByMaterialID(urlMaterialID, bodyMaterialID))
            .then(() => {
                Promise.resolve(this.props.updateShippingDataByShipmentID(urlShipmentID, bodyShipmentID))
                    .then(() => {
                        if (this.props.data.sarReducer.updateShippingDataByMaterialIDSuccess === true
                            && this.props.data.sarReducer.updateShippingDataByShipmentIDSuccess === true) {
                            this.setState({
                                showProgressLogoDialog: false,
                                openShipmentIDDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Receive Shipment Success!',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Success'
                                },
                                materialID: '',
                                materialIDInformed: false,
                                shipmentID: '',
                                shipmentIDInformed: false
                            });
                        } else {
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Receive Shipment Error! Please try again.',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Error'
                                }
                            })
                        }
                    });
            });
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            }
        });
    };

    render() {

        const formComplete = this.state.materialIDInformed || this.state.shipmentIDInformed;

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'>
                            <img src={blocnetsLogo} className='App-logo-progress' alt='' />
                        </div>
                        :
                        ''}
                </div>
                <div className='Module'>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                className='Module-TextField'
                                disabled={this.state.shipmentIDInformed}
                                floatingLabelFixed={true}
                                floatingLabelText='Material ID'
                                hintText=''
                                name='materialID'
                                onChange={this.handleIDChange}
                                type='text'
                                value={this.state.materialID}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                className='Module-TextField'
                                disabled={this.state.materialIDInformed}
                                floatingLabelFixed={true}
                                floatingLabelText='Shipment ID'
                                hintText=''
                                name='shipmentID'
                                onChange={this.handleIDChange}
                                type='text'
                                value={this.state.shipmentID}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button className='Module-Button' fullWidth={true} disabled={!formComplete}
                                    onClick={this.handleRetrieveShipment} type='submit' value='Submit'
                                    variant='contained'>
                                Retrieve Shipment
                                <DomainIcon className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Dialog autoScrollBodyContent={true} onClose={this.handleDialogClose}
                        open={this.state.openMaterialIDDialog}>
                    <div className='Module'>
                        <Grid container justify='flex-end'>
                            <Grid container item xs={12}>
                                <i className='material-icons Module-TableCell-Click' onClick={this.handleDialogClose}>
                                    close
                                </i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify='center'>
                            <Grid container item xs={12}>
                                <Paper className='Module-Paper'>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className='overlay'>
                                                <img alt='' className='App-logo-progress' src={blocnetsLogo} />
                                            </div>
                                            :
                                            ''}
                                    </div>
                                    <div className='Module-Paper-Div'>
                                        <Table className='Module-Table'>
                                            <TableBody className='Module-TableBody'>
                                                {materialIDRows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>
                                                                {row.info1}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.info2}
                                                            </TableCell>
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
                        <Grid container justify='center'>
                            <Grid container item xs={12}>
                                <Button className='Module-Button' fullWidth={true}
                                        disabled={this.state.receivedShipment === true}
                                        onClick={this.handleMIDialogReceiveShipment} type='submit'
                                        value='ReceiveShipmentMI' variant='contained'>
                                    Receive Shipment
                                    <DomainIcon className='Module-Button-Icon' />
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Dialog autoScrollBodyContent={true} onClose={this.handleDialogClose}
                        open={this.state.openShipmentIDDialog}>
                    <div className='Module'>
                        <Grid container justify='flex-end'>
                            <Grid container item xs={12}>
                                <i className='material-icons Module-TableCell-Click' onClick={this.handleDialogClose}>
                                    close
                                </i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify='center'>
                            <Grid container item xs={12}>
                                <Paper className='Module-Paper'>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className='overlay'>
                                                <img alt='' className='App-logo-progress' src={blocnetsLogo} />
                                            </div>
                                            :
                                            ''}
                                    </div>
                                    <div className='Module-Paper-Div'>
                                        <Table className='Module-Table'>
                                            <TableBody className='Module-TableBody'>
                                                {shipmentIDRows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>
                                                                {row.info1}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.info2}
                                                            </TableCell>
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
                        <Grid container justify='center'>
                            <Grid container item xs={12}>
                                <Button className='Module-Button' fullWidth={true}
                                        disabled={this.state.receivedShipment === true}
                                        onClick={this.handleSIDialogReceiveShipment} type='submit'
                                        value='ReceiveShipmentSI' variant='contained'>
                                    Receive Shipment
                                    <DomainIcon className='Module-Button-Icon' />
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar autoHideDuration={this.state.snackbar.autoHideDuration} onClose={this.handleSnackbarClose}
                          open={this.state.snackbar.open}>
                    <SnackbarContent
                        classes={{ message: 'Module-Snackbar-Message' }}
                        className={this.state.snackbar.sbColor}
                        message={this.state.snackbar.message}
                    />
                </Snackbar>
            </form>
        );

    }

}

ReceivingView.propTypes = {};

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getShippingDataByMaterialID: (url) => dispatch(getShippingDataByMaterialID(url)),
        getShippingDataByShipmentID: (url) => dispatch(getShippingDataByShipmentID(url)),
        updateShippingDataByMaterialID: (url, body) => dispatch(updateShippingDataByMaterialID(url, body)),
        updateShippingDataByShipmentID: (url, body) => dispatch(updateShippingDataByShipmentID(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceivingView);
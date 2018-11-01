import React, { Component } from 'react';
import blocnetsLogo from '../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import TextField from 'material-ui/TextField';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Select from '@material-ui/core/Select/Select';
import Input from '@material-ui/core/Input/Input';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { getBillOfMaterialsByMaterialID } from '../../redux/actions/BOM/bill-of-materials.actions';
import { syncSARDataAndBindKeys } from '../../redux/actions/shipping.and.receiving.actions';

let counter = 0;

class ShippingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            errorTextMaterialID: 'This is a required field.',
            shipmentID: '',
            shipmentIDGenerated: '',
            shipmentIDTyped: '',
            plannedShipDate: '',
            actualShipDate: '',
            address: '',
            addressMenuItems: '',
            ipAddress: '',
            errorTextAddress: 'This is a required field.',
            manualShipping: false,
            manualShipping2: 'NO',
            shipmentCompleted: false,
            shipmentCompleted2: 'NO',
            quantity: '',
            errorTextQuantity: 'This is a required field.',
            materialIDQuantityList: [{
                materialID: '',
                quantity: ''
            }],
            openDialogQuantity: false,
            openDialogConfirmation: false,
            showProgressLogoDialog: false,
            rows: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleMaterialIDChange = (event) => {
        if (event.target.value) {
            this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess = '';
            let eBOMData = [];
            this.setState({ showProgressLogo: true });
            Promise.resolve(this.props.getBillOfMaterialsByMaterialID(event.target.value))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess) {
                        eBOMData = this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess;
                        if (eBOMData !== [] && eBOMData.outbound !== undefined) {
                            this.setState({
                                showProgressLogo: false,
                                addressMenuItems: eBOMData.outbound[0].outboundAddressLine1 + ' ' + eBOMData.outbound[0].outboundAddressLine2 + ' '
                                    + eBOMData.outbound[0].outboundCity + ' ' + eBOMData.outbound[0].outboundStateProvince + ' '
                                    + eBOMData.outbound[0].outboundPostalCode + ' ' + eBOMData.outbound[0].outboundCountry,
                                ipAddress: ''
                            });
                        } else {
                            this.setState({
                                showProgressLogo: false,
                                addressMenuItems: '',
                                ipAddress: '',
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Address cannot be found!',
                                    open: true,
                                    sbColor: 'red'
                                }
                            });
                        }
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            addressMenuItems: '',
                            ipAddress: '',
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Address cannot be found!',
                                open: true,
                                sbColor: 'red'
                            }
                        });
                    }
                });
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'materialID' && event.target.value) {
            this.setState({ errorTextMaterialID: '' });
            let materialIDQuantityList = [...this.state.materialIDQuantityList];
            materialIDQuantityList[0].materialID = event.target.value;
            this.setState({ materialIDQuantityList: materialIDQuantityList });
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({
                errorTextMaterialID: 'This is a required field.',
                addressMenuItems: '',
                ipAddress: ''
            });
        }
        if ([event.target.name].toString() === 'address' && event.target.value) {
            this.setState({ errorTextAddress: '' });
        } else if ([event.target.name].toString() === 'address' && !event.target.value) {
            this.setState({ errorTextAddress: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'quantity' && event.target.value) {
            this.setState({ errorTextQuantity: '' });
        } else if ([event.target.name].toString() === 'quantity' && !event.target.value) {
            this.setState({ errorTextQuantity: 'This is a required field.' });
        }
    };

    handleCheckboxChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
        if ([event.target.name].toString() === 'manualShipping' && event.target.checked === true) {
            this.setState({
                manualShipping: true,
                manualShipping2: 'YES'
            });
        } else if ([event.target.name].toString() === 'manualShipping' && event.target.checked === false) {
            this.setState({
                manualShipping: false,
                manualShipping2: 'NO'
            });
        }
        if ([event.target.name].toString() === 'shipmentCompleted' && event.target.checked === true) {
            this.setState({
                shipmentCompleted: true,
                shipmentCompleted2: 'YES'
            });
        } else if ([event.target.name].toString() === 'shipmentCompleted' && event.target.checked === false) {
            this.setState({
                shipmentCompleted: false,
                shipmentCompleted2: 'NO'
            });
        }
    };

    handleAddition = (event) => {
        let materialIDQuantityList = this.state.materialIDQuantityList;
        let materialIDQuantityList2 = {
            materialID: '',
            quantity: ''
        };
        let materialIDQuantityListFinal = materialIDQuantityList.concat(materialIDQuantityList2);
        this.setState({ materialIDQuantityList: materialIDQuantityListFinal })
    };

    handleDeletion = (index) => (event) => {
        let materialIDQuantityList = this.state.materialIDQuantityList;
        let materialIDQuantityList2 = materialIDQuantityList.slice(0, index);
        let materialIDQuantityList3 = materialIDQuantityList.slice(index + 1);
        let materialIDQuantityListFinal = materialIDQuantityList2.concat(materialIDQuantityList3);
        this.setState({ materialIDQuantityList: materialIDQuantityListFinal })
    };

    handleMaterialIDText = (index) => (event) => {
        if (event.target.value) {
            this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess = '';
            this.setState({ showProgressLogo: true });
            let childMaterialID = event.target.value;
            Promise.resolve(this.props.getBillOfMaterialsByMaterialID(event.target.value))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess) {
                        this.setState({ showProgressLogo: false });
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Master Data does not exist for ' + childMaterialID + '.',
                                open: true,
                                sbColor: 'red'
                            }
                        });
                    }
                });
        }
    };

    handleText = (index) => (event) => {
        let materialIDQuantityList = [...this.state.materialIDQuantityList];
        if ([event.target.name].toString() === 'materialIDList' && event.target.value) {
            materialIDQuantityList[index].materialID = event.target.value;
        } else if ([event.target.name].toString() === 'materialIDList' && !event.target.value) {
            materialIDQuantityList[index].materialID = '';
        }
        if ([event.target.name].toString() === 'quantityList' && event.target.value) {
            materialIDQuantityList[index].quantity = event.target.value;
        } else if ([event.target.name].toString() === 'quantityList' && !event.target.value) {
            materialIDQuantityList[index].quantity = '';
        }
        this.setState({ materialIDQuantityList: materialIDQuantityList });
    };

    handleSendShipment = (event) => {
        event.preventDefault();
        if (this.state.shipmentCompleted === true) {
            this.setState({
                openDialogQuantity: false,
                openDialogConfirmation: true,
                rows: this.createTableContent()
            });
        } else {
            this.setState({
                openDialogQuantity: true,
                openDialogConfirmation: false
            });
        }
    };

    handleSubmitQuantity = () => {
        this.setState({
            openDialogConfirmation: true,
            rows: this.createTableContent()
        });
    };

    handleDialogCloseQuantity = () => {
        this.setState({
            openDialogQuantity: false,
            quantity: ''
        });
    };

    handlePrint = () => {
    };

    handleSubmitConfirmation = () => {
        this.props.data.sarReducer.createShippingDataByShipmentIDSuccess = '';
        this.props.data.sarReducer.updateShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.createShippingDataByMaterialIDSuccess = '';
        this.setState({ showProgressLogoDialog: true });
        let payload = {
            materialID: this.state.materialID,
            shipmentID: this.state.shipmentID,
            listOfKeys: this.state.materialIDQuantityList,
            shipmentSent: true,
            shipmentCompleted: this.state.shipmentCompleted,
            shipmentQuantity: this.state.quantity,
            manuallyShipped: this.state.manualShipping,
            address1: this.state.address,
            address2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            ipAddress: '',
            receivedShipment: '',
            receivedOrder: '',
            deliverOrderNo: '',
            prdKey: '',
            deviceUUID: '',
            plannedShipDate: this.state.plannedShipDate,
            actualShipDate: this.state.actualShipDate
        };
        Promise.resolve(this.props.syncSARDataAndBindKeys(payload))
            .then(() => {
                if (this.props.data.sarReducer.syncSARDataAndBindKeysSuccess === true) {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Shipping Successful!',
                            open: true,
                            sbColor: '#23CE6B'
                        },
                        openDialogQuantity: false,
                        openDialogConfirmation: false,
                        materialID: '',
                        errorTextMaterialID: 'This is a required field.',
                        shipmentID: '',
                        shipmentIDGenerated: '',
                        shipmentIDTyped: '',
                        plannedShipDate: '',
                        actualShipDate: '',
                        address: '',
                        addressMenuItems: '',
                        ipAddress: '',
                        errorTextAddress: 'This is a required field.',
                        manualShipping: false,
                        manualShipping2: 'NO',
                        shipmentCompleted: false,
                        shipmentCompleted2: 'NO',
                        quantity: '',
                        errorTextQuantity: 'This is a required field.',
                        materialIDQuantityList: [{
                            materialID: '',
                            quantity: ''
                        }],
                        rows: []
                    });
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Shipping Error! Please try again.',
                            open: true,
                            sbColor: 'red'
                        }
                    });
                }
            });
    };

    handleDialogCloseConfirmation = () => {
        this.setState({ openDialogConfirmation: false });
    };

    guid = () => {
        let shipmentID = this.generateUniqueID() + '-' + this.generateUniqueID() + '-'
            + this.generateUniqueID() + '-' + this.generateUniqueID();
        this.setState({ shipmentIDGenerated: shipmentID });
        return shipmentID;
    };

    generateUniqueID = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    createData = (info1, info2) => {
        counter += 1;
        return { id: counter, info1, info2 };
    };

    createTableContent = () => {
        let shipmentID = '';
        if (this.state.shipmentIDTyped === '') {
            shipmentID = this.guid();
            this.setState({ shipmentID: shipmentID });
        } else {
            shipmentID = this.state.shipmentIDTyped;
            this.setState({ shipmentID: shipmentID });
        }
        let tableContent = [
            this.createData('Material ID', this.state.materialID),
            this.createData('Shipment ID', shipmentID),
            this.createData('Planned Ship Date', this.state.plannedShipDate),
            this.createData('Actual Ship Date', this.state.actualShipDate),
            this.createData('Address', this.state.address),
            this.createData('Manual Shipping', this.state.manualShipping2),
            this.createData('Shipment Completed', this.state.shipmentCompleted2)
        ];
        for (let i = 0; i < this.state.materialIDQuantityList.length; i++) {
            tableContent.push(this.createData('Material ID/Quantity', this.state.materialIDQuantityList[i].materialID + '/' + this.state.materialIDQuantityList[i].quantity));
        }
        if (this.state.shipmentCompleted === false) {
            tableContent.push(this.createData('Quantity', this.state.quantity));
        }
        return tableContent;
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

        const addCircleIconStyle = {
            color: 'black',
            transform: 'scale(1.8)'
        };

        const deleteIconStyle = {
            color: 'black',
            transform: 'scale(1.6)'
        };

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

        const formComplete = this.state.materialID && this.state.address;

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel style={{ "textAlign": "left", "fontWeight": "bold", "color": "black" }}>Create
                                Shipping Information</FormLabel>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider style={{ "height": "1px", "backgroundColor": "black" }} />
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Material ID</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Shipment ID</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Planned Ship Date</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Actual Ship Date</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                type="text"
                                name="materialID"
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                                errorText={this.state.errorTextMaterialID}
                                errorStyle={{ "float": "left", "textAlign": "left" }}
                                onBlur={this.handleMaterialIDChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.shipmentIDTyped}
                                onChange={this.handleChange}
                                type="text"
                                name="shipmentIDTyped"
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.plannedShipDate}
                                onChange={this.handleChange}
                                type="date"
                                name="plannedShipDate"
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.actualShipDate}
                                onChange={this.handleChange}
                                type="date"
                                name="actualShipDate"
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel style={{ "textAlign": "left" }}>Address</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormControl fullWidth={true}>
                                <Select value={this.state.address} onChange={this.handleChange}
                                        input={<Input name="address" style={{ "textAlign": "left" }} />}
                                        displayEmpty>
                                    <MenuItem
                                        value={this.state.addressMenuItems}>{this.state.addressMenuItems}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormHelperText style={{ "color": "red" }}>{this.state.errorTextAddress}</FormHelperText>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="manualShipping"
                                            color="default"
                                            checked={this.state.manualShipping}
                                        />
                                    }
                                    label="Manual Shipping"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="shipmentCompleted"
                                            color="default"
                                            checked={this.state.shipmentCompleted}
                                        />
                                    }
                                    label="Shipment Completed"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel style={{ "textAlign": "left", "fontWeight": "bold", "color": "black" }}>Additional
                                Shipping Information</FormLabel>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider style={{ "height": "1px", "backgroundColor": "black" }} />
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Material ID</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Quantity</FormLabel>
                        </Grid>
                    </Grid>
                    {this.state.materialIDQuantityList.map((materialIDQuantityList, index) => (
                        <span key={index}>
                            <Grid container spacing={24}>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type="text"
                                        style={{ "float": "left", "textAlign": "left" }}
                                        name="materialIDList"
                                        onChange={this.handleText(index)}
                                        hintText=""
                                        value={materialIDQuantityList.materialID}
                                        onBlur={this.handleMaterialIDText(index)}
                                    />
                                </Grid>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type="text"
                                        style={{ "float": "left", "textAlign": "left" }}
                                        name="quantityList"
                                        onChange={this.handleText(index)}
                                        hintText=""
                                        value={materialIDQuantityList.quantity}
                                    />
                                </Grid>
                                {index === 0 ?
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleAddition}>
                                            <AddCircleIcon style={addCircleIconStyle} />
                                        </IconButton>
                                    </Grid>
                                    :
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleDeletion(index)}>
                                            <DeleteIcon style={deleteIconStyle} />
                                        </IconButton>
                                    </Grid>
                                }
                            </Grid>
                        </span>
                    ))}
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!formComplete} onClick={this.handleSendShipment}>
                                    Send Shipment
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialogQuantity} onClose={this.handleDialogCloseQuantity}
                        autoScrollBodyContent={true}>
                    <div style={{ padding: 24 }}>
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <TextField
                                    value={this.state.quantity}
                                    onChange={this.handleChange}
                                    type="text"
                                    name="quantity"
                                    floatingLabelText="Quantity"
                                    floatingLabelFixed={true}
                                    style={{ "float": "left", "textAlign": "left" }}
                                    hintText=""
                                    errorText={this.state.errorTextQuantity}
                                    errorStyle={{ "float": "left", "textAlign": "left" }}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmitQuantity} disabled={!this.state.quantity}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogCloseQuantity}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Dialog open={this.state.openDialogConfirmation} onClose={this.handleDialogCloseConfirmation}
                        autoScrollBodyContent={true}>
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
                                        <Table style={{ "tableLayout": "fixed" }}>
                                            <TableBody style={{ "overflowWrap": "break-word" }}>
                                                {this.state.rows.map(row => {
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
                                    <Button type="submit" value="Print" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handlePrint} disabled>
                                        Print...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmitConfirmation}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogCloseConfirmation}>
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

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getBillOfMaterialsByMaterialID: (url) => dispatch(getBillOfMaterialsByMaterialID(url)),
        syncSARDataAndBindKeys: (payload) => dispatch(syncSARDataAndBindKeys(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingView);
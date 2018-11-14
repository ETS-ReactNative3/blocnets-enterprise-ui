import React, { Component } from 'react';
import blocnetsLogo from '../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
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
            plannedShipDate: null,
            actualShipDate: null,
            dateToday: new Date(),
            address: '',
            addressMenuItems: '',
            ipAddress: '',
            errorTextAddress: 'This is a required field.',
            manualShipping: false,
            manualShipping2: 'NO',
            materialIDList: [{
                materialID: ''
            }],
            openDialogConfirmation: false,
            showProgressLogoDialog: false,
            rows: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            }
        };
    };

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
                                    sbColor: 'Module-Snackbar-Error'
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
                                sbColor: 'Module-Snackbar-Error'
                            }
                        });
                    }
                });
        }
    };

    handlePlannedShipDateChange = (event, date) => {
        this.setState({ plannedShipDate: date });
    };

    handleActualShipDateChange = (event, date) => {
        this.setState({ actualShipDate: date });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'materialID' && event.target.value) {
            this.setState({ errorTextMaterialID: '' });
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({
                errorTextMaterialID: 'This is a required field.',
                address: '',
                addressMenuItems: '',
                ipAddress: '',
                errorTextAddress: 'This is a required field.'
            });
        }
        if ([event.target.name].toString() === 'address' && event.target.value) {
            this.setState({ errorTextAddress: '' });
        } else if ([event.target.name].toString() === 'address' && !event.target.value) {
            this.setState({ errorTextAddress: 'This is a required field.' });
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
    };

    handleAddition = (event) => {
        let materialIDList = this.state.materialIDList;
        let materialIDList2 = {
            materialID: ''
        };
        let materialIDListFinal = materialIDList.concat(materialIDList2);
        this.setState({ materialIDList: materialIDListFinal })
    };

    handleDeletion = (index) => (event) => {
        let materialIDList = this.state.materialIDList;
        let materialIDList2 = materialIDList.slice(0, index);
        let materialIDList3 = materialIDList.slice(index + 1);
        let materialIDListFinal = materialIDList2.concat(materialIDList3);
        this.setState({ materialIDList: materialIDListFinal })
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
                                message: 'Master Data does not exist for ' + childMaterialID + '!',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            }
                        });
                    }
                });
        }
    };

    handleText = (index) => (event) => {
        let materialIDList = [...this.state.materialIDList];
        if ([event.target.name].toString() === 'materialIDList' && event.target.value) {
            materialIDList[index].materialID = event.target.value;
        } else if ([event.target.name].toString() === 'materialIDList' && !event.target.value) {
            materialIDList[index].materialID = '';
        }
        this.setState({ materialIDList: materialIDList });
    };

    generateUniqueID = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    guid = () => {
        let shipmentID = this.generateUniqueID() + '-' + this.generateUniqueID() + '-'
            + this.generateUniqueID() + '-' + this.generateUniqueID();
        this.setState({ shipmentIDGenerated: shipmentID });
        return shipmentID;
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
        let plannedShipDate = this.state.plannedShipDate ? this.state.plannedShipDate.toISOString().substring(0, 10) : '';
        let actualShipDate = this.state.actualShipDate ? this.state.actualShipDate.toISOString().substring(0, 10) : '';
        let tableContent = [
            this.createData('Material ID', this.state.materialID),
            this.createData('Shipment ID', shipmentID),
            this.createData('Planned Ship Date', plannedShipDate),
            this.createData('Actual Ship Date', actualShipDate),
            this.createData('Address', this.state.address),
            this.createData('Manual Shipping', this.state.manualShipping2)
        ];
        if (this.state.materialIDList[0].materialID !== '') {
            tableContent.push(this.createData('Additional Shipping Information', ''));
            for (let i = 0; i < this.state.materialIDList.length; i++) {
                let index = i + 1;
                tableContent.push(this.createData('Material ID (' + index + ')', this.state.materialIDList[i].materialID));
            }
        }
        return tableContent;
    };

    handleSendShipment = (event) => {
        event.preventDefault();
        this.setState({
            openDialogConfirmation: true,
            rows: this.createTableContent()
        });
    };

    handleSubmitConfirmation = () => {
        this.props.data.sarReducer.createShippingDataByShipmentIDSuccess = '';
        this.props.data.sarReducer.updateShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.createShippingDataByMaterialIDSuccess = '';
        this.setState({ showProgressLogoDialog: true });
        let listofKeys = [{ materialID: this.state.materialID }];
        if (this.state.materialIDList) {
            for (let i = 0; i < this.state.materialIDList.length; i++) {
                listofKeys.push(this.state.materialIDList[i]);
            }
        }
        let payload = {
            materialID: this.state.materialID,
            shipmentID: this.state.shipmentID,
            listOfKeys: listofKeys,
            shipmentSent: true,
            shipmentCompleted: true,
            shipmentQuantity: '',
            manuallyShipped: this.state.manualShipping,
            address1: this.state.address,
            address2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            ipAddress: '',
            receivedShipment: false,
            receivedOrder: false,
            deliverOrderNo: '',
            prdKey: '',
            deviceUUID: '',
            plannedShipDate: this.state.plannedShipDate ? this.state.plannedShipDate.toISOString().substring(0, 10) : '',
            actualShipDate: this.state.actualShipDate ? this.state.actualShipDate.toISOString().substring(0, 10) : ''
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
                            sbColor: 'Module-Snackbar-Success'
                        },
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
                        materialIDList: [{
                            materialID: ''
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
                            sbColor: 'Module-Snackbar-Error'
                        }
                    });
                }
            });
    };

    handleDialogCloseConfirmation = () => {
        this.setState({ openDialogConfirmation: false });
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

        const datePickerStyle = {
            float: 'left',
            textAlign: 'left',
            width: '100%'
        }

        const formComplete = this.state.materialID && this.state.address;

        return (

            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'>
                            <img alt='' className='App-logo-progress' src={blocnetsLogo} />
                        </div>
                        :
                        ''}
                </div>
                <div className='Module'>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Create Shipping Information
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider className='Module-Divider' />
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                className='Module-TextField'
                                errorText={this.state.errorTextMaterialID}
                                floatingLabelFixed={true}
                                floatingLabelText='Material ID'
                                hintText=''
                                name='materialID'
                                onBlur={this.handleMaterialIDChange}
                                onChange={this.handleChange}
                                type='text'
                                value={this.state.materialID}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                className='Module-TextField'
                                floatingLabelFixed={true}
                                floatingLabelText='Shipment ID'
                                hintText=''
                                name='shipmentIDTyped'
                                onChange={this.handleChange}
                                type='text'
                                value={this.state.shipmentIDTyped}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <DatePicker
                                autoOk={true}
                                floatingLabelFixed={true}
                                floatingLabelText='Planned Ship Date'
                                hintText=''
                                id='plannedShipDate'
                                onChange={this.handlePlannedShipDateChange}
                                textFieldStyle={datePickerStyle}
                                value={this.state.plannedShipDate}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <DatePicker
                                autoOk={true}
                                floatingLabelFixed={true}
                                floatingLabelText='Actual Ship Date'
                                hintText=''
                                id='actualShipDate'
                                minDate={this.state.dateToday}
                                onChange={this.handleActualShipDateChange}
                                textFieldStyle={datePickerStyle}
                                value={this.state.actualShipDate}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormControl fullWidth={true}>
                                <InputLabel>
                                    Address
                                </InputLabel>
                                <Select displayEmpty input={<Input className='Mobile-MenuItem' name='address' />}
                                        onChange={this.handleChange} value={this.state.address}>
                                    <MenuItem value={this.state.addressMenuItems}>
                                        {this.state.addressMenuItems}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormHelperText className='TT-Font-Red'>
                                {this.state.errorTextAddress}
                            </FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.manualShipping}
                                            classes={{
                                                root: 'Module-Checkbox-Root',
                                                checked: 'Module-Checkbox-Checked'
                                            }}
                                            name='manualShipping'
                                            onClick={this.handleCheckboxChange}
                                        />
                                    }
                                    label='Manual Shipping'
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel className='Module-FormLabel'>
                                Additional Shipping Information
                            </FormLabel>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider className='Module-Divider' />
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <InputLabel>
                                Material ID
                            </InputLabel>
                        </Grid>
                    </Grid>
                    {this.state.materialIDList.map((materialIDList, index) => (
                        <span key={index}>
                            <Grid container spacing={24}>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        className='Module-TextField'
                                        hintText=''
                                        name='materialIDList'
                                        onBlur={this.handleMaterialIDText(index)}
                                        onChange={this.handleText(index)}
                                        type='text'
                                        value={materialIDList.materialID}
                                    />
                                </Grid>
                                {index === 0 ?
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleAddition}>
                                            <AddCircleIcon className='Button-AddCircleIcon' />
                                        </IconButton>
                                    </Grid>
                                    :
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleDeletion(index)}>
                                            <DeleteIcon className='Button-DeleteCircleIcon' />
                                        </IconButton>
                                    </Grid>
                                }
                            </Grid>
                        </span>
                    ))}
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button className='Module-Button' fullWidth={true} disabled={!formComplete}
                                    onClick={this.handleSendShipment} type='submit' value='Submit' variant='contained'>
                                Send Shipment
                                <LocalShippingIcon className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Dialog autoScrollBodyContent={true} onClose={this.handleDialogCloseConfirmation}
                        open={this.state.openDialogConfirmation}>
                    <div className='Module'>
                        <Grid container>
                            <Grid container item xs={12}>
                                Please confirm information.
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
                                                {this.state.rows.map(row => {
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
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <Grid container item xs justify='flex-end'>
                                    <Button className='Module-Button-Save'
                                            onClick={this.handleSubmitConfirmation}
                                            type='submit' value='OK' variant='contained'>
                                        OK
                                    </Button>
                                </Grid>
                                <Grid container item xs justify='flex-end'>
                                    <Button className='Module-Button-Cancel'
                                            onClick={this.handleDialogCloseConfirmation}
                                            type='submit' value='Cancel' variant='contained'>
                                        Cancel
                                    </Button>
                                </Grid>
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
import React, { Component } from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import Switch from '@material-ui/core/Switch/Switch';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import TrackAndTraceTreeView from './track-and-trace.tree.view';

let masterDataCounter = 0;

let cellCount = 0;

let SARcounter = 0;

class TrackAndTraceResultsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMaterialMap: false,
            showMaterialMapSwitch: false,
            showProgressLogo: false,
            showMasterDataHistory: {
                open: false
            },
            masterDataHistory: [],
            showShipmentHistory: {
                open: false
            },
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

    handleEditMasterData = () => {
        let masterMaterialData = this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByMaterialNameSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByMaterialDescSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByPartNumberSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByPartNameSuccess ||
            this.props.data.bomReducer.getBillOfMaterialsByPartDescSuccess;
        this.props.viewHandler(masterMaterialData);
    };

    createMasterDataTableContent = () => {
        let createMasterData = (info1, info2) => {
            masterDataCounter += 1;
            return { id: masterDataCounter, info1, info2 };
        };
        let masterDataHistory = [];
        let materialIDList = [];
        let materialNameList = [];
        let materialDescriptionList = [];
        let outboundCustomerDataList = [];
        let outboundInitialList = [];
        let materialValidationCharacteristicsList = [];
        let volumeList = [];
        let weightList = [];
        let lengthList = [];
        let widthList = [];
        let heightList = [];
        let temperatureLimitsList = [];
        let shockVibrationList = [];
        let altitudeRestrictionsList = [];
        let compressionRestrictionsList = [];
        let alwaysUprightList = [];
        let metallicList = [];
        let hazmatList = [];
        let magneticList = [];
        let lengthToleranceList = [];
        let roundToleranceList = [];
        let nonSkidToleranceList = [];
        let supplierOrderQuantitiesControlList = [];
        let minEconomicOrderQuantitiesList = [];
        let maxEconomicOrderQuantitiesList = [];
        let maxEconomicProductWithdrawalRateList = [];
        let minOrderLeadTimesList = [];
        let inboundSuppliersList = [];
        let inboundInitialList = [];
        let tableContent = [];
        if (this.props.data.bomReducer.getBillOfMaterialsHistoryByMaterialIDSuccess) {
            masterDataHistory = this.props.data.bomReducer.getBillOfMaterialsHistoryByMaterialIDSuccess;
            for (let i = 0; i < masterDataHistory.length; i++) {
                materialIDList.push(masterDataHistory[i].material.materialID);
                materialNameList.push(masterDataHistory[i].material.materialName);
                materialDescriptionList.push(masterDataHistory[i].material.materialDescription);
                outboundCustomerDataList.push('');
                outboundInitialList.push(masterDataHistory[i].outbound);
                materialValidationCharacteristicsList.push('');
                volumeList.push(masterDataHistory[i].materialValidationCharacteristics.materialVolume);
                weightList.push(masterDataHistory[i].materialValidationCharacteristics.materialWeight);
                lengthList.push(masterDataHistory[i].materialValidationCharacteristics.materialLength);
                widthList.push(masterDataHistory[i].materialValidationCharacteristics.materialWidth);
                heightList.push(masterDataHistory[i].materialValidationCharacteristics.materialHeight);
                temperatureLimitsList.push(masterDataHistory[i].materialValidationCharacteristics.materialTempLimits);
                shockVibrationList.push(masterDataHistory[i].materialValidationCharacteristics.materialVibrationLimits);
                altitudeRestrictionsList.push(masterDataHistory[i].materialValidationCharacteristics.materialAltitudeRestrictions);
                compressionRestrictionsList.push(masterDataHistory[i].materialValidationCharacteristics.materialCompressionRestrictions);
                alwaysUprightList.push(masterDataHistory[i].materialValidationCharacteristics.materialAlwaysUpRight === true ? 'YES' : 'NO');
                metallicList.push(masterDataHistory[i].materialValidationCharacteristics.materialOther.metallic === true ? 'YES' : 'NO');
                hazmatList.push(masterDataHistory[i].materialValidationCharacteristics.materialOther.hazmat === true ? 'YES' : 'NO');
                magneticList.push(masterDataHistory[i].materialValidationCharacteristics.materialOther.magnetic === true ? 'YES' : 'NO');
                lengthToleranceList.push(masterDataHistory[i].materialValidationCharacteristics.materialLengthTolerance);
                roundToleranceList.push(masterDataHistory[i].materialValidationCharacteristics.materialRoundTolerance);
                nonSkidToleranceList.push(masterDataHistory[i].materialValidationCharacteristics.materialNonSkidTolerance);
                supplierOrderQuantitiesControlList.push('');
                minEconomicOrderQuantitiesList.push(masterDataHistory[i].supplierOrderQuantitiesControls.minimumEconomicOrderQuantity);
                maxEconomicOrderQuantitiesList.push(masterDataHistory[i].supplierOrderQuantitiesControls.maximumEconomicOrderQuantity);
                maxEconomicProductWithdrawalRateList.push(masterDataHistory[i].supplierOrderQuantitiesControls.maximumEconomicProductWithdrawRate);
                minOrderLeadTimesList.push(masterDataHistory[i].supplierOrderQuantitiesControls.minimumOrderLeadTime);
                inboundSuppliersList.push('');
                inboundInitialList.push(masterDataHistory[i].inbound);
            }
            tableContent.push(createMasterData('Material ID', materialIDList));
            tableContent.push(createMasterData('Material Name', materialNameList));
            tableContent.push(createMasterData('Material Description', materialDescriptionList));
            tableContent.push(createMasterData('Outbound Customer Data', outboundCustomerDataList));
            let longestOutboundTemp = 0;
            for (let j = 0; j < outboundInitialList.length; j++) {
                let outboundTemp = outboundInitialList[j];
                if (outboundTemp.length > longestOutboundTemp) {
                    longestOutboundTemp = outboundTemp.length;
                }
            }
            for (let k = 0; k < longestOutboundTemp; k++) {
                let outboundFinalList = [];
                for (let l = 0; l < outboundInitialList.length; l++) {
                    let outboundTemp = outboundInitialList[l];
                    if (outboundTemp[k] === undefined) {
                        outboundFinalList.push('');
                    } else {
                        outboundFinalList.push(outboundTemp[k].outboundCompanyName + ' / '
                            + outboundTemp[k].outboundAddressLine1 + ' ' + outboundTemp[k].outboundAddressLine2 + ' '
                            + outboundTemp[k].outboundCity + ' ' + outboundTemp[k].outboundStateProvince + ' '
                            + outboundTemp[k].outboundPostalCode + ' ' + outboundTemp[k].outboundCountry);
                    }
                }
                tableContent.push(createMasterData('Company Name / Address', outboundFinalList));
            }
            tableContent.push(createMasterData('Material Validation Characteristics', materialValidationCharacteristicsList));
            tableContent.push(createMasterData('Volume', volumeList));
            tableContent.push(createMasterData('Weight', weightList));
            tableContent.push(createMasterData('Length', lengthList));
            tableContent.push(createMasterData('Width', widthList));
            tableContent.push(createMasterData('Height', heightList));
            tableContent.push(createMasterData('Temperature Limits', temperatureLimitsList));
            tableContent.push(createMasterData('Shock/Vibration', shockVibrationList));
            tableContent.push(createMasterData('Altitude Restrictions', altitudeRestrictionsList));
            tableContent.push(createMasterData('Compression Restrictions', compressionRestrictionsList));
            tableContent.push(createMasterData('Always Upright', alwaysUprightList));
            tableContent.push(createMasterData('Metallic', metallicList));
            tableContent.push(createMasterData('Hazmat', hazmatList));
            tableContent.push(createMasterData('Magnetic', magneticList));
            tableContent.push(createMasterData('Length Tolerance', lengthToleranceList));
            tableContent.push(createMasterData('Round Tolerance', roundToleranceList));
            tableContent.push(createMasterData('Non-Skid Tolerance', nonSkidToleranceList));
            tableContent.push(createMasterData('Supplier Order Quantities Controls', supplierOrderQuantitiesControlList));
            tableContent.push(createMasterData('Minimum Economic Order Quantities', minEconomicOrderQuantitiesList));
            tableContent.push(createMasterData('Maximum Economic Order Quantities', maxEconomicOrderQuantitiesList));
            tableContent.push(createMasterData('Maximum Economic Product Withdraw Rate', maxEconomicProductWithdrawalRateList));
            tableContent.push(createMasterData('Minimum Order Lead Times', minOrderLeadTimesList));
            let longestInboundTemp = 0;
            for (let j = 0; j < inboundInitialList.length; j++) {
                let inboundTemp = inboundInitialList[j];
                if (inboundTemp.length > longestInboundTemp) {
                    longestInboundTemp = inboundTemp.length;
                }
            }
            for (let k = 0; k < longestInboundTemp; k++) {
                let inboundFinalList = [];
                for (let l = 0; l < inboundInitialList.length; l++) {
                    let inboundTemp = inboundInitialList[l];
                    if (inboundTemp[k] === undefined) {
                        inboundFinalList.push('');
                    } else {
                        inboundFinalList.push(inboundTemp[k].inboundSupplierID + ' / ' + inboundTemp[k].inboundSupplierName
                            + ' / ' + inboundTemp[k].inboundAddressLine1 + ' ' + inboundTemp[k].inboundAddressLine2
                            + ' ' + inboundTemp[k].inboundCity + ' ' + inboundTemp[k].inboundStateProvince + ' '
                            + inboundTemp[k].inboundPostalCode + ' ' + inboundTemp[k].inboundCountry + ' / '
                            + inboundTemp[k].inboundSupplierPaymentTerms + ' / ' + inboundTemp[k].inboundMaterialID
                            + ' / ' + inboundTemp[k].inboundQuantity);
                    }
                }
                tableContent.push(createMasterData('Supplier ID / Supplier Name / Address / Supplier Payment Terms / Material ID / Quantity', inboundFinalList));
            }
        }
        return tableContent;
    };

    showMasterDataHistory = () => {
        this.setState({
            showMasterDataHistory: {
                open: true
            },
            masterDataHistory: this.createMasterDataTableContent()
        });
    };

    handleMasterDataHistoryClose = () => {
        this.setState({
            showMasterDataHistory: {
                open: false
            }
        })
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

    showShipmentHistory = (event, id) => {
        this.setState({ showProgressLogo: true });
        if (this.props.blockInformation === 'Shipping Information') {
            this.setState({
                showProgressLogo: false,
                showShipmentHistory: {
                    open: true
                },
                SARHistory: this.createSARTableContent(id)
            });
        } else {
            this.setState({
                showProgressLogo: false,
                showShipmentHistory: {
                    open: true
                },
                SARHistory: this.createSARTableContent(id)
            });
        }
    };

    handleShipmentHistoryClose = () => {
        this.setState({
            showShipmentHistory: {
                open: false
            }
        });
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

    render() {

        const { SARHistory, masterDataHistory } = this.state;

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
                            <div className='overlay'>
                                <img src={blocnetsLogo} className='App-logo-progress' alt='' />
                            </div>
                            :
                            ''}
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
                                    ''}
                            </Grid>
                        </Grid>
                        <br />
                        {this.props.tatData.length !== 0 ?
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper style={{ 'width': '100%' }}>
                                        <div style={{ 'overflowX': 'auto' }}>
                                            <Table style={{ 'tableLayout': 'fixed' }}>
                                                <TableBody style={{ 'overflowWrap': 'break-word' }}>
                                                    {this.props.tatData.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                {this.props.blockInformation === 'Master Material Data' ?
                                                                    <TableCell>
                                                                        {row.info1}
                                                                        {row.info1 === 'Material ID' && this.props.data.bomReducer.getBillOfMaterialsHistoryByMaterialIDSuccess ?
                                                                            <Tooltip title='Show History'>
                                                                                <IconButton
                                                                                    onClick={this.showMasterDataHistory}>
                                                                                    <HistoryIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            :
                                                                            ''}
                                                                    </TableCell>
                                                                    :
                                                                    <TableCell>
                                                                        {row.info1}
                                                                        {(row.info1 === 'Material ID' && this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess) ||
                                                                        (row.info1 === 'Shipment ID' && this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess) ?
                                                                            <Tooltip title='Show History'>
                                                                                <IconButton
                                                                                    onClick={event => this.showShipmentHistory(event, row.info1)}>
                                                                                    <HistoryIcon />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                            :
                                                                            ''}
                                                                    </TableCell>}
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
                            :
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper style={{ 'width': '100%', 'height': '50vh' }}>
                                        <div style={{ 'overflowX': 'auto' }}>
                                            <Typography align='left'>
                                            </Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>}
                        <br />
                        {this.props.tree.length !== 0 ?
                            <Grid container>
                                <Grid item>
                                    <MuiThemeProvider theme={buttonThemeRed}>
                                        <Switch
                                            onChange={this.handleChange}
                                            name='showMaterialMapSwitch'
                                            checked={this.state.showMaterialMapSwitch}
                                        />
                                        Show Material Map
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                            :
                            ''}
                        <br />
                        {this.props.shippingData.length !== 0 ?
                            <Grid container>
                                <Grid container item xs={12}>
                                    Shipping Information
                                </Grid>
                            </Grid>
                            :
                            ''}
                        <br />
                        {this.props.shippingData.length !== 0 ?
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper style={{ 'width': '100%' }}>
                                        <div style={{ 'overflowX': 'auto' }}>
                                            <Table style={{ 'tableLayout': 'fixed' }}>
                                                <TableBody style={{ 'overflowWrap': 'break-word' }}>
                                                    {this.props.shippingData.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                <TableCell>
                                                                    {row.info1}
                                                                    {(row.info1 === 'Material ID' && this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess) ||
                                                                    (row.info1 === 'Shipment ID' && this.props.data.sarReducer.getHistoryShippingDataByShipmentIDSuccess) ?
                                                                        <Tooltip title='Show History'>
                                                                            <IconButton
                                                                                onClick={event => this.showShipmentHistory(event, row.info1)}>
                                                                                <HistoryIcon />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        :
                                                                        ''}
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
                            :
                            ''}
                        <br />
                        <Dialog maxWidth='lg' fullWidth={true} open={this.state.showMaterialMap}
                                onClose={this.handleTreeClose}>
                            <div style={{ padding: 24 }}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <i className='material-icons' style={{ 'cursor': 'pointer' }}
                                           onClick={this.handleTreeClose}>close</i>
                                    </Grid>
                                </Grid>
                            </div>
                            <br />
                            <div>
                                <TrackAndTraceTreeView data={this.state} />
                            </div>
                        </Dialog>
                        <Dialog open={this.state.showShipmentHistory.open} onClose={this.handleShipmentHistoryClose}
                                autoScrollBodyContent={true}>
                            <div style={{ padding: 24 }}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <i className='material-icons' style={{ 'cursor': 'pointer' }}
                                           onClick={this.handleShipmentHistoryClose}>close</i>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid container item xs={12}>
                                        Shipment History
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container justify='center'>
                                    <Grid container item xs={12}>
                                        <Paper style={{ 'width': '100%' }}>
                                            <div style={{ 'overflowX': 'auto' }}>
                                                <Table style={{ 'tableLayout': 'fixed' }}>
                                                    <TableBody style={{ 'overflowWrap': 'break-word' }}>
                                                        {SARHistory.map(row => {
                                                            return (
                                                                <TableRow key={row.id}>
                                                                    {row.info1 === 'Material ID' ?
                                                                        <TableCell style={{
                                                                            'backgroundColor': 'black',
                                                                            'color': 'white'
                                                                        }}>
                                                                            {row.info1}
                                                                        </TableCell>
                                                                        :
                                                                        <TableCell>
                                                                            {row.info1}
                                                                        </TableCell>
                                                                    }
                                                                    {row.info1 === 'Material ID' ?
                                                                        <TableCell style={{
                                                                            'backgroundColor': 'black',
                                                                            'color': 'white'
                                                                        }}>
                                                                            {row.info2}
                                                                        </TableCell>
                                                                        :
                                                                        <TableCell>
                                                                            {row.info2}
                                                                        </TableCell>
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
                        <Dialog maxWidth='lg' fullWidth={true}
                                open={this.state.showMasterDataHistory.open} onClose={this.handleMasterDataHistoryClose}
                                autoScrollBodyContent={true}>
                            <div style={{ padding: 24 }}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <i className='material-icons' style={{ 'cursor': 'pointer' }}
                                           onClick={this.handleMasterDataHistoryClose}>close</i>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid container item xs={12}>
                                        Master Data History
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container justify='center'>
                                    <Grid container item xs={12}>
                                        <Paper style={{ 'width': '100%' }}>
                                            <div style={{ 'overflowX': 'auto' }}>
                                                <Table style={{ 'tableLayout': 'fixed' }}>
                                                    <TableBody style={{ 'overflowWrap': 'break-word' }}>
                                                        {masterDataHistory.map(row => {
                                                            return (
                                                                <TableRow key={row.id}>
                                                                    <TableCell style={{
                                                                        'backgroundColor': 'black',
                                                                        'color': 'white'
                                                                    }}>
                                                                        {row.info1}
                                                                    </TableCell>
                                                                    {row.info2.map(cell => {
                                                                        cellCount++;
                                                                        return (
                                                                            <TableCell key={cellCount}>
                                                                                {cell}
                                                                            </TableCell>
                                                                        );
                                                                    })}
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
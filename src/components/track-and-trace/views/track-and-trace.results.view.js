import React, { Component } from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';
import { createPRDConstruct } from '../../../redux/actions/tree.spawn.action';
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
            showProgressLogoDialog: false,
            showMasterDataHistory: {
                open: false
            },
            masterDataHistory: [],
            showShipmentHistory: {
                open: false
            },
            SARHistory: [],
            showPRDMaterialMap: false,
            tree: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
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
                            createSARData('Shipment ID', tmp.shipmentID)
                        );
                        if (tmp.listOfKeys) {
                            createSARData('Additional Shipping Information', '')
                            for (let j = 1; j < tmp.listOfKeys.length; j++) {
                                if (tmp.listOfKeys[j].materialID) {
                                    tableContent.push(
                                        createSARData('Material ID (' + j + ')', tmp.listOfKeys[j].materialID)
                                    );
                                } else {
                                    tableContent.push(
                                        createSARData('No Material ID for this record.', '')
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
        if (this.props.blockInformation === 'Shipping Information') {
            this.setState({
                showShipmentHistory: {
                    open: true
                },
                SARHistory: this.createSARTableContent(id)
            });
        } else {
            this.setState({
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

    showPRDMaterialMap = (event, productionOrderNo) => {
        this.setState({ showProgressLogoDialog: true });
        let tree = [];
        Promise.resolve(this.props.createPRDConstruct(productionOrderNo))
            .then(() => {
                if (this.props.data.spawnConstructReducer.prdConstruct !== '' && this.props.data.spawnConstructReducer.prdConstruct !== undefined) {
                    tree.push(this.props.data.spawnConstructReducer.prdConstruct);
                    this.setState({
                        showProgressLogoDialog: false,
                        tree: tree,
                        showPRDMaterialMap: true
                    });
                }
            })
    };

    handlePRDTreeClose = () => {
        this.setState({ showPRDMaterialMap: false });
    };

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            },
        });
    };

    render() {

        const { SARHistory, masterDataHistory } = this.state;

        return (

            <form>
                <div>
                    <div className='Module'>
                        <Grid container>
                            <Grid container item xs={12}>
                                {this.props.blockInformation}
                                {this.props.blockInformation === 'Master Material Data' ?
                                    <EditIcon
                                        className='TT-Edit-Button'
                                        onClick={this.handleEditMasterData}
                                    />
                                    :
                                    ''}
                            </Grid>
                        </Grid>
                        <br />
                        {this.props.tatData.length !== 0 ?
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper className='Module-Paper'>
                                        <div className='Module-Paper-Div'>
                                            <Table className='Module-Table'>
                                                <TableBody className='Module-TableBody'>
                                                    {this.props.tatData.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                {/*this.props.blockInformation === 'Master Material Data' ?
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
                                                                    </TableCell>*/}
                                                                <TableCell>
                                                                    {row.info1}
                                                                    {(this.props.blockInformation === 'Shipping Information' && row.info1 === 'Material ID' && this.props.data.sarReducer.getHistoryShippingDataByMaterialIDSuccess) ||
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
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper className='TT-Paper'>
                                        <div className='Module-Paper-Div'>
                                            <Typography align='left'>
                                            </Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>}
                        <br />
                        {this.props.tree.length !== 0 ?
                            <Grid container>
                                <Grid container item xs={12}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    classes={{
                                                        root: 'Module-Checkbox-Root',
                                                        checked: 'Module-Checkbox-Checked'
                                                    }}
                                                    checked={this.state.showMaterialMapSwitch}
                                                    name='showMaterialMapSwitch'
                                                    onClick={this.handleChange}
                                                />
                                            }
                                            label='Show Material Map'
                                        />
                                    </FormGroup>
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
                                    <Paper className='Module-Paper'>
                                        <div className='Module-Paper-Div'>
                                            <Table className='Module-Table'>
                                                <TableBody className='Module-TableBody'>
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
                        <Dialog fullWidth={true} maxWidth='lg' onClose={this.handleTreeClose}
                                open={this.state.showMaterialMap}>
                            <div className='Module'>
                                <Grid container>
                                    <Grid container item xs={12} justify='flex-end'>
                                        <i className='material-icons Module-TableCell-Click'
                                           onClick={this.handleTreeClose}>
                                            close
                                        </i>
                                    </Grid>
                                </Grid>
                            </div>
                            <br />
                            <div>
                                {/*TODO: state tree needs to be updated every time the tree unmounts*/}
                                <TrackAndTraceTreeView data={this.props} />
                            </div>
                        </Dialog>
                        <Dialog autoScrollBodyContent={true} onClose={this.handleShipmentHistoryClose}
                                open={this.state.showShipmentHistory.open}>
                            <div className='Module'>
                                <Grid container>
                                    <Grid container item xs={12} justify='flex-end'>
                                        <i className='material-icons Module-TableCell-Click'
                                           onClick={this.handleShipmentHistoryClose}>
                                            close
                                        </i>
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
                                                        {SARHistory.map(row => {
                                                            return (
                                                                <TableRow key={row.id}>
                                                                    {row.info1 === 'Material ID' ?
                                                                        <TableCell className='Module-TableCell-Black'>
                                                                            {row.info1}
                                                                        </TableCell>
                                                                        :
                                                                        <TableCell>
                                                                            {row.info1}
                                                                            {row.info1 === 'Production Order No.' && row.info2 !== '' ?
                                                                                <Tooltip title='Show Material Map'>
                                                                                    <IconButton
                                                                                        onClick={event => this.showPRDMaterialMap(event, row.info2)}>
                                                                                        <DeviceHubIcon className='TT-DeviceHubIcon'/>
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                                :
                                                                                ''
                                                                            }
                                                                        </TableCell>
                                                                    }
                                                                    {row.info1 === 'Material ID' ?
                                                                        <TableCell className='Module-TableCell-Black'>
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
                        <Dialog fullWidth={true} maxWidth='lg' onClose={this.handlePRDTreeClose}
                                open={this.state.showPRDMaterialMap}>
                            <div className='Module'>
                                <Grid container>
                                    <Grid container item xs={12} justify='flex-end'>
                                        <i className='material-icons Module-TableCell-Click'
                                           onClick={this.handlePRDTreeClose}>
                                            close
                                        </i>
                                    </Grid>
                                </Grid>
                            </div>
                            <br />
                            <div>
                                <TrackAndTraceTreeView data={this.state} />
                            </div>
                        </Dialog>
                        <Dialog autoScrollBodyContent={true} fullWidth={true} maxWidth='lg'
                                onClose={this.handleMasterDataHistoryClose}
                                open={this.state.showMasterDataHistory.open}>
                            <div className='Module'>
                                <Grid container>
                                    <Grid container item xs={12} justify='flex-end'>
                                        <i className='material-icons Module-TableCell-Click'
                                           onClick={this.handleMasterDataHistoryClose}>
                                            close
                                        </i>
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
                                        <Paper className='Module-Paper'>
                                            <div className='Module-Paper-Div'>
                                                <Table className='Module-Table'>
                                                    <TableBody className='Module-TableBody'>
                                                        {masterDataHistory.map(row => {
                                                            return (
                                                                <TableRow key={row.id}>
                                                                    <TableCell className='Module-TableCell-Black'>
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
                    <Snackbar autoHideDuration={this.props.snackbar.autoHideDuration} onClose={this.handleSnackbarClose}
                              open={this.props.snackbar.open}>
                        <SnackbarContent
                            classes={{ message: 'Module-Snackbar-Message' }}
                            className={this.props.snackbar.sbColor}
                            message={this.props.snackbar.message}
                        />
                    </Snackbar>
                    <Snackbar autoHideDuration={this.state.snackbar.autoHideDuration} onClose={this.handleSnackbarClose}
                              open={this.state.snackbar.open}>
                        <SnackbarContent
                            classes={{ message: 'Module-Snackbar-Message' }}
                            className={this.state.snackbar.sbColor}
                            message={this.state.snackbar.message}
                        />
                    </Snackbar>
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

const mapDispatchToProps = (dispatch) => {
    return {
        createPRDConstruct: (productionOrderNo) => dispatch(createPRDConstruct(productionOrderNo))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackAndTraceResultsView);
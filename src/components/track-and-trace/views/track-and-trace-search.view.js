import React, { Component } from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from 'material-ui/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from 'material-ui/MenuItem';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import {
    getBillOfMaterialsByMaterialID,
    getBillOfMaterialsByMaterialName,
    getBillOfMaterialsByMaterialDesc,
    getBillOfMaterialsByPartNumber,
    getBillOfMaterialsByPartName,
    getBillOfMaterialsByPartDesc
} from '../../../redux/actions/BOM/bill-of-materials.actions';
import {
    getShippingDataByShipmentID, getShippingDataByMaterialID
} from '../../../redux/actions/shipping.and.receiving.actions';
import { createConstruct } from '../../../redux/actions/tree.spawn.action';
import { connect } from 'react-redux';

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return { id: counter, info1, info2 };
}

function createTableContent(bomData) {
    let tableContent = [
        createData('Material ID', bomData.material.materialID),
        createData('Material Name', bomData.material.materialName),
        createData('Material Description', bomData.material.materialDescription)
        /* RELEASE-90: Hide Part No., Part Name and Part Description fields.
        createData('Part No.', eBOMData.material.partNo),
        createData('Part Name', eBOMData.material.partName),
        createData('Part Description', eBOMData.material.partDescription),
        */
    ];
    if (bomData.outbound) {
        for (let i = 0; i < bomData.outbound.length; i++) {
            tableContent.push(createData('Company Name / Address', bomData.outbound[i].outboundCompanyName + ' / '
                + bomData.outbound[i].outboundAddressLine1 + ' ' + bomData.outbound[i].outboundAddressLine2 + ' '
                + bomData.outbound[i].outboundCity + ' ' + bomData.outbound[i].outboundStateProvince + ' '
                + bomData.outbound[i].outboundPostalCode + ' ' + bomData.outbound[i].outboundCountry));
        }
    }
    tableContent.push(
        createData('Material Validation Characteristics', ''),
        createData('Volume', bomData.materialValidationCharacteristics.materialVolume),
        createData('Weight', bomData.materialValidationCharacteristics.materialWeight),
        createData('Length', bomData.materialValidationCharacteristics.materialLength),
        createData('Width', bomData.materialValidationCharacteristics.materialWidth),
        createData('Height', bomData.materialValidationCharacteristics.materialHeight),
        createData('Temperature Limits', bomData.materialValidationCharacteristics.materialTempLimits),
        createData('Shock/Vibration', bomData.materialValidationCharacteristics.materialVibrationLimits),
        createData('Altitude Restrictions', bomData.materialValidationCharacteristics.materialAltitudeRestrictions),
        createData('Compression Restrictions', bomData.materialValidationCharacteristics.materialCompressionRestrictions),
        createData('Always Upright', bomData.materialValidationCharacteristics.materialAlwaysUpRight === true ? 'YES' : 'NO'),
        createData('Metallic', bomData.materialValidationCharacteristics.materialOther.metallic === true ? 'YES' : 'NO'),
        createData('Hazmat', bomData.materialValidationCharacteristics.materialOther.hazmat === true ? 'YES' : 'NO'),
        createData('Magnetic', bomData.materialValidationCharacteristics.materialOther.magnetic === true ? 'YES' : 'NO'),
        createData('Length Tolerance', bomData.materialValidationCharacteristics.materialLengthTolerance),
        createData('Round Tolerance', bomData.materialValidationCharacteristics.materialRoundTolerance),
        createData('Non-Skid Tolerance', bomData.materialValidationCharacteristics.materialNonSkidTolerance),
        createData('Supplier Order Quantities Controls', ''),
        createData('Minimum Economic Order Quantities', bomData.supplierOrderQuantitiesControls.minimumEconomicOrderQuantity),
        createData('Maximum Economic Order Quantities', bomData.supplierOrderQuantitiesControls.maximumEconomicOrderQuantity),
        createData('Maximum Economic Product Withdraw Rate', bomData.supplierOrderQuantitiesControls.maximumEconomicProductWithdrawRate),
        createData('Minimum Order Lead Times', bomData.supplierOrderQuantitiesControls.minimumOrderLeadTime),
        createData('Inbound Supplier(s)', '')
    );
    if (bomData.inbound) {
        for (let i = 0; i < bomData.inbound.length; i++) {
            tableContent.push(createData('Address / Supplier Payment Terms / Material ID / Quantity',
                bomData.inbound[i].inboundAddressLine1 + ' ' + bomData.inbound[i].inboundAddressLine2 + ' '
                + bomData.inbound[i].inboundCity + ' ' + bomData.inbound[i].inboundStateProvince + ' '
                + bomData.inbound[i].inboundPostalCode + ' ' + bomData.inbound[i].inboundCountry + ' / '
                + bomData.inbound[i].inboundSupplierPaymentTerms + ' / ' + bomData.inbound[i].inboundMaterialID + ' / '
                + bomData.inbound[i].inboundQuantity));
        }
    }
    return tableContent;
}

let tree = [];

class TrackAndTraceSearchView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            searchKey: '',
            searchCriteria: '',
            openSearch: false,
            blockInformation: '',
            tatData: [],
            tree: [],
            shippingData: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleSearchKey = (event) => {
        this.setState({
            searchKey: event.target.value,
            searchCriteria: ''
        });
        if (event.target.value === '') {
            this.props.viewHandler('home', false, 'DRE02');
        } else {
            this.setState({ openSearch: true });
        }
    };

    handleSearchClose = () => {
        this.setState({ openSearch: false });
    };

    handleSearch = (event, searchCriteria) => {
        this.setState({
            searchCriteria: searchCriteria,
            openSearch: false
        });
    };

    showTrackAndTraceResultsView = (event) => {
        event.preventDefault();
        this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByMaterialNameSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByMaterialDescSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByPartNumberSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByPartNameSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByPartDescSuccess = '';
        this.props.data.sarReducer.getShippingDataByShipmentIDSuccess = '';
        this.props.data.spawnConstructReducer.construct = '';
        this.props.data.sarReducer.getShippingDataByMaterialIDSuccess = '';
        tree = [];
        let bomData = [];
        let shippingData = [];
        this.setState({
            showProgressLogo: true,
            blockInformation: 'Block Information',
            tatData: [],
            tree: [],
            shippingData: []
        });
        if (this.state.searchCriteria === 'Material ID') {
            Promise.resolve(this.props.getBillOfMaterialsByMaterialID(this.state.searchKey))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess) {
                        bomData = this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess;
                    }
                    this.handleBOMData(bomData);
                });
        } else if (this.state.searchCriteria === 'Material Name') {
            Promise.resolve(this.props.getBillOfMaterialsByMaterialName(this.state.searchKey))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByMaterialNameSuccess) {
                        bomData = this.props.data.bomReducer.getBillOfMaterialsByMaterialNameSuccess;
                    }
                    this.handleBOMData(bomData);
                });
        } else if (this.state.searchCriteria === 'Material Description') {
            Promise.resolve(this.props.getBillOfMaterialsByMaterialDesc(this.state.searchKey))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByMaterialDescSuccess) {
                        bomData = this.props.data.bomReducer.getBillOfMaterialsByMaterialDescSuccess;
                    }
                    this.handleBOMData(bomData);
                });
        } else if (this.state.searchCriteria === 'Part No.') {
            Promise.resolve(this.props.getBillOfMaterialsByPartNumber(this.state.searchKey))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByPartNumberSuccess) {
                        bomData = this.props.data.bomReducer.getBillOfMaterialsByPartNumberSuccess;
                    }
                    this.handleBOMData(bomData);
                });
        } else if (this.state.searchCriteria === 'Part Name') {
            Promise.resolve(this.props.getBillOfMaterialsByPartName(this.state.searchKey))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByPartNameSuccess) {
                        bomData = this.props.data.bomReducer.getBillOfMaterialsByPartNameSuccess;
                    }
                    this.handleBOMData(bomData);
                });
        } else if (this.state.searchCriteria === 'Part Description') {
            Promise.resolve(this.props.getBillOfMaterialsByPartDesc(this.state.searchKey))
                .then(() => {
                    if (this.props.data.bomReducer.getBillOfMaterialsByPartDescSuccess) {
                        bomData = this.props.data.bomReducer.getBillOfMaterialsByPartDescSuccess;
                    }
                    this.handleBOMData(bomData);
                });
        } else if (this.state.searchCriteria === 'Shipment ID') {
            Promise.resolve(this.props.getShippingDataByShipmentID(this.state.searchKey))
                .then(() => {
                    if (this.props.data.sarReducer.getShippingDataByShipmentIDSuccess) {
                        shippingData = this.props.data.sarReducer.getShippingDataByShipmentIDSuccess;
                    }
                    this.handleShippingData(shippingData);
                });
        }
    };

    handleBOMData = (bomData) => {
        let bomDataLength = JSON.stringify(bomData).length;
        let shippingData = [];
        if (bomDataLength > 2) {
            counter = 0;
            this.setState({
                blockInformation: 'Master Material Data',
                tatData: createTableContent(bomData)
            });
            if (bomData.material.materialID !== '') {
                Promise.resolve(this.props.createConstruct(bomData.material.materialID))
                    .then(() => {
                        if (this.props.data.spawnConstructReducer.construct !== '' && this.props.data.spawnConstructReducer.construct !== undefined) {
                            tree.push(this.props.data.spawnConstructReducer.construct);
                            this.setState({
                                showProgressLogo: false,
                                tree: tree,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Successfully tracked a block!',
                                    open: true,
                                    sbColor: '#23CE6B'
                                }
                            });
                            Promise.resolve(this.props.getShippingDataByMaterialID(bomData.material.materialID))
                                .then(() => {
                                    if (this.props.data.sarReducer.getShippingDataByMaterialIDSuccess) {
                                        shippingData = this.props.data.sarReducer.getShippingDataByMaterialIDSuccess;
                                    }
                                    this.handleShippingDataByMaterialID('trackandtraceresultsview', false, 'TAT02', this.state.blockInformation, this.state.tatData, this.state.tree, shippingData, this.state.snackbar);
                                });
                        } else {
                            this.setState({
                                showProgressLogo: false,
                                tree: [],
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Successfully tracked a block!',
                                    open: true,
                                    sbColor: '#23CE6B'
                                }
                            });
                            Promise.resolve(this.props.getShippingDataByMaterialID(bomData.material.materialID))
                                .then(() => {
                                    if (this.props.data.sarReducer.getShippingDataByMaterialIDSuccess) {
                                        shippingData = this.props.data.sarReducer.getShippingDataByMaterialIDSuccess;
                                    }
                                    this.handleShippingDataByMaterialID('trackandtraceresultsview', false, 'TAT02', this.state.blockInformation, this.state.tatData, this.state.tree, shippingData, this.state.snackbar);
                                });
                        }
                    });
            } else {
                this.setState({
                    showProgressLogo: false,
                    tree: [],
                    shippingData: [],
                    snackbar: {
                        autoHideDuration: 2000,
                        message: 'Successfully tracked a block!',
                        open: true,
                        sbColor: '#23CE6B'
                    }
                });
                this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.blockInformation, this.state.tatData, this.state.tree, this.state.shippingData, this.state.snackbar);
            }
        } else {
            this.setState({
                showProgressLogo: false,
                blockInformation: 'Block Information',
                tatData: [],
                tree: [],
                shippingData: [],
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            });
            this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.blockInformation, this.state.tatData, this.state.tree, this.state.shippingData, this.state.snackbar);
        }
    };

    handleShippingData = (shippingData) => {
        let shippingDataLength = JSON.stringify(shippingData).length;
        let dataManualShipping = 'NO';
        let dataShipmentSent = 'NO';
        let dataShipmentCompleted = 'NO';
        let dataReceivedShipment = 'NO';
        let dataReceivedOrder = 'NO';
        if (shippingDataLength > 2) {
            if (shippingData.manuallyShipped === true) {
                dataManualShipping = 'YES'
            }
            if (shippingData.shipmentSent === true) {
                dataShipmentSent = 'YES'
            }
            if (shippingData.shipmentCompleted === true) {
                dataShipmentCompleted = 'YES'
            }
            if (shippingData.receivedShipment === true) {
                dataReceivedShipment = 'YES'
            }
            if (shippingData.receivedOrder === true) {
                dataReceivedOrder = 'YES'
            }
            counter = 0;
            this.setState({
                showProgressLogo: false,
                blockInformation: 'Shipping Information',
                tatData: [
                    createData('Material ID', shippingData.materialID),
                    createData('Shipment ID', shippingData.shipmentID),
                    createData('Planned Ship Date', shippingData.plannedShipDate),
                    createData('Actual Ship Date', shippingData.actualShipDate),
                    createData('Address', shippingData.address1 + ' ' + shippingData.address2 + ' ' + shippingData.city + ' ' + shippingData.state + ' ' + shippingData.country + ' ' + shippingData.postalCode),
                    createData('Manual Shipping', dataManualShipping),
                    createData('Shipment Completed', dataShipmentCompleted),
                    createData('Shipment Quantity', shippingData.shipmentQuantity),
                    createData('Shipment Sent', dataShipmentSent),
                    createData('Received Shipment', dataReceivedShipment),
                    createData('Received Order', dataReceivedOrder)
                ],
                tree: [],
                shippingData: [],
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Successfully tracked a block!',
                    open: true,
                    sbColor: '#23CE6B'
                }
            });
        } else {
            this.setState({
                showProgressLogo: false,
                blockInformation: 'Block Information',
                tatData: [],
                tree: [],
                shippingData: [],
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            });
        }
        this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.blockInformation, this.state.tatData, this.state.tree, this.state.shippingData, this.state.snackbar);
    };

    handleShippingDataByMaterialID = (show, open, transactionCode, blockInformation, tatData, tree, shippingData, snackbar) => {
        let shippingDataLength = JSON.stringify(shippingData).length;
        let dataManualShipping = 'NO';
        let dataShipmentSent = 'NO';
        let dataShipmentCompleted = 'NO';
        let dataReceivedShipent = 'NO';
        let dataReceivedOrder = 'NO';
        if (shippingDataLength > 2) {
            if (shippingData.manuallyShipped === true) {
                dataManualShipping = 'YES'
            }
            if (shippingData.shipmentSent === true) {
                dataShipmentSent = 'YES'
            }
            if (shippingData.shipmentCompleted === true) {
                dataShipmentCompleted = 'YES'
            }
            if (shippingData.receivedShipment === true) {
                dataReceivedShipent = 'YES'
            }
            if (shippingData.receivedOrder === true) {
                dataReceivedOrder = 'YES'
            }
            counter = 0;
            this.setState({
                shippingData: [
                    createData('Material ID', shippingData.materialID),
                    createData('Shipment ID', shippingData.shipmentID),
                    createData('Planned Ship Date', shippingData.plannedShipDate),
                    createData('Actual Ship Date', shippingData.actualShipDate),
                    createData('Address', shippingData.address1 + ' ' + shippingData.address2 + ' ' + shippingData.city + ' ' + shippingData.state + ' ' + shippingData.country + ' ' + shippingData.postalCode),
                    createData('Manual Shipping', dataManualShipping),
                    createData('Shipment Completed', dataShipmentCompleted),
                    createData('Shipment Quantity', shippingData.shipmentQuantity),
                    createData('Shipment Sent', dataShipmentSent),
                    createData('Received Shipment', dataReceivedShipent),
                    createData('Received Order', dataReceivedOrder)
                ]
            });
        } else {
            this.setState({
                shippingData: [],
            });
        }
        this.props.viewHandler(show, open, transactionCode, blockInformation, tatData, tree, this.state.shippingData, snackbar);
    };

    render() {

        return (

            <div style={{ 'width': 'inherit' }}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'><img src={blocnetsLogo} className='App-logo-progress' alt='' />
                        </div> : ''}
                </div>
                <div>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor='search-with-icon-adornment'>Search</InputLabel>
                        <Input
                            value={this.state.searchKey}
                            name='searchKey'
                            id='search-with-icon-adornment'
                            type='search'
                            startAdornment={
                                this.state.searchCriteria ?
                                    <InputAdornment position='start'>
                                        {this.state.searchCriteria}:
                                    </InputAdornment>
                                    : ''
                            }
                            endAdornment={
                                this.state.searchCriteria && this.state.searchKey ?
                                    <InputAdornment position='end'>
                                        <SearchIcon
                                            onClick={this.showTrackAndTraceResultsView}
                                            style={{ 'cursor': 'pointer' }}
                                        />
                                    </InputAdornment> :
                                    <InputAdornment position='end'>
                                        <SearchIcon
                                            style={{ 'fill': 'black' }}
                                        />
                                    </InputAdornment>
                            }
                            onChange={this.handleSearchKey}
                            autoComplete='off'
                        />
                        <Popper open={this.state.openSearch} transition disablePortal
                                style={{ 'position': 'relative' }}>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id='menu-list-grow'
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={this.handleSearchClose}>
                                            <MenuList style={{ 'textAlign': 'left' }}>
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Material ID')}>Material
                                                    ID: {this.state.searchKey}</MenuItem>
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Material Name')}>Material
                                                    Name: {this.state.searchKey}</MenuItem>
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Material Description')}>Material
                                                    Description: {this.state.searchKey}</MenuItem>
                                                {
                                                    /* RELEASE-90: Hide Part No., Part Name and Part Description fields.
                                                    <MenuItem className='menuList'
                                                              onClick={event => this.handleSearch(event, 'Part No.')}>Part
                                                        No.: {this.state.searchKey}</MenuItem>
                                                    <MenuItem className='menuList'
                                                              onClick={event => this.handleSearch(event, 'Part Name')}>Part
                                                        Name: {this.state.searchKey}</MenuItem>
                                                    <MenuItem className='menuList'
                                                              onClick={event => this.handleSearch(event, 'Part Description')}>Part
                                                        Description: {this.state.searchKey}</MenuItem>
                                                        */
                                                }
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Shipment ID')}>Shipment
                                                    ID: {this.state.searchKey}</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </FormControl>
                    <br /><br /><br />
                    {this.props.trackButtonFlag === true ?
                        <Grid container spacing={24}>
                            <Grid container item xs={12} justify='center'>
                                <Button type='submit' value='Submit' variant='contained'
                                        onClick={event => this.showTrackAndTraceResultsView(event)}
                                        disabled={!this.state.searchCriteria || !this.state.searchKey}
                                        className='Module-Button-Search'>
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                        :
                        ''
                    }
                </div>
            </div>
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
        getBillOfMaterialsByMaterialID: (url) => dispatch(getBillOfMaterialsByMaterialID(url)),
        getBillOfMaterialsByMaterialName: (url) => dispatch(getBillOfMaterialsByMaterialName(url)),
        getBillOfMaterialsByMaterialDesc: (url) => dispatch(getBillOfMaterialsByMaterialDesc(url)),
        getBillOfMaterialsByPartNumber: (url) => dispatch(getBillOfMaterialsByPartNumber(url)),
        getBillOfMaterialsByPartName: (url) => dispatch(getBillOfMaterialsByPartName(url)),
        getBillOfMaterialsByPartDesc: (url) => dispatch(getBillOfMaterialsByPartDesc(url)),
        getShippingDataByShipmentID: (url) => dispatch(getShippingDataByShipmentID(url)),
        createConstruct: (materialID) => dispatch(createConstruct(materialID)),
        getShippingDataByMaterialID: (url) => dispatch(getShippingDataByMaterialID(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackAndTraceSearchView);
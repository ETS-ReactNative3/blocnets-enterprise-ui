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
    getShippingDataByShipmentID
} from '../../../redux/actions/shipping.and.receiving.actions';
import { createConstruct } from '../../../redux/actions/tree.spawn.action';
import { connect } from 'react-redux';

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return { id: counter, info1, info2 };
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
            tatData: [],
            tree: [],
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
        tree = [];
        let bomData = [];
        let shippingData = [];
        this.setState({
            showProgressLogo: true,
            tatData: [],
            tree: []
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
        if (bomDataLength > 2) {
            let alwaysUpright = bomData.material.materialAlwaysUpRight === true ? 'YES' : 'NO';
            let metallic = bomData.material.materialOther[0].substr(10, 1) === 't' ? 'YES' : 'NO';
            let hazmat = bomData.material.materialOther[1].substr(8, 1) === 't' ? 'YES' : 'NO';
            let magnetic = bomData.material.materialOther[2].substr(10, 1) === 't' ? 'YES' : 'NO';
            counter = 0;
            this.setState({
                tatData: [
                    createData('Material ID', bomData.material.materialNumber),
                    createData('Material Name', bomData.material.materialSerialNumber),
                    createData('Material Description', bomData.material.materialDescription),
                    /* RELEASE-90: Hide Part No., Part Name and Part Description fields.
                    createData('Part No.', bomData.material.materialMvmtMaterialNumber),
                    createData('Part Name', bomData.material.materialMvmtCageCode),
                    createData('Part Description', bomData.material.materialMvmtSupplierName),
                    */
                    createData('Material Shipping Information', ''),
                    createData('Company Name', bomData.material.materialMvmtShippedFrom),
                    createData('Address', bomData.material.materialMvmtShippedTo),
                    createData('IP Address', bomData.material.materialMvmtLocation),
                    createData('Material Dimensions', ''),
                    createData('Volume', bomData.material.materialVolume),
                    createData('Weight', bomData.material.materialWeight),
                    createData('Length', bomData.material.materialLength),
                    createData('Width', bomData.material.materialWidth),
                    createData('Height', bomData.material.materialHeight),
                    createData('Material Handling Characteristics', ''),
                    createData('Temperature Limits', bomData.material.materialTempLimits),
                    createData('Shock/Vibration', bomData.material.materialVibrationLimits),
                    createData('Altitude Restrictions', bomData.material.materialAltitudeRestrictions),
                    createData('Compression Restrictions', bomData.material.materialCompressionRestrictions),
                    createData('Always Upright', alwaysUpright),
                    createData('Material Other', ''),
                    createData('Metallic', metallic),
                    createData('Hazmat', hazmat),
                    createData('Magnetic', magnetic),
                    createData('Material Quality Standards', ''),
                    createData('Length Tolerance', bomData.material.materialLengthTolerance),
                    createData('Round Tolerance', bomData.material.materialRoundTolerance),
                    createData('Non-Skid Tolerance', bomData.material.materialNonSkidTolerance),
                    createData('Supplier Customer Definition', ''),
                    createData('Ship To Address', bomData.supplier.supplierCustomerShipToAddress),
                    createData('Ship To IP Address', bomData.supplier.supplierCustomerShipToIPAddress),
                    createData('Bill To Address', bomData.supplier.supplierCustomerBillToAddress),
                    createData('Bill To IP Address', bomData.supplier.supplierCustomerBillToIPAddress),
                    createData('Supplier Payment Terms', ''),
                    createData('Payment Terms', bomData.supplier.supplierName),
                    createData('Supplier Order Quantities Controls', ''),
                    createData('Minimum Economic Order Quantities', bomData.supplier.supplierMinimumEconomicOrderQuantity),
                    createData('Maximum Economic Order Quantities', bomData.supplier.supplierMaximumEconomicOrderQuantity),
                    createData('Maximum Economic Product Withdraw Rate', bomData.supplier.supplierMaximumEconomicProductWithdrawRate),
                    createData('Minimum Order Lead Times', bomData.supplier.supplierMinimumOrderLeadTime),
                    createData('Suppliers', ''),
                    createData('Address', bomData.supplier.supplierLocationAddress),
                    createData('IP Address', bomData.supplier.supplierCageCode),
                    createData('Material Supplied Per IP Address', bomData.supplier.supplierMaterialNumber),
                    createData('Supplier Payment Terms', bomData.supplier.supplierProductionCapacityCommittedToNetwork),
                    createData('Supplier Order Policy', bomData.supplier.supplierOrderedLeadTime)
                ]
            });
            if (bomData.material.materialNumber !== '') {
                Promise.resolve(this.props.createConstruct(bomData.material.materialNumber))
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
                            this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.tatData, this.state.tree, this.state.snackbar);
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
                            this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.tatData, this.state.tree, this.state.snackbar);
                        }
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
                this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.tatData, this.state.tree, this.state.snackbar);
            }
        } else {
            this.setState({
                showProgressLogo: false,
                tatData: [],
                tree: [],
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            });
            this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.tatData, this.state.tree, this.state.snackbar);
        }
    };

    handleShippingData = (shippingData) => {
        let shippingDataLength = JSON.stringify(shippingData).length;
        let dataManualShipping = 'NO';
        let dataShipmentSent = 'NO';
        let dataShipmentCompleted = 'NO';
        let dataShipped = 'NO';
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
            if (shippingData.shipped === true) {
                dataShipped = 'YES'
            }
            if (shippingData.receivedShipment === true) {
                dataReceivedShipent = 'YES'
            }
            if (shippingData.receivedOrder === true) {
                dataReceivedOrder = 'YES'
            }
            counter = 0;
            this.setState({
                showProgressLogo: false,
                tatData: [
                    createData('Material ID', shippingData.materialID),
                    createData('Shipment ID', shippingData.shipmentID),
                    createData('Address', shippingData.address1 + ' ' + shippingData.address2 + ' ' + shippingData.city + ' ' + shippingData.state + ' ' + shippingData.country + ' ' + shippingData.postalCode),
                    createData('IP Address', shippingData.ipAddress),
                    createData('Manual Shipping', dataManualShipping),
                    createData('Delivery Order No.', shippingData.deliverOrderNo),
                    createData('Shipment Quantity', shippingData.shipmentQuantity),
                    createData('Shipment Sent', dataShipmentSent),
                    createData('Shipment Completed', dataShipmentCompleted),
                    createData('Shipped', dataShipped),
                    createData('Received Shipment', dataReceivedShipent),
                    createData('Received Order', dataReceivedOrder)
                ],
                tree: [],
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
                tatData: [],
                tree: [],
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            });
        }
        this.props.viewHandler('trackandtraceresultsview', false, 'TAT02', this.state.tatData, this.state.tree, this.state.snackbar);
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
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Part No.')}>Part
                                                    No.: {this.state.searchKey}</MenuItem>
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Part Name')}>Part
                                                    Name: {this.state.searchKey}</MenuItem>
                                                <MenuItem className='menuList'
                                                          onClick={event => this.handleSearch(event, 'Part Description')}>Part
                                                    Description: {this.state.searchKey}</MenuItem>
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackAndTraceSearchView);
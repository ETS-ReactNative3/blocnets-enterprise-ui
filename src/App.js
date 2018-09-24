import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {authenticate} from './redux/actions/authentication.action';
import {connect} from 'react-redux';
import TrackAndTraceResultsView from './components/track-and-trace/views/track-and-trace.results.view';
import DocumentDashboardView
    from './components/document-review-and-entry/document-dashboard/document.dashboard.view';
import BillOfMaterials from './components/bill-of-materials/bill-of-materials';
import ShippingView from './components/shipping-view/shipping.view';
import ReceivingView from './components/receiving-view/receiving.view';
import StartProductionView from './components/production/views/start.production.view';
import CompleteProductionView from './components/production/views/complete.production.view';
import TrackAndTraceView from './components/track-and-trace/views/track-and-trace.view';
import SendDocumentView from './components/document-review-and-entry/document-send/document.send.view';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import AppBar from 'material-ui/AppBar';
import Grid from '@material-ui/core/Grid';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import {FormControl} from '@material-ui/core';
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
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import Drawer from 'material-ui/Drawer';
import logo from './blocknetwhite-1.png';
import paperLogo from './blocnets-logo.png'
import blocnetsLogo from "./blocknetwhite-1.png";
import Typography from '@material-ui/core/Typography';
import {
    getBillOfMaterialsByMaterialID,
    getBillOfMaterialsByMaterialName,
    getBillOfMaterialsByMaterialDesc,
    getBillOfMaterialsByPartNumber,
    getBillOfMaterialsByPartName,
    getBillOfMaterialsByPartDesc
} from './redux/actions/BOM/bill-of-materials.actions';
import {
    getShippingDataByShipmentID
} from './redux/actions/shipping.and.receiving.actions';
import {getEachMessageForUserID} from './redux/actions/user.message.array.action';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    },
});

const appBarLogoStyle = {
    maxWidth: 50,
    maxHeight: 50,
    paddingTop: 10
};

const messageIconStyle = {
    transform: "scale(1.0)"
};

const userIconStyle = {
    color: "white",
    transform: "scale(2.1)"
};

const paperStyle = {
    width: "70%",
    height: '85%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
};

const paperLogoStyle = {
    maxHeight: 65,
    paddingTop: 10
};

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return {id: counter, info1, info2};
}

class App extends Component {

    /* Dev Note: Will automatically fire the prop actions, or http request, once component mounts */
    componentDidMount() {
        this.props.authenticate();
        Promise.resolve(this.props.getEachMessageForUserID('BadData'))
            .then(() => {
                this.setState({badgeContent: this.props.data.umaReducer.getEachMessageForUserIDSuccess.length})
            })
        setInterval(() => {
            this.setState({currentDateAndTime: new Date().toUTCString()})
        }, 1000)
        setInterval(() => {
            Promise.resolve(this.props.getEachMessageForUserID('BadData'))
                .then(() => {
                    this.setState({badgeContent: this.props.data.umaReducer.getEachMessageForUserIDSuccess.length})
                })
        }, 30000);
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            show: null,
            transactionCode: 'DRE02',
            showProgressLogo: false,
            searchKey: '',
            openSearch: false,
            searchCriteria: '',
            tatData: [],
            materialID: '',
            badgeContent: 0,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    showMainView = () => {
        this.setState({
            show: 'home',
            open: false,
            transactionCode: 'DRE02'
        });
    };

    showTrackAndTraceResultsView = () => {
        this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByMaterialNameSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByMaterialDescSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByPartNumberSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByPartNameSuccess = '';
        this.props.data.bomReducer.getBillOfMaterialsByPartDescSuccess = '';
        this.props.data.sarReducer.getShippingDataByShipmentIDSuccess = '';
        this.setState({
            showProgressLogo: true,
            tatData: [],
            materialID: ''
        });
        let bomData = [];
        let shippingData = [];
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
        this.setState({
            show: 'trackandtraceresultsview',
            open: false,
            transactionCode: 'TAT02'
        });
    };

    showBillOfMaterials = () => {
        this.setState({
            show: 'billofmaterials',
            open: false,
            transactionCode: 'eBOM01'
        });
    };

    showShippingView = () => {
        this.setState({
            show: 'shippingview',
            open: false,
            transactionCode: 'SAR01'
        });
    };

    showReceivingView = () => {
        this.setState({
            show: 'receivingview',
            open: false,
            transactionCode: 'SAR02'
        });
    };

    showStartProductionView = () => {
        this.setState({
            show: 'startproductionview',
            open: false,
            transactionCode: 'PRD01'
        });
    };

    showCompleteProductionView = () => {
        this.setState({
            show: 'completeproductionview',
            open: false,
            transactionCode: 'PRD02'
        })
    };

    showTrackAndTraceView = () => {
        this.setState({
            show: 'trackandtraceview',
            open: false,
            transactionCode: 'TAT01'
        });
    };

    showSendDocumentView = () => {
        this.setState({
            show: 'senddocumentview',
            open: false,
            transactionCode: 'DRE01'
        });
    };

    handleSearchKey = (event) => {
        this.setState({
            searchKey: event.target.value,
            searchCriteria: ''
        });
        if (event.target.value === '') {
            this.setState({
                show: 'home',
                openSearch: false
            });
        } else {
            this.setState({openSearch: true});
        }
    };

    handleSearchClose = () => {
        this.setState({openSearch: false});
    };

    handleSearch = (event, searchCriteria) => {
        this.setState({
            searchCriteria: searchCriteria,
            openSearch: false
        });
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
                showProgressLogo: false,
                tatData: [
                    createData('Material ID', bomData.material.materialNumber),
                    createData('Material Name', bomData.material.materialSerialNumber),
                    createData('Material Description', bomData.material.materialDescription),
                    createData('Part No.', bomData.material.materialMvmtMaterialNumber),
                    createData('Part Name', bomData.material.materialMvmtCageCode),
                    createData('Part Description', bomData.material.materialMvmtSupplierName),
                    createData('Material Shipping Information', ''),
                    createData('Address', bomData.material.materialMvmtShippedTo),
                    createData('IP Address', bomData.material.materialMvmtLocation),
                    createData('Company Name', bomData.material.materialMvmtShippedFrom),
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
                ],
                materialID: bomData.material.materialNumber,
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
                materialID: '',
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            });
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
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            });
        }
    };

    handleDREData = (refreshBadgeContent) => {
        if (refreshBadgeContent === true) {
            Promise.resolve(this.props.getEachMessageForUserID('BadData'))
                .then(() => {
                    this.setState({badgeContent: this.props.data.umaReducer.getEachMessageForUserIDSuccess.length})
                })
        }

    };

    render() {

        let content = null;

        switch (this.state.show) {
            case 'trackandtraceresultsview':
                content = (<TrackAndTraceResultsView materialID={this.state.materialID}
                                                     snackbar={this.state.snackbar}
                                                     tatData={this.state.tatData}
                />);
                break;
            case 'billofmaterials':
                content = (<BillOfMaterials/>);
                break;
            case 'shippingview':
                content = (<ShippingView/>);
                break;
            case 'receivingview':
                content = (<ReceivingView/>);
                break;
            case 'startproductionview':
                content = (<StartProductionView/>);
                break;
            case 'completeproductionview':
                content = (<CompleteProductionView/>);
                break;
            case 'trackandtraceview':
                content = (<TrackAndTraceView/>);
                break;
            case 'senddocumentview':
                content = (<SendDocumentView viewHandler={this.handleDREData}/>);
                break;
            default:
                content = (
                    <Router>
                        <div>
                            <Route exact path="/" component={DocumentDashboardView}/>
                        </div>
                    </Router>);
        }

        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    {/* Main navigation bar menu for components */}
                    <AppBar position="static" className="App-header"
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonClick={this.handleToggle}>
                        <Grid container spacing={24}>
                            <Grid item xs={3}>
                                <ToolbarTitle
                                    text={<img src={logo} className="App-logo" alt="logo"/>}
                                    alt="Blocnets"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth={true}>
                                    <InputLabel htmlFor="search-with-icon-adornment">Search</InputLabel>
                                    <Input
                                        value={this.state.searchKey}
                                        name="searchKey"
                                        id="search-with-icon-adornment"
                                        type="search"
                                        startAdornment={
                                            this.state.searchCriteria ?
                                                <InputAdornment position="start">
                                                    {this.state.searchCriteria}:
                                                </InputAdornment>
                                                : ''
                                        }
                                        endAdornment={
                                            this.state.searchCriteria && this.state.searchKey ?
                                                <InputAdornment position="end">
                                                    <SearchIcon
                                                        onClick={this.showTrackAndTraceResultsView}
                                                        style={{"cursor": "pointer"}}
                                                    />
                                                </InputAdornment> :
                                                <InputAdornment position="end">
                                                    <SearchIcon
                                                        style={{"fill": "black"}}
                                                    />
                                                </InputAdornment>
                                        }
                                        onChange={this.handleSearchKey}
                                    />
                                    <Popper open={this.state.openSearch} transition disablePortal
                                            style={{"position": "relative"}}>
                                        {({TransitionProps, placement}) => (
                                            <Grow
                                                {...TransitionProps}
                                                id="menu-list-grow"
                                                style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={this.handleSearchClose}>
                                                        <MenuList style={{"textAlign": "left"}}>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Material ID")}>Material
                                                                ID: {this.state.searchKey}</MenuItem>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Material Name")}>Material
                                                                Name: {this.state.searchKey}</MenuItem>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Material Description")}>Material
                                                                Description: {this.state.searchKey}</MenuItem>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Part No.")}>Part
                                                                No.: {this.state.searchKey}</MenuItem>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Part Name")}>Part
                                                                Name: {this.state.searchKey}</MenuItem>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Part Description")}>Part
                                                                Description: {this.state.searchKey}</MenuItem>
                                                            <MenuItem className="menuList"
                                                                      onClick={event => this.handleSearch(event, "Shipment ID")}>Shipment
                                                                ID: {this.state.searchKey}</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton aria-label="pending messages" onClick={this.showMainView}>
                                    <Badge badgeContent={this.state.badgeContent} color="secondary"
                                           style={messageIconStyle}>
                                        <MailIcon/>
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton aria-label="User Account" onClick={this.showMainView}>
                                    <UserIcon
                                        style={userIconStyle}
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </AppBar>
                </MuiThemeProvider>
                {/* Side Drawer's navigation bar menu for viewing content */}
                <Drawer docked={false} width={250} open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}>
                    <AppBar
                        className="App-bar"
                        onClick={this.handleToggle}
                        title={<img src={logo} style={appBarLogoStyle} alt="Blocnets"/>}
                    />
                    <MenuItem id="showBillOfMaterialsId" onClick={this.showBillOfMaterials}>Master Material
                        Data</MenuItem>
                    <hr/>
                    <MenuItem id="showShippingViewId" onClick={this.showShippingView}>Shipping</MenuItem>
                    <hr/>
                    <MenuItem id="showReceivingViewId" onClick={this.showReceivingView}>Receiving</MenuItem>
                    <hr/>
                    <MenuItem id="showStartProductionViewId" onClick={this.showStartProductionView}>Start
                        Production Tracking</MenuItem>
                    <hr/>
                    <MenuItem id="showCompleteProductionViewId" onClick={this.showCompleteProductionView}>Stop
                        Production Tracking</MenuItem>
                    <hr/>
                    <MenuItem id="showTrackAndTraceViewId" onClick={this.showTrackAndTraceView}>Track and
                        Trace</MenuItem>
                    <hr/>
                    <MenuItem id="showSendDocumentViewId" onClick={this.showSendDocumentView}>Send a Document</MenuItem>
                    <hr/>
                    <MenuItem id="showSendDocumentViewId" onClick={this.showSendDocumentView}>Save a Document</MenuItem>
                </Drawer>
                {/* Page View with content loaded */}
                <Paper className="White-theme" style={paperStyle} zDepth={5}>
                    <Toolbar style={{"justifyContent": "center", "height": 80}}>
                        <ToolbarTitle
                            text={<img src={paperLogo} style={paperLogoStyle} alt="Blocnets"/>}
                        />
                    </Toolbar>
                    {content}
                </Paper>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt=""/>
                        </div> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <MuiThemeProvider theme={theme}>
                            <Grid container item xs={12}>
                                <Grid container item xs>
                                    <Typography align="right" style={{"width": "100%"}}>
                                        {this.state.transactionCode} | System Number
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid container item xs>
                                    <Typography align="left" style={{"width": "100%"}}>
                                        © 2018 ALL RIGHTS RESERVED.
                                    </Typography>
                                </Grid>
                                <Grid container item xs>
                                    <Typography align="right" style={{"width": "100%"}}>
                                        {this.state.currentDateAndTime}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MuiThemeProvider>
                    </Grid>
                </div>
            </div>
        );

    }

}

/*
App.propTypes = {
  authenticate: PropTypes.func.isRequired,
};
 */

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

// This way, we can call our action creator by doing this.props.authenticate();
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        getBillOfMaterialsByMaterialID: (url) => dispatch(getBillOfMaterialsByMaterialID(url)),
        getBillOfMaterialsByMaterialName: (url) => dispatch(getBillOfMaterialsByMaterialName(url)),
        getBillOfMaterialsByMaterialDesc: (url) => dispatch(getBillOfMaterialsByMaterialDesc(url)),
        getBillOfMaterialsByPartNumber: (url) => dispatch(getBillOfMaterialsByPartNumber(url)),
        getBillOfMaterialsByPartName: (url) => dispatch(getBillOfMaterialsByPartName(url)),
        getBillOfMaterialsByPartDesc: (url) => dispatch(getBillOfMaterialsByPartDesc(url)),
        getShippingDataByShipmentID: (url) => dispatch(getShippingDataByShipmentID(url)),
        getEachMessageForUserID: (user) => dispatch(getEachMessageForUserID(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, {Component} from 'react';
import './App.css';
import blocnetsLogo from "./blocknetwhite-1.png";
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {authenticate} from './redux/actions/authentication.action';
import {connect} from 'react-redux';
import DocumentDashboardView
    from './components/document-review-and-entry/document-dashboard/document.dashboard.view';
import TrackAndTraceResultsView from './components/track-and-trace/views/track-and-trace.results.view';
import ShippingView from './components/shipping-view/shipping.view';
import ReceivingView from './components/receiving-view/receiving.view';
import ProductionView from './components/production-view/production.view';
import TrackerView from './components/track-and-trace/views/track-and-trace.view';
import BillOfMaterials from './components/bill-of-materials/bill-of-materials';
import DocumentSendView from './components/document-review-and-entry/document-send/document.send.view';
import logo from './blocknetwhite-1.png';
import paperLogo from './blocnets-logo.png'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import AppBar from 'material-ui/AppBar';
import Grid from '@material-ui/core/Grid';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import {FormControl} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import {
    getBillOfMaterialsByMaterialID,
    getBillOfMaterialsByMaterialName,
    getBillOfMaterialsByMaterialDesc,
    getBillOfMaterialsByPartNumber,
    getBillOfMaterialsByPartName,
    getBillOfMaterialsByPartDesc
} from './redux/actions/bill-of-materials.actions';

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

const messageIconStyle = {
    transform: "scale(1.0)"
};

const userIconStyle = {
    color: "white",
    transform: "scale(2.1)"
};

class App extends Component {

    /* Dev Note: Will automatically fire the prop actions, or http request, once component mounts */
    componentDidMount() {
        this.props.authenticate();
        setInterval(() => {
            this.setState({currentDateAndTime: new Date().toUTCString()})
        }, 1000)
    }

    constructor(props) {
        super(props);
        this.state = {
            "open": false,
            "show": null,
            transactionCode: 'DRE01',
            showProgressLogo: false,
            searchKey: '',
            openSearch: false,
            searchCriteria: '',
            counter: 0,
            billOfMaterialsData: [],
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
            transactionCode: 'DRE01'
        });
    };

    showTrackAndTraceResultsView = () => {
        sessionStorage.clear();
        this.setState({billOfMaterialsData: []});
        if (this.state.searchCriteria === 'Material ID') {
            this.props.getBillOfMaterialsByMaterialID(this.state.searchKey);
            this.handleSearchData('Material ID');
        } else if (this.state.searchCriteria === 'Material Name') {
            this.props.getBillOfMaterialsByMaterialName(this.state.searchKey);
            this.handleSearchData('Material Name');
        } else if (this.state.searchCriteria === 'Material Description') {
            this.props.getBillOfMaterialsByMaterialDesc(this.state.searchKey);
            this.handleSearchData('Material Description');
        } else if (this.state.searchCriteria === 'Part No.') {
            this.props.getBillOfMaterialsByPartNumber(this.state.searchKey);
            this.handleSearchData('Part No.');
        } else if (this.state.searchCriteria === 'Part Name') {
            this.props.getBillOfMaterialsByPartName(this.state.searchKey);
            this.handleSearchData('Part Name');
        } else if (this.state.searchCriteria === 'Part Description') {
            this.props.getBillOfMaterialsByPartDesc(this.state.searchKey);
            this.handleSearchData('Part Description');
        }
        this.setState({
            show: 'trackandtraceresultsview',
            open: false,
            transactionCode: 'TAT02'
        });
    };

    showShippingView = () => {
        this.setState({
            show: 'shippingview',
            open: false,
            transactionCode: 'SHP01'
        });
    };

    showReceivingView = () => {
        this.setState({
            show: 'receivingview',
            open: false,
            transactionCode: 'REC01'
        });
    };

    showProductionView = () => {
        this.setState({
            show: 'productionview',
            open: false,
            transactionCode: 'PRO01'
        });
    };

    showTrackerView = () => {
        this.setState({
            show: 'trackerview',
            open: false,
            transactionCode: 'TAT01'
        });
    };

    showBillOfMaterials = () => {
        this.setState({
            show: 'billofmaterials',
            open: false,
            transactionCode: 'eBOM01'
        });
    };

    showDocumentSendView = () => {
        this.setState({
            show: 'documentsendview',
            open: false,
            transactionCode: 'DSR01'
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

    handleSearchClose = (event) => {
        this.setState({openSearch: false});
    };

    handleSearch = (event, searchCriteria) => {
        this.setState({
            searchCriteria: searchCriteria,
            openSearch: false
        });
    };

    handleSearchData = (searchCriteria) => {
        let bomData = [];
        this.setState({
            showProgressLogo: true,
            counter: 0
        });
        if (searchCriteria === 'Material ID') {
            setTimeout(
                function () {
                    this.setState({counter: 1});
                    if (this.state.counter === 1) {
                        bomData = sessionStorage.getItem('BOMDataByMaterialID');
                        this.handleBOMData(bomData);
                    }
                }
                    .bind(this),
                3000
            );
        } else if (searchCriteria === 'Material Name') {
            setTimeout(
                function () {
                    this.setState({counter: 1});
                    if (this.state.counter === 1) {
                        bomData = sessionStorage.getItem('BOMDataByMaterialName');
                        this.handleBOMData(bomData);
                    }
                }
                    .bind(this),
                3000
            );
        } else if (searchCriteria === 'Material Description') {
            setTimeout(
                function () {
                    this.setState({counter: 1});
                    if (this.state.counter === 1) {
                        bomData = sessionStorage.getItem('BOMDataByMaterialDesc');
                        this.handleBOMData(bomData);
                    }
                }
                    .bind(this),
                3000
            );
        } else if (searchCriteria === 'Part No.') {
            setTimeout(
                function () {
                    this.setState({counter: 1});
                    if (this.state.counter === 1) {
                        bomData = sessionStorage.getItem('BOMDataByPartNumber');
                        this.handleBOMData(bomData);
                    }
                }
                    .bind(this),
                3000
            );
        } else if (searchCriteria === 'Part Name') {
            setTimeout(
                function () {
                    this.setState({counter: 1});
                    if (this.state.counter === 1) {
                        bomData = sessionStorage.getItem('BOMDataByPartName');
                        this.handleBOMData(bomData);
                    }
                }
                    .bind(this),
                3000
            );
        } else if (searchCriteria === 'Part Description') {
            setTimeout(
                function () {
                    this.setState({counter: 1});
                    if (this.state.counter === 1) {
                        bomData = sessionStorage.getItem('BOMDataByPartDesc');
                        this.handleBOMData(bomData);
                    }
                }
                    .bind(this),
                3000
            );
        }
    };

    handleBOMData = (bomData) => {
        if (bomData) {
            this.setState({
                showProgressLogo: false,
                billOfMaterialsData: bomData,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Successfully tracked a block!',
                    open: true,
                    sbColor: '#23CE6B'
                }
            })
        } else {
            this.setState({
                showProgressLogo: false,
                billOfMaterialsData: '',
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error tracking a block!',
                    open: true,
                    sbColor: 'red'
                }
            })
        }
    };

    render() {

        let content = null;

        switch (this.state.show) {
            case 'trackandtraceresultsview':
                content = (<TrackAndTraceResultsView data={this.state}/>);
                break;
            case 'shippingview':
                content = (<ShippingView/>);
                break;
            case 'receivingview':
                content = (<ReceivingView/>);
                break;
            case 'productionview':
                content = (<ProductionView/>);
                break;
            case 'billofmaterials':
                content = (<BillOfMaterials/>);
                break;
            case 'trackerview':
                content = (<TrackerView/>);
                break;
            case 'documentsendview':
                content = (<DocumentSendView/>);
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
                                                            <MenuItem
                                                                onClick={event => this.handleSearch(event, "Material ID")}>Material
                                                                ID: {this.state.searchKey}</MenuItem>
                                                            <MenuItem
                                                                onClick={event => this.handleSearch(event, "Material Name")}>Material
                                                                Name: {this.state.searchKey}</MenuItem>
                                                            <MenuItem
                                                                onClick={event => this.handleSearch(event, "Material Description")}>Material
                                                                Description: {this.state.searchKey}</MenuItem>
                                                            <MenuItem
                                                                onClick={event => this.handleSearch(event, "Part No.")}>Part
                                                                No.: {this.state.searchKey}</MenuItem>
                                                            <MenuItem
                                                                onClick={event => this.handleSearch(event, "Part Name")}>Part
                                                                Name: {this.state.searchKey}</MenuItem>
                                                            <MenuItem
                                                                onClick={event => this.handleSearch(event, "Part Description")}>Part
                                                                Description: {this.state.searchKey}</MenuItem>
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
                                    <Badge badgeContent={12} color="secondary" style={messageIconStyle}>
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
                    <MenuItem id="showShippingViewId" onClick={this.showShippingView}>Shipping</MenuItem>
                    <hr/>
                    <MenuItem id="showReceivingViewId" onClick={this.showReceivingView}>Receiving</MenuItem>
                    <hr/>
                    <MenuItem id="showProductionViewId" onClick={this.showProductionView}>Production</MenuItem>
                    <hr/>
                    <MenuItem id="showTrackerViewId" onClick={this.showTrackerView}>Track and Trace</MenuItem>
                    <hr/>
                    <MenuItem id="showBillOfMaterialsId" onClick={this.showBillOfMaterials}>Bill of Materials</MenuItem>
                    <hr/>
                    <MenuItem id="showDocumentSendViewId" onClick={this.showDocumentSendView}>Document Review and
                        Entry</MenuItem>
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
        state
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
        getBillOfMaterialsByPartDesc: (url) => dispatch(getBillOfMaterialsByPartDesc(url))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import TrackAndTraceSearchView from './components/track-and-trace/views/track-and-trace-search.view';
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
import SaveDocumentView from './components/document-review-and-entry/document-save/document.save.view';
import MapContainer from './components/geolocation/views/google.maps.view';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from 'material-ui/AppBar';
import Grid from '@material-ui/core/Grid';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAlt from '@material-ui/icons/ListAlt';
import LocalShipping from '@material-ui/icons/LocalShipping';
import Domain from '@material-ui/icons/Domain';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import LocationOn from '@material-ui/icons/LocationOn';
import Send from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from 'material-ui/Drawer';
import logo from './blocknetwhite-1.png';
import paperLogo from './blocnets-logo.png'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { getEachMessageForUserID } from './redux/actions/user.message.array.action';
import SvgIcon from '@material-ui/core/SvgIcon';

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
    transform: 'scale(1.0)'
};

const paperStyle = {
    width: '70%',
    height: '85%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    textAlign: 'center',
    display: 'inline-block',
};

const paperLogoStyle = {
    maxHeight: 65,
    paddingTop: 15
};

class App extends Component {

    /* Dev Note: Will automatically fire the prop actions, or http request, once component mounts */
    componentDidMount() {
        !this.isCancelled && Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
            .then(() => {
                if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                    this.setState({ badgeContent: this.props.data.umaReducer.getEachMessageForUserIDSuccess.length })
                } else {
                    this.setState({ badgeContent: 0 })
                }
            });
        setInterval(() => {
            !this.isCancelled && this.setState({ currentDateAndTime: new Date().toUTCString() })
        }, 1000);
        setInterval(() => {
            !this.isCancelled && Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
                .then(() => {
                    if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                        this.setState({ badgeContent: this.props.data.umaReducer.getEachMessageForUserIDSuccess.length })
                    } else {
                        this.setState({ badgeContent: 0 })
                    }
                })
        }, 30000);
    }

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.showApp,
            open: this.props.open,
            transactionCode: this.props.transactionCode,
            userName: this.props.userName,
            badgeContent: 0,
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

    handleToggle = () => this.setState({ open: !this.state.open });

    showMainView = () => {
        this.setState({
            show: 'home',
            open: false,
            transactionCode: 'DRE02'
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

    showSaveDocumentView = () => {
        this.setState({
            show: 'savedocumentview',
            open: false,
            transactionCode: 'DRE03'
        });
    };

    showMapContainer = () => {
        this.setState({
            show: 'mapcontainer',
            transactionCode: 'GEO',
            open: false,
        });
    };

    handleTTSearchData = (show, open, transactionCode, tatData, tree, snackbar) => {
        this.setState({
            show: show,
            open: open,
            transactionCode: transactionCode,
            tatData: tatData,
            tree: tree,
            snackbar: snackbar
        });
    };

    handleTrackAndTraceData = (show, open, transactionCode, tatData, tree, snackbar) => {
        this.setState({
            show: show,
            open: open,
            transactionCode: transactionCode,
            tatData: tatData,
            tree: tree,
            snackbar: snackbar
        });
    };

    handleDREData = (refreshBadgeContent) => {
        if (refreshBadgeContent === true) {
            Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
                .then(() => {
                    if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                        this.setState({ badgeContent: this.props.data.umaReducer.getEachMessageForUserIDSuccess.length })
                    } else {
                        this.setState({ badgeContent: 0 })
                    }
                })
        }
    };

    handleSplash = () => {
        this.props.viewHandler('splash', false, '', this.props.userName);
    };

    handlePrint = () => {
        window.print();
    };

    handleNewSession = () => {
        window.open(window.location.href, '_blank');
    };


    render() {

        let content = null;
        let contentTitle = '';

        switch (this.state.show) {
            case 'trackandtraceresultsview':
                content = (<TrackAndTraceResultsView
                    snackbar={this.state.snackbar}
                    tatData={this.state.tatData}
                    tree={this.state.tree} />);
                contentTitle = 'SEARCH RESULTS';
                break;
            case 'billofmaterials':
                content = (<BillOfMaterials />);
                contentTitle = 'ENTER MATERIAL AND SUPPLIER MASTER DATA';
                break;
            case 'shippingview':
                content = (<ShippingView />);
                contentTitle = 'SHIPPING';
                break;
            case 'receivingview':
                content = (<ReceivingView />);
                contentTitle = 'RECEIVE SHIPMENT';
                break;
            case 'startproductionview':
                content = (<StartProductionView />);
                contentTitle = 'ENTER MATERIALS REQUIRED FOR PRODUCTION';
                break;
            case 'completeproductionview':
                content = (<CompleteProductionView />);
                contentTitle = 'ENTER NEW MATERIAL PRODUCED FROM PRODUCTION ORDER';
                break;
            case 'trackandtraceview':
                content = (<TrackAndTraceView
                    viewHandler={this.handleTrackAndTraceData} />);
                contentTitle = '';
                break;
            case 'senddocumentview':
                content = (<SendDocumentView
                    viewHandler={this.handleDREData} />);
                contentTitle = 'SEND A DOCUMENT';
                break;
            case 'savedocumentview':
                content = (<SaveDocumentView />);
                contentTitle = 'SAVE A DOCUMENT';
                break;
            case 'mapcontainer':
                content = (<MapContainer />);
                contentTitle = 'GEO MAPPING';
                break;
            default:
                content = (
                    <Router>
                        <div>
                            <Route
                                path='/'
                                render={(props) => <DocumentDashboardView {...props}
                                    userName={this.state.userName} />}
                            />
                        </div>
                    </Router>);
                contentTitle = 'INBOX';
        }

        return (
            <div className='App'>
                <MuiThemeProvider theme={theme}>
                    {/* Main navigation bar menu for components */}
                    <AppBar position='static' className='App-header'
                        iconClassNameRight='muidocs-icon-navigation-expand-more'
                        onLeftIconButtonClick={this.handleToggle}>
                        <Grid container spacing={24}>
                            <Grid item xs={3}>
                                <ToolbarTitle
                                    text={<img src={logo} className='App-logo' alt='logo' />}
                                    alt='Blocnets' />
                            </Grid>
                            <Grid item xs={4}>
                                <TrackAndTraceSearchView
                                    viewHandler={this.handleTTSearchData} />
                            </Grid>
                            <Grid item xs={5}>
                                <Tooltip title='Inbox'>
                                    <IconButton aria-label='pending messages' onClick={this.showMainView}>
                                        <Badge badgeContent={this.state.badgeContent} color='secondary'
                                            style={messageIconStyle}>
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Home - Apps'>
                                    <IconButton aria-label='apps' onClick={event => this.handleSplash()}
                                        style={{ 'cursor': 'pointer' }}>
                                        <SvgIcon className='Hexagon-Icon'>
                                            <path d='' />
                                        </SvgIcon>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='Print'>
                                    <IconButton aria-label='print' onClick={event => this.handlePrint()}
                                        style={{ 'cursor': 'pointer' }}>
                                        <i className='material-icons'
                                            style={{ 'fontSize': 'xx-large', 'color': 'white' }}>print</i>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='New Session'>
                                    <IconButton aria-label='new session' onClick={event => this.handleNewSession()}
                                        style={{ 'cursor': 'pointer' }}>
                                        <i className='material-icons'
                                            style={{ 'fontSize': 'xx-large', 'color': 'white' }}>open_in_new</i>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title='User'>
                                    <IconButton aria-label='user' onClick={event => this.showMainView()}
                                        style={{ 'cursor': 'pointer' }}>
                                        <i className='material-icons'
                                            style={{ 'fontSize': 'xx-large', 'color': 'white' }}>account_circle</i>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </AppBar>
                </MuiThemeProvider>
                {/* Side Drawer's navigation bar menu for viewing content */}
                <Drawer docked={false} width={300} open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}>
                    <AppBar
                        className='App-bar'
                        onClick={this.handleToggle}
                        title={<img src={logo} style={appBarLogoStyle} alt='Blocnets' />}
                    />
                    <MenuItem id='showBillOfMaterialsId' onClick={this.showBillOfMaterials}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <ListAlt />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Master Material Data' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showShippingViewId' onClick={this.showShippingView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <LocalShipping />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Shipping' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showReceivingViewId' onClick={this.showReceivingView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <Domain />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Receiving' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showStartProductionViewId' onClick={this.showStartProductionView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <PlayArrow />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Start Production Tracking' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showCompleteProductionViewId' onClick={this.showCompleteProductionView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <Stop />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Stop Production Tracking' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showTrackAndTraceViewId' onClick={this.showTrackAndTraceView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Track and Trace' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showSendDocumentViewId' onClick={this.showSendDocumentView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <Send />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Send a Document' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showSaveDocumentViewId' onClick={this.showSaveDocumentView}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <CloudUploadIcon />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Save a Document' />
                    </MenuItem>
                    <hr />
                    <MenuItem id='showMapContainerId' onClick={this.showMapContainer}
                        style={{ 'textAlign': 'left' }}>
                        <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                            <LocationOn />
                        </ListItemIcon>
                        <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                            primary='Geo Mapping' />
                    </MenuItem>
                </Drawer>
                <Paper className='Module-Title'>
                    <Toolbar className='Module-Title-Toolbar'>
                        <Typography className='Module-Title-Content'>
                            {contentTitle}
                        </Typography>
                    </Toolbar>
                </Paper>
                {/* Page View with content loaded */}
                {this.state.transactionCode === 'TAT01' ?
                    <Paper className='Transparent-Theme' style={paperStyle} zDepth={5}>
                        {content}
                    </Paper>
                    :
                    <Paper className='White-theme' style={paperStyle} zDepth={5}>
                        <Toolbar style={{ 'justifyContent': 'center', 'height': 100 }}>
                            <ToolbarTitle
                                text={<img src={paperLogo} style={paperLogoStyle} alt='Blocnets' />}
                            />
                        </Toolbar>
                        {content}
                    </Paper>
                }
                <div style={{ 'bottom': '0', 'position': 'fixed', 'width': '100%' }}>
                    <div style={{ padding: 24 }}>
                        <Grid container spacing={24}>
                            <MuiThemeProvider theme={theme}>
                                <Grid container item xs={12}>
                                    <Grid container item xs>
                                        <Typography align='right' style={{ 'width': '100%' }}>
                                            {this.state.transactionCode} | System Number
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid container item xs>
                                        <Typography align='left' style={{ 'width': '100%' }}>
                                            © 2018 ALL RIGHTS RESERVED.
                                        </Typography>
                                    </Grid>
                                    <Grid container item xs>
                                        <Typography align='right' style={{ 'width': '100%' }}>
                                            {this.state.currentDateAndTime}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MuiThemeProvider>
                        </Grid>
                    </div>
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

// This way, we can call our action creator by doing this.props.authenticate();
const mapDispatchToProps = (dispatch) => {
    return {
        getEachMessageForUserID: (user) => dispatch(getEachMessageForUserID(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
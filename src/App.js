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
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import PrintIcon from '@material-ui/icons/Print';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppMenu from "./components/App-Menu";
import List from "@material-ui/core/List/List";
import Menu from '@material-ui/core/Menu';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    },
});

const styles = theme => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

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
            },
            showMobileMenu: false,
            mobileMoreAnchorEl: null,
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

    showMobileMenu = (event) => {
        this.setState({
            open: false,
            showMobileMenu: true,
            mobileMoreAnchorEl: event.currentTarget
        });
    };

    handleMobileMenuClose = () => {
        this.setState({
            showMobileMenu: false,
            mobileMoreAnchorEl: null
        });
    };

    handleMenu = (id) => {
        switch (id) {
            case 'showBillOfMaterialsId':
                this.showBillOfMaterials();
                break;
            case 'showShippingViewId':
                this.showShippingView();
                break;
            case 'showReceivingViewId':
                this.showReceivingView();
                break;
            case 'showStartProductionViewId':
                this.showStartProductionView();
                break;
            case 'showCompleteProductionViewId':
                this.showCompleteProductionView();
                break;
            case 'showTrackAndTraceViewId':
                this.showTrackAndTraceView();
                break;
            case 'showSendDocumentViewId':
                this.showSendDocumentView();
                break;
            case 'showSaveDocumentViewId':
                this.showSaveDocumentView();
                break;
            case 'showMapContainerId':
                this.showMapContainer();
                break;
            default:
                this.showMainView();
                break;
        }
    };


    render() {

        const { classes } = this.props;

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

        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.state.showMobileMenu}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.showMainView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <Badge badgeContent={this.state.badgeContent}
                               classes={{
                                   root: 'App-Bar-Badge',
                                   badge: 'App-Bar-Badge-Color'
                               }}>
                            <MailIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Messages' />
                </MenuItem>
                <hr />
                <MenuItem onClick={this.handleSplash}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <SvgIcon className='App-Bar-HexagonIcon'>
                            <path d='' />
                        </SvgIcon>
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Home' />
                </MenuItem>
                <hr />
                <MenuItem onClick={this.handlePrint}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <PrintIcon />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Print' />
                </MenuItem>
                <hr />
                <MenuItem onClick={this.handleNewSession}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <OpenInNewIcon />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='New Session' />
                </MenuItem>
                <hr />
                <MenuItem onClick={this.showMainView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='User Profile' />
                </MenuItem>
            </Menu>
        );

        return (
            <div className='App'>
                <MuiThemeProvider theme={theme}>
                    {/* Main navigation bar menu for components */}
                    <AppBar position='static' className='App-header'
                            iconClassNameRight='muidocs-icon-navigation-expand-more'
                            onLeftIconButtonClick={this.handleToggle}>
                        <div className='App-Bar-TT-Search'>
                            <TrackAndTraceSearchView
                                viewHandler={this.handleTTSearchData} />
                        </div>
                        <div className={classes.sectionDesktop}>
                            <Tooltip title='Messages'>
                                <IconButton onClick={this.showMainView}>
                                    <Badge badgeContent={this.state.badgeContent}
                                           classes={{
                                               root: 'App-Bar-Badge',
                                               badge: 'App-Bar-Badge-Color'
                                           }}>
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Home'>
                                <IconButton onClick={event => this.handleSplash()}>
                                    <SvgIcon className='App-Bar-HexagonIcon'>
                                        <path d='' />
                                    </SvgIcon>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Print'>
                                <IconButton onClick={event => this.handlePrint()}>
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='New Session'>
                                <IconButton onClick={event => this.handleNewSession()}>
                                    <OpenInNewIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='User Profile'>
                                <IconButton onClick={event => this.showMainView()}>
                                    <AccountCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography className='App-Bar-Title'>
                                {this.state.userName ? this.state.userName : 'Guest'}
                            </Typography>
                            <ToolbarTitle
                                className='App-Bar-Toolbar-Title'
                                text={<img src={logo} className='App-Bar-Logo' alt='logo' />}
                                alt='Blocnets' />
                            <Typography className='App-Bar-Title-Custom'>
                                <span>BL</span>
                                <span style={{ 'color': '#e32c1c' }}>O</span>
                                <span>CNETS</span>
                            </Typography>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={event => this.showMobileMenu(event)}>
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </AppBar>
                </MuiThemeProvider>
                <Drawer docked={false} width={300} open={this.state.open}
                        onRequestChange={(open) => this.setState({ open })}>
                    <List style={{ 'backgroundColor': '#222222' }}>
                        <Paper style={{
                            'backgroundColor': '#222222',
                            'boxShadow': 'none',
                            'height': '56px',
                            'textAlign': 'left'
                        }}>
                            <IconButton style={{ 'marginLeft': '1%', 'color': 'white' }} onClick={this.handleToggle}>
                                <MenuIcon />
                            </IconButton>
                        </Paper>
                    </List>
                    <List>
                        <AppMenu viewHandler={this.handleMenu} />
                    </List>
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
                    <Paper className='Transparent-Theme' style={paperStyle} elevation={5}>
                        {content}
                    </Paper>
                    :
                    <Paper className='White-theme' style={paperStyle} elevation={5}>
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
                {renderMobileMenu}
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));

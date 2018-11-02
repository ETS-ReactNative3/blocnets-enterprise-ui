import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppMenu from './components/App-Menu';
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
import ReadDocumentView from './components/document-review-and-entry/document-read/document.read.view';
import MapContainerView from './components/geolocation/views/google.maps.view';
import BillOfMaterialsEdit from './components/bill-of-materials/views/bill-of-materials-edit-view';
import CatalogueView from './components/catalogue/catalogue.view';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import SvgIcon from '@material-ui/core/SvgIcon';
import PrintIcon from '@material-ui/icons/Print';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { ToolbarTitle } from 'material-ui/Toolbar';
import logo from './blocknetwhite-1.png';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List/List';
import Paper from '@material-ui/core/Paper';
import paperLogo from './blocnets-logo.png'
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { getEachMessageForUserID } from './redux/actions/UMA/user.message.array.action';

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
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
            catalogue: {
                open: false,
                scroll: 'paper'
            },
            show: this.props.showApp,
            open: this.props.open,
            transactionCode: this.props.transactionCode,
            userName: this.props.userName,
            badgeContent: 0,
            mobileMoreAnchorEl: null,
            showMobileMenu: false,
            blockInformation: '',
            tatData: [],
            tree: [],
            shippingData: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
            masterMaterialData: []
        };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    showMainView = () => {
        this.setState({
            show: 'home',
            open: false,
            transactionCode: 'DRE02',
            mobileMoreAnchorEl: null,
            showMobileMenu: false,
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

    showReadDocumentView = () => {
        this.setState({
            show: 'readdocumentview',
            open: false,
            transactionCode: 'DRE04'
        });
    };

    showMapContainerView = () => {
        this.setState({
            show: 'mapcontainerview',
            transactionCode: 'GEO01',
            open: false,
        });
    };

    showEditMasterData = (masterMaterialData) => {
        this.setState({
            show: 'billofmaterialsedit',
            open: false,
            transactionCode: 'eBOM03',
            masterMaterialData: masterMaterialData
        });
    };

    handleEditMasterData = () => {
        this.setState({
            show: 'trackandtraceview',
            open: false,
            transactionCode: 'TAT01'
        });
    };

    handleTTSearchData = (show, open, transactionCode, blockInformation, tatData, tree, shippingData, snackbar) => {
        if (show === 'catalogue') {
            this.setState({
                catalogue: {
                    open: show === 'catalogue' ? true : false,
                }
            })
        } else if (show !== 'catalogue') {
            this.setState({
                show: show,
                open: open,
                transactionCode: transactionCode,
                blockInformation: blockInformation,
                tatData: tatData,
                tree: tree,
                shippingData: shippingData,
                snackbar: snackbar
            });
        }
    };

    handleTrackAndTraceData = (show, open, transactionCode, blockInformation, tatData, tree, shippingData, snackbar) => {
        if (show === 'catalogue') {
            this.setState({
                catalogue: {
                    open: show === 'catalogue' ? true : false,
                }
            })
        } else if (show !== 'catalogue') {
            this.setState({
                show: show,
                open: open,
                transactionCode: transactionCode,
                blockInformation: blockInformation,
                tatData: tatData,
                tree: tree,
                shippingData: shippingData,
                snackbar: snackbar
            });
        }
    };

    handleCatalogue = () => {
        this.setState({
            catalogue: {
                open: false,
            }
        })
    }

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
        this.setState({
            mobileMoreAnchorEl: null,
            showMobileMenu: false
        });
    };

    handleNewSession = () => {
        window.open(window.location.href, '_blank');
        this.setState({
            mobileMoreAnchorEl: null,
            showMobileMenu: false
        });
    };

    showMobileMenu = (event) => {
        this.setState({
            mobileMoreAnchorEl: event.currentTarget,
            showMobileMenu: true,
        });
    };

    handleMobileMenuClose = () => {
        this.setState({
            mobileMoreAnchorEl: null,
            showMobileMenu: false
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
            case 'showReadDocumentViewId':
                this.showReadDocumentView();
                break;
            case 'showMapContainerViewId':
                this.showMapContainerView();
                break;
            default:
                this.showMainView();
                break;
        }
    };

    render() {

        let content = null;
        let contentTitle = '';

        switch (this.state.show) {
            case 'trackandtraceresultsview':
                content = (<TrackAndTraceResultsView
                    blockInformation={this.state.blockInformation}
                    shippingData={this.state.shippingData}
                    snackbar={this.state.snackbar}
                    tatData={this.state.tatData}
                    tree={this.state.tree}
                    viewHandler={this.showEditMasterData} />);
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
                content = (<SaveDocumentView
                    userName={this.state.userName} />);
                contentTitle = 'SAVE A DOCUMENT';
                break;
            case 'readdocumentview':
                content = (<ReadDocumentView
                    userName={this.state.userName} />);
                contentTitle = 'VIEW A DOCUMENT';
                break;
            case 'mapcontainerview':
                content = (<MapContainerView />);
                contentTitle = 'GEO MAPPING';
                break;
            case 'billofmaterialsedit':
                content = (<BillOfMaterialsEdit
                    masterMaterialData={this.state.masterMaterialData}
                    viewHandler={this.handleEditMasterData} />);
                contentTitle = 'EDIT MATERIAL AND SUPPLIER MASTER DATA';
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

        const { classes } = this.props;

        const renderMobileMenu = (
            <Menu anchorEl={this.state.mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={this.handleMobileMenuClose} open={this.state.showMobileMenu}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem className='Mobile-MenuItem' onClick={this.showMainView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <Badge badgeContent={this.state.badgeContent}
                            classes={{
                                root: 'App-Bar-Badge',
                                badge: 'App-Bar-Badge-Color'
                            }}>
                            <MailIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Messages' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' onClick={this.handleSplash}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <SvgIcon className='App-Bar-HexagonIcon'>
                            <path d='' />
                        </SvgIcon>
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Home' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' onClick={this.handlePrint}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <PrintIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Print' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' onClick={this.handleNewSession}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <OpenInNewIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='New Session' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' onClick={this.showMainView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='User Profile' />
                </MenuItem>
            </Menu>
        );

        return (

            <div className='App'>
                <MuiThemeProvider theme={theme}>
                    {/* Main navigation bar menu for components */}
                    <AppBar className='App-header' position='static'>
                        <Toolbar className='App-Bar-ToolBar'>
                            <IconButton className='App-Bar-IconButton' onClick={this.handleToggle}>
                                <MenuIcon />
                            </IconButton>
                            <div className='App-Bar-TT-Search'>
                                <TrackAndTraceSearchView
                                    trackButtonFlag={false}
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
                                    alt=''
                                    className='App-Bar-Toolbar-Title'
                                    text={<img alt='logo' className='App-Bar-Logo' src={logo} />}
                                />
                                <Typography className='App-Bar-Title-Custom'>
                                    <span>BL</span>
                                    <span className='TT-Font-Red'>O</span>
                                    <span>CNETS</span>
                                </Typography>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton onClick={event => this.showMobileMenu(event)}>
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
                <Drawer onClose={this.handleToggle} open={this.state.open}>
                    <List className='App-Bar-List'>
                        <Paper className='App-Bar-Paper'>
                            <IconButton className='App-Bar-IconButton-Menu' onClick={this.handleToggle}>
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
                {this.state.catalogue.open === true ? <CatalogueView viewHandler={this.handleCatalogue}></CatalogueView> : ''}
                {/* Page View with content loaded */}
                {this.state.transactionCode === 'TAT01' ?
                    <Paper className='Transparent-Theme' elevation={24}>
                        {content}
                    </Paper>
                    :
                    <Paper className='White-theme' elevation={24}>
                        <Toolbar className='App-Toolbar'>
                            <ToolbarTitle
                                text={<img alt='Blocnets' className='App-ToolbarTitle' src={paperLogo} />}
                            />
                        </Toolbar>
                        {content}
                    </Paper>
                }
                <div className='App-Footer'>
                    <div className='Module'>
                        <Grid container spacing={24}>
                            <MuiThemeProvider theme={theme}>
                                <Grid container item xs={12}>
                                    <Grid container item xs>
                                        <Typography align='right' className='Module-Paper'>
                                            {this.state.transactionCode} | System Number
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid container item xs>
                                        <Typography align='left' className='Module-Paper'>
                                            © 2018 ALL RIGHTS RESERVED.
                                        </Typography>
                                    </Grid>
                                    <Grid container item xs>
                                        <Typography align='right' className='Module-Paper'>
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
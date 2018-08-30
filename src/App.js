import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {authenticate} from './redux/actions/main.actions';
import {connect} from 'react-redux';
import DocumentReviewEntryView
    from './components/document-review-and-entry-view/document-dashboard/document.review.entry.view';
import TrackAndTraceResultsView from './components/track-and-trace/views/track-and-trace.results.view';
import ShippingView from './components/shipping-view/shipping.view';
import ReceivingView from './components/receiving-view/receiving.view';
import BillOfMaterials from './components/bill-of-materials/bill-of-materials';
import DocumentSendView from './components/document-review-and-entry-view/document-send/document.send.view';
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
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import UserIcon from '@material-ui/icons/AccountCircleRounded';

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
    transform: "scale(2.1)"
};

class App extends Component {

    /* Dev Note: Will automatically fire the prop actions, or http request, once component mounts */
    componentDidMount() {
        this.props.authenticate();
        setInterval(() => {
            this.setState({
                currentDateAndTime: new Date().toUTCString()
            })
        }, 1000)
    }

    constructor(props) {
        super(props);
        this.state = {
            "open": false,
            "show": null,
            transactionCode: 'DRE01'
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    showMainView = () => {
        this.setState({show: 'home', open: false, transactionCode: 'DRE01'});
    };

    showTrackAndTraceResultsView = () => {
        //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
        //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
        this.setState({show: 'trackandtraceresultsview', open: false, transactionCode: 'TT01'});
    };

    showShippingView = () => {
        this.setState({show: 'shippingview', open: false, transactionCode: 'SHP01'});
    };

    showReceivingView = () => {
        this.setState({show: 'receivingview', open: false, transactionCode: 'REC01'});
    };

    showBillOfMaterials = () => {
        this.setState({show: 'billofmaterials', open: false, transactionCode: 'BOM01'});
    };

    showDocumentSendView = () => {
        this.setState({show: 'documentsendview', open: false, transactionCode: 'DSR01'});
    };

    render() {

        let content = null;

        switch (this.state.show) {
            case 'trackandtraceresultsview':
                content = (<TrackAndTraceResultsView/>);
                break;
            case 'shippingview':
                content = (<ShippingView/>);
                break;
            case 'receivingview':
                content = (<ReceivingView/>);
                break;
            case 'billofmaterials':
                content = (<BillOfMaterials/>);
                break;
            case 'documentsendview':
                content = (<DocumentSendView/>);
                break;
            default:
                content = (
                    <Router>
                        <div>
                            <Route exact path="/" component={DocumentReviewEntryView}/>
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
                                        id="search-with-icon-adornment"
                                        type="search"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <SearchIcon
                                                    onClick={this.showTrackAndTraceResultsView}
                                                    style={{"cursor": "pointer"}}
                                                />
                                            </InputAdornment>
                                        }
                                    />
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
                                <UserIcon
                                    style={userIconStyle}
                                />
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
                    <MenuItem id="showBillOfMaterialsId" onClick={this.showBillOfMaterials}>Bill of Materials</MenuItem>
                    <hr/>
                    <MenuItem id="showDocumentSendViewId" onClick={this.showDocumentSendView}>Document
                        Review and Entry</MenuItem>
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

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
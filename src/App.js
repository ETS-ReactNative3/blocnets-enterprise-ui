import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import DocumentReviewEntryView from './components/document-review-and-entry-view/document-dashboard/document.review.entry.view';
import ShippingView from './components/shipping-view/shipping.view';
import ReceivingView from './components/receiving-view/receiving.view';
import BillOfMaterials from './components/bill-of-materials/bill-of-materials';
import DocumentSendView from './components/document-review-and-entry-view/document-send/document.send.view';
import logo from './blocknetwhite-1.png';
import appBarLogo from './rsz_1blocknetwhite.png';
import paperLogo from './blocnets-logo.png'
import AppBar from 'material-ui/AppBar';
import Badge from '@material-ui/core/Badge';
import Drawer from 'material-ui/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import './App.css';
import SearchIcon from '@material-ui/icons/Search';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import { FormControl } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticate } from './redux/actions/main.actions';
import TrackAndTraceResultsView from './components/track-and-trace/views/track-and-trace.results.view';

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

const paperStyle = {
  height: '85%',
  width: "70%",
  margin: '5%',
  textAlign: 'center',
  display: 'inline-block',
};

const userIconStyle = {
  transform: "scale(2.1)"
}

const messageIconStyle = {
  transform: "scale(1.0)"
}

class App extends Component {
  /* Dev Note: Will automatically fire the prop actions, or http request, once component mounts */
  componentDidMount() {
    this.props.authenticate();
  }

  constructor(props) {
    super(props);
    this.state = {
      "open": false,
      "show": null
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  showMainView = () => {
    this.setState({ show: 'home', open: false });
  };

  showShippingView = () => {
    this.setState({ show: 'shippingview', open: false });
  };

  showReceivingView = () => {
    this.setState({ show: 'receivingview', open: false });
  };

  showBillOfMaterials = () => {
    this.setState({ show: 'billofmaterials', open: false });
  };

  showDocumentSendView = () => {
    this.setState({ show: 'documentsendview', open: false });
  };

  showTrackAndTraceResultsView = () => {
      //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
      //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
      this.setState({ show: 'trackandtraceresultsview', open: false });
  };

  render() {
    let content = null;

    const AppBarLogoStyle = {
      maxWidth: 100,
      maxHeight: 100,
      paddingTop: 10
    }

    const paperLogoStyle = {
      maxHeight: 65,
      paddingTop: 10
    }

    switch (this.state.show) {
      case 'shippingview':
        content = (<ShippingView />);
        break;
      case 'receivingview':
        content = (<ReceivingView />);
        break;
      case 'billofmaterials':
        content = (<BillOfMaterials />);
        break;
      case 'documentsendview':
        content = (<DocumentSendView />); 
        break;
      case 'trackandtraceresultsview':
          content = (<TrackAndTraceResultsView />);
          break;
      default:
        content = (
          <Router>
            <div>
              <Route exact path="/" component={DocumentReviewEntryView} />
            </div>
          </Router>);
    }

    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          {/* Main navigation bar menu for components */}
          <AppBar position="static"
            className="App-header"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.handleToggle}>
            <Grid container spacing={24}>
              <Grid item xs={3}>
                <ToolbarTitle text={<img src={logo} className="App-logo" alt="logo" />} alt="Blocnets" />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="search-with-icon-adornment">Search</InputLabel>
                  <Input
                    id="search-with-icon-adornment"
                    label="Search field"
                    type="search"
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon onClick={this.showTrackAndTraceResultsView} style={{"cursor": "pointer"}}/>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <IconButton aria-label="pending messages" onClick={this.showMainView}>
                  <Badge badgeContent={12} color="secondary" style={messageIconStyle}>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <UserIcon style={userIconStyle} />
              </Grid>
            </Grid>
          </AppBar>
        </MuiThemeProvider>
        {/* Side Drawer's navigation bar menu for viewing content */}
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}>
          <AppBar
            className="App-bar"
            title={<img src={appBarLogo} style={AppBarLogoStyle} alt="Blocnets" />}
          />
          <MenuItem id="showShippingViewId" onClick={this.showShippingView}>Shipping</MenuItem>
          <hr />
          <MenuItem id="showReceivingViewId" onClick={this.showReceivingView}>Receiving</MenuItem>
          <hr />
          <MenuItem id="showBillOfMaterialsId" onClick={this.showBillOfMaterials}>Bill of Materials</MenuItem>
          <hr />
          <MenuItem id="showDocumentSendViewId" onClick={this.showDocumentSendView}>Document Review/Entry</MenuItem>
        </Drawer>
        {/* Page View with content loaded*/}
        <Paper className="White-theme" style={paperStyle} zDepth={5}>

          <Toolbar style={{ "justifyContent": "center", "height": 80 }}>
            <ToolbarTitle text={<img src={paperLogo} style={paperLogoStyle} alt="Blocnets" />} />
          </Toolbar>
          {content}

        </Paper>
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

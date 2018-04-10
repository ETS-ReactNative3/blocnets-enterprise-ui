import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MainView from './components/main-view/main.view';
import TrackerView from './components/tracker-view/tracker.view';
import logo from './blocknetwhite-1.png';
import appBarLogo from './rsz_1blocknetwhite.png';
import paperLogo from './blocnets-logo.png'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import './App.css';

const paperStyle = {
  height: '85%',
  width: "70%",
  margin: '5%',
  textAlign: 'center',
  display: 'inline-block',
};

class App extends Component {
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

  showTrackerView = () => {
    this.setState({ show: 'trackerview', open: false });
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
      case 'trackerview':
        content = (<TrackerView />);
        break;
      case 'home':
        content = (<MainView />);
        break;
      default:
        content = (
          <Router>
            <div>
              <Route exact path="/" component={MainView} />
            </div>
          </Router>);
    }

    return (
      <div className="App">
        {/* Main navigation bar menu for components */}
        <AppBar
          className="App-header"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title={<img src={logo} className="App-logo" alt="logo" />}
          onLeftIconButtonClick={this.handleToggle}
        />
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
          <MenuItem id="showMainViewId" onClick={this.showMainView}>Create New Block</MenuItem>
          <hr />
          <MenuItem id="showTrackerViewId" onClick={this.showTrackerView}>Track and Trace</MenuItem>
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

export default App;

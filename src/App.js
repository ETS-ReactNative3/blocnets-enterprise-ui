import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MainArea from './components/main-view/main.view';
import logo from './blocknetwhite-1.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{"fontFamily" : "'Lato',Arial,sans-serif"}}>
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{"textAlign" : "center", "fontSize" : "2em"}}> 
          <span style={{"color" : "#ffffff"}}>BL<span style={{"color" : "#ff0000"}}>O</span>CNETS</span>
          </h1>
        </header>
      <Router>
        <div>
          <Route exact path="/" component={MainArea}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;

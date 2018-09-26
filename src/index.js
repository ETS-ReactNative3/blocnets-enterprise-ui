import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import Home from './Home';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const root =
  <Provider store={configureStore()}>
    <MuiThemeProvider>
      <Home />
    </MuiThemeProvider>
  </Provider>;

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
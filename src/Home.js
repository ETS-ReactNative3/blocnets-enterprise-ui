import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { authenticate } from './redux/actions/authentication.action';
import { connect } from 'react-redux';
import SplashView from './components/splash';
import LoginView from './components/login';
import App from './App';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 'home',
            open: false,
            transactionCode: '',
            loginUser: '',
            showProgressLogo: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    showApp = () => {
        Promise.resolve(this.setState({ show: 'app', open: false }))
    };

    showLoginView = () => {
        Promise.resolve(this.setState({ show: 'login', open: false }))
    };

    handleUsername = (username) => {
        let appView = () => {
            this.showApp();
        }
        Promise.resolve(this.setState({ loginUser: username }))
            .then(() => {
                appView();
            })
    }

    handleSelectedTransactionCode = (code) => {
        let nextView = () => {
            this.showLoginView();
        }
        Promise.resolve(this.setState({ transactionCode: code }))
            .then(() => {
                nextView();
            })
    };

    render() {

        let content = null;

        switch (this.state.show) {
            case 'login':
                content = (<LoginView viewHandler={this.handleUsername} />);
                break;
            case 'app':
                content = (<App />);
                break;
            case 'splash':
                content = (<SplashView viewHandler={this.handleSelectedTransactionCode} />)
            default:
                content = (<SplashView viewHandler={this.handleSelectedTransactionCode} />);
        }

        return (
            <div>
                {content}
            </div>
        );
    }

}

export default (Home);
import React, { Component } from 'react';
import './App.css';
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

    handleLogin = (transactionCode, userName) => {
        let appView = () => {
            this.showApp();
        }
        Promise.resolve(this.setState({ loginUser: userName }))
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
                content = (<LoginView viewHandler={this.handleLogin} />);
                break;
            case 'app':
                content = (<App />);
                break;
            case 'splash':
                content = (<SplashView viewHandler={this.handleSelectedTransactionCode} />)
                break;
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
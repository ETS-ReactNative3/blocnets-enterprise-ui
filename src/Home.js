import React, {Component} from 'react';
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
            transactionCode: ''
        };
    }

    showApp = () => {
        Promise.resolve(this.setState({show: 'app', open: false}))
    };

    showLoginView = () => {
        Promise.resolve(this.setState({show: 'login', open: false}))
    };

    handleLoginView = (transactionCode, userName) => {
        let appView = () => {
            this.showApp();
        };
        Promise.resolve(this.setState({loginUser: userName}))
            .then(() => {
                appView();
            })
    };

    handleSplashView = (code) => {
        let nextView = () => {
            this.showLoginView();
        };
        Promise.resolve(this.setState({transactionCode: code}))
            .then(() => {
                nextView();
            })
    };

    render() {

        let content = null;

        switch (this.state.show) {
            case 'splash':
                content = (<SplashView viewHandler={this.handleSplashView}/>);
                break;
            case 'login':
                content = (<LoginView viewHandler={this.handleLoginView}/>);
                break;
            case 'app':
                content = (<App viewHandler={this.handleAppView}/>);
                break;
            default:
                content = (<SplashView viewHandler={this.handleSplashView}/>);
        }

        return (
            <div>
                {content}
            </div>
        );

    }

}

export default (Home);
import React, { Component } from 'react';
import blocnetsLogo from '../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import logo from '../icon-only.jpg';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import {
    getEachMessageForUserID
} from '../redux/actions/UMA/user.message.array.action';

const paperStyle = {
    width: '100%',
    height: '85%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '10 px'
};

const logoStyle = {
    height: '55px',
    width: '60px',
    borderRadius: '8px',
    paddingTop: '5px'
};

const imageStyle = {
    height: '50px'
};

class LoginView extends Component {

    componentDidMount() {
        setInterval(() => {
            !this.isCancelled &&
            this.setState({ currentDateAndTime: new Date().toUTCString() })
        }, 1000);
    }

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            currentDateAndTime: '',
            show: this.props.show,
            open: this.props.open,
            transactionCode: this.props.transactionCode,
            userName: '',
            password: '',
            passwordEntered: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleUsername = (event) => {
        this.setState({ userName: event.target.value });
    };

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
            passwordEntered: false
        });
        if (event.target.value) {
            this.setState({ passwordEntered: true });
        }
    };

    handleView = (event) => {
        this.setState({ showProgressLogo: true });
        Promise.resolve(this.props.getEachMessageForUserID(this.state.userName))
            .then(() => {
                if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                    this.setState({ showProgressLogoDialog: false });
                    this.props.viewHandler('app', false, this.state.transactionCode, this.state.userName);
                } else {
                    this.setState({
                        showProgressLogo: false,
                        userName: '',
                        password: '',
                    });
                    this.setState({
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'User Name is not valid!',
                            open: true,
                            sbColor: 'red'
                        }
                    })
                }
            });
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        });
    };

    render() {

        const formComplete = this.state.userName && this.state.passwordEntered;

        return (
            <div>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div>
                    <Grid container spacing={24}>
                        <Paper elevation={24} style={paperStyle} zdepth={5}>
                            <div style={{ padding: 48 }}>
                            </div>
                            <div style={{ padding: 24 }}>
                                <Grid container spacing={24}>
                                    <Grid container item xs={12} justify="center">
                                        <Paper style={logoStyle}>
                                            <img src={logo} style={imageStyle} alt="" />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                            <div style={{ padding: 24 }}>
                                <Grid container spacing={24}>
                                    <Grid container item xs={12} justify="center">
                                        <TextField
                                            value={this.state.userName}
                                            onChange={this.handleUsername}
                                            type="text"
                                            name="userName"
                                            style={{ "float": "left", "textAlign": "left" }}
                                            hintText="User Name"
                                            errorText={this.state.errorTextUserName}
                                            errorStyle={{ "float": "left", "textAlign": "left" }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid container item xs={12} justify="center">
                                        <TextField
                                            value={this.state.password}
                                            onChange={this.handlePassword}
                                            type="password"
                                            name="password"
                                            style={{ "float": "left", "textAlign": "left" }}
                                            hintText="Password"
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                {formComplete ?
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event)}
                                                    style={{ "backgroundColor": "#fce400" }}>
                                                Log In
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    disabled
                                                    style={{ "backgroundColor": "#e0e0e0" }}>
                                                Log In
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                                <div style={{ padding: 48 }}>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </div>
                <div style={{ "bottom": "0", "position": "fixed", "width": "100%" }}>
                    <div style={{ padding: 48 }}>
                        <Grid container spacing={24}>
                            <Grid container item xs justify="center">
                            </Grid>
                            <Grid container item xs justify="center">
                                <Typography>
                                    <span
                                        style={{ "color": "white" }}>{this.state.currentDateAndTime ? this.state.currentDateAndTime : "Loading..."}</span>
                                </Typography>
                            </Grid>
                            <Grid container item xs justify="center">
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{ backgroundColor: this.state.snackbar.sbColor }}
                />
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getEachMessageForUserID: (user) => dispatch(getEachMessageForUserID(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
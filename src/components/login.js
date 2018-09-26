import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from 'material-ui/Snackbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import { getEachMessageForUserID } from '../redux/actions/user.message.array.action';
import { connect } from 'react-redux';

const paperStyle = {
    width: "70%",
    height: '85%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
};

class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            show: null,
            transactionCode: '',   // The variable that stores which module should render after login
            username: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleUsername = (event) => {
        Promise.resolve(this.setState({ username: event }))
    }

    handleView = () => {
        this.props.viewHandler(this.state.code, this.state.username)
    }

    render() {
        return (
            <Paper className="White-theme" elevation={24} style={paperStyle} zDepth={5}>
                <Toolbar style={{ "justifyContent": "center", "height": 80 }}>
                    <ToolbarTitle
                        text={"Hello World"}
                    />
                </Toolbar>
                <Grid container spacing={24}>
                    <TextField
                        onChange={this.handleUsername}
                        type="text"
                        name="Username"
                        floatingLabelText="Username"
                        floatingLabelFixed={true}
                        style={{ "float": "left", "textAlign": "left" }}
                        hintText=""
                    />
                </Grid>
                <Grid container spacing={24}>
                    <TextField
                        type="text"
                        label="Password"
                        name="Password"
                        type="password"
                        autoComplete="current-password"
                        floatingLabelText="Password"
                        floatingLabelFixed={true}
                        style={{ "float": "left", "textAlign": "left" }}
                        hintText=""
                    />
                </Grid>
                <IconButton aria-label="" onClick={this.handleView}>
                    <UserIcon />
                </IconButton>
            </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from 'material-ui/TextField';
import logo from '../icon-only.jpg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getEachMessageForUserID } from '../redux/actions/user.message.array.action';

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
            this.setState({ currentDateAndTime: new Date().toUTCString() })
        }, 1000)
    }

    constructor(props) {
        super(props);
        this.state = {
            currentDateAndTime: '',
            transactionCode: '',   // The variable that stores which module should render after login
            userName: '',
            passwordEntered: false
        };
    }

    handleUsername = (event) => {
        this.setState({ userName: event.target.value });
    };

    handlePassword = (event) => {
        this.setState({ passwordEntered: false });
        if (event.target.value) {
            this.setState({ passwordEntered: true });
        }
    };

    handleView = () => {
        this.props.viewHandler(this.state.transactionCode, this.state.userName);
    };

    render() {

        const formComplete = this.state.userName && this.state.passwordEntered;

        return (
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
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={24}>
                                <Grid container item xs={12} justify="center">
                                    <TextField
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
                                            onClick={this.handleView} style={{ "backgroundColor": "#ffb000" }}>
                                            Log In
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container spacing={24}>
                                    <Grid container item xs={12} justify="center">
                                        <Button type="submit" value="submit" variant="contained"
                                            onClick={this.handleView} style={{ "backgroundColor": "#898989" }}>
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
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Typography align="center" style={{ "color": "white" }}>
                            {this.state.currentDateAndTime}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography align="center" style={{ "color": "white" }}>
                            {this.state.currentDateAndTime}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography align="center" style={{ "color": "white" }}>
                            {this.state.currentDateAndTime}
                        </Typography>
                    </Grid>
                </Grid>
            </div>

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
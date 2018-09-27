import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import animatedLogo from '../blocnets.gif';
import Toolbar from 'material-ui/Toolbar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';


const paperStyle = {
    width: '100%',
    height: '85%',
    margin: '3%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '10 px'
};

const titleStyle = {
    fontFamily: 'Inter UI, sans-serif',
    fontStyle: 'normal',
    fontSize: '28pt'
};

let viewWelcomeVideo = true;

class SplashView extends Component {

    componentDidMount() {
        setTimeout(
            function () {
                viewWelcomeVideo = false;
            }
            , 6000);
        setInterval(() => {
            this.setState({ currentDateAndTime: new Date().toUTCString() })
        }, 1000);
    }

    constructor(props) {
        super(props);
        this.state = {
            currentDateAndTime: ''
        };
    }

    handleView = (event, transactionCode) => {
        this.props.viewHandler('login', false, transactionCode, this.props.userName);
    };

    render() {

        return (

            <div>

                {viewWelcomeVideo ?

                    <div style={{ padding: 24 }}>
                        <Grid container spacing={24}>
                            <Paper elevation={24} style={paperStyle} zdepth={5}>
                                <div style={{ padding: 24 }}>
                                </div>
                                <div style={{ padding: 24 }}>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify="center">
                                            <Typography style={titleStyle}>
                                                WELCOME TO BLOCNETS
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ padding: 24 }}>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify="center">
                                            <img src={animatedLogo} alt="" />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ padding: 24 }}>
                                </div>
                            </Paper>
                        </Grid>
                    </div>

                    :

                    <div style={{ padding: 24 }}>
                        <Grid container spacing={24}>
                            <Paper elevation={24} style={paperStyle} zdepth={5}>
                                <Paper elevation={24} zdepth={5} style={{ 'borderRadius': '10px' }}>
                                    <Toolbar style={{
                                        "justifyContent": "center",
                                        "height": 170,
                                        'backgroundColor': 'white',
                                        'borderRadius': '10px'
                                    }} elevation={24}>
                                        <div style={{ padding: 48 }}>
                                            <Grid container spacing={24}>
                                                <Grid container item xs={12} justify="center">
                                                    <Typography style={titleStyle}>
                                                        <span>WHAT CAN BL</span>
                                                        <span style={{ "color": "#c60000" }}>O</span>
                                                        <span>CNETS DO FOR YOU?</span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Toolbar>
                                </Paper><br /><br /><br />
                                <Grid container spacing={24} style={{ 'marginBottom': '10px' }}>
                                    <Grid container spacing={24}>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-blue">
                                                        <Tooltip title="Send a Document">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'DRE01')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>send</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-red">
                                                        <Tooltip title="Review Pending Network Actions">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'DRE02')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>notification_important</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-green">
                                                        <Tooltip title="Track a Shipment">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'TAT02')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>location_on</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24}>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon-blue">
                                                        <Tooltip title="Save Production Data">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'DRE01')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>folder_shared</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-blue">
                                                        <Tooltip title="Save a Document">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'DRE01')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>cloud_upload</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon-red">
                                                        <Tooltip title="Search for Material">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'TAT02')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>search</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-red">
                                                        <Tooltip title="Material Master Data">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'eBOM01')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>list_alt</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon-green">
                                                        <Tooltip title="Start Production Tracking">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'PRD01')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>play_arrow</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-green">
                                                        <Tooltip title="End Production Tracking">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'PRD02')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>stop</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24}>
                                        <Grid item xs>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li></li>
                                                <li>
                                                    <div className="hexagon-red">
                                                        <Tooltip title="View Material History">
                                                            <ButtonBase focusRipple style={{ 'width': 'inherit', 'height': 'inherit' }}
                                                                onClick={event => this.handleView(event, 'TAT02')}>
                                                                <span>
                                                                    <i className="material-icons" style={{ 'fontSize': 'xx-large' }}>av_timer</i>
                                                                </span>
                                                            </ButtonBase>
                                                        </Tooltip>
                                                    </div>
                                                </li>
                                                <li></li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </div>

                }

                <div style={{ padding: 48 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs justify="center">
                            <Typography>
                                <span
                                    style={{ "color": "white" }}>{this.state.currentDateAndTime ? this.state.currentDateAndTime : "Loading..."}</span>
                            </Typography>
                        </Grid>
                        <Grid container item xs justify="center">
                            <Typography>
                                <span style={{ "color": "white" }}>Network Status: </span>
                                <span style={{ "color": "#ffb000" }}>Full Use</span>
                            </Typography>
                        </Grid>
                        <Grid container item xs justify="center">
                            <Typography>
                                <span style={{ "color": "white" }}>Your Status: </span>
                                <span style={{ "color": "#ffb000" }}>Attached to Network</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} justify="left">
                            <Typography>
                                <span style={{"color": "white"}}>Copyright 2018. ALL RIGHTS RESERVED.</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default SplashView;
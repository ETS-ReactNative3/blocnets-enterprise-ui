import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import animatedLogo from '../blocnets.gif';
import ButtonBase from '@material-ui/core/ButtonBase';

const paperStyle = {
    width: '100%',
    height: '85%',
    margin: '3%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '10 px',
    backgroundColor: 'transparent',
    boxShadow: 'none'
};

const titleStyle = {
    fontFamily: 'SCcustom',
    fontStyle: 'normal',
    fontSize: '28pt',
    color: '#ffffff'
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
                            <Paper style={paperStyle}>
                                <div style={{ padding: 24 }}>
                                </div>
                                <div style={{ padding: 24 }}>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify='center'>
                                            <Typography style={titleStyle}>
                                                <span>WELCOME TO BL</span>
                                                <span style={{ 'color': '#e32c1c' }}>O</span>
                                                <span>CNETS</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ padding: 24 }}>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify='center'>
                                            <img src={animatedLogo} alt='' />
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
                            <Paper style={paperStyle}>
                                <Paper style={{
                                    'borderRadius': '10px',
                                    'backgroundColor': 'transparent',
                                    'boxShadow': 'none'
                                }}>
                                    <div style={{ padding: 24 }}>
                                    </div>
                                    <div style={{ padding: 24 }}>
                                        <Grid container spacing={24}>
                                            <Grid container item xs={12} justify='center'>
                                                <Typography style={titleStyle}>
                                                    <span>WHAT CAN BL</span>
                                                    <span style={{ 'color': '#e32c1c' }}>O</span>
                                                    <span>CNETS DO FOR YOU?</span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div style={{ padding: 24 }}>
                                    </div>
                                </Paper><br /><br /><br />
                                <Grid container spacing={24} style={{ 'marginBottom': '10px' }}>
                                    <Grid container spacing={24}>
                                        <ul id='hexGrid'>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-red'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>notification_important</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'DRE02')}>
                                                            <h1>Review Pending Network Actions</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-red'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>list_alt</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                            <h1>Enter Material Master Data</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-green'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>local_shipping</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'SAR01')}>
                                                            <h1>Ship To Customer</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-red'>
                                                            <span><i className='material-icons' id='hex-icon'>search</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'TAT01')}>
                                                            <h1>Search for Material</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-red'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>av_timer</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'TAT01')}>
                                                            <h1>View Material History</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-green'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>stop</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'PRD02')}>
                                                            <h1>End Production Tracking</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-green'>
                                                            <span><i className='material-icons' id='hex-icon'>domain</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'SAR02')}>
                                                            <h1>Receive Shipment</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-green'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>center_focus_strong</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'TAT01')}>
                                                            <h1>Track a Shipment</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-green'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>play_arrow</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'PRD01')}>
                                                            <h1>Start Production Tracking</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-black'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>folder_shared</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'DRE01')}>
                                                            <h1>Save Production Data</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-black'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>cloud_upload</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'DRE03')}>
                                                            <h1>Save a Document</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-black'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>send</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'DRE01')}>
                                                            <h1>Send a Document</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                            <li className='hex'>
                                                <div className='hexIn'>
                                                    <span className='hex-container'>
                                                        <div className='hexagon-black'>
                                                            <span><i className='material-icons'
                                                                     id='hex-icon'>location_on</i></span>
                                                        </div>
                                                        <ButtonBase focusRipple
                                                                    style={{ 'width': '100%', 'height': '100%' }}
                                                                    onClick={event => this.handleView(event, 'GEO01')}>
                                                            <h1>Geo Mapping</h1>
                                                            <p></p>
                                                        </ButtonBase>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </div>

                }

                <div style={{ 'bottom': '0', 'position': 'inherit', 'width': '100%' }}>
                    <div style={{ padding: 48 }}>
                        <Grid container spacing={24}>
                            <Grid container item xs justify='center'>
                                <Typography>
                                    <span
                                        style={{ 'color': 'white' }}>{this.state.currentDateAndTime ? this.state.currentDateAndTime : 'Loading...'}</span>
                                </Typography>
                            </Grid>
                            <Grid container item xs justify='center'>
                                <Typography>
                                    <span style={{ 'color': 'white' }}>Network Status: </span>
                                    <span style={{ 'color': '#ffb000' }}>Full Use</span>
                                </Typography>
                            </Grid>
                            <Grid container item xs justify='center'>
                                <Typography>
                                    <span style={{ 'color': 'white' }}>Your Status: </span>
                                    <span style={{ 'color': '#ffb000' }}>Attached to Network</span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ padding: 24 }}>
                        <Grid container spacing={24}>
                            <Grid container item xs={12} justify='flex-start'>
                                <Typography>
                                    <span style={{ 'color': 'white' }}>Copyright 2018. ALL RIGHTS RESERVED.</span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default SplashView;
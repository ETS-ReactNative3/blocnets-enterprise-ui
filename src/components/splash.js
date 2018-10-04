import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import animatedLogo from '../blocnets.gif';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';


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
    fontFamily: 'Inter UI, sans-serif',
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
                            <Paper style={paperStyle}>
                                <Paper style={{ 'borderRadius': '10px', 'backgroundColor': 'transparent', 'boxShadow': 'none' }}>
                                    <div style={{ padding: 24 }}>
                                    </div>
                                    <div style={{ padding: 24 }}>
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
                                    <div style={{ padding: 24 }}>
                                    </div>
                                </Paper><br /><br /><br />
                                <Grid container spacing={24} style={{ 'marginBottom': '10px' }}>
                                    <Grid container spacing={24}>
                                        <ul id="hexGrid">
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Review Pending Network Actions</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Enter Material Master Data</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Ship To Customer</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Receive Shipment</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>View Material History</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Send a Document</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Search for Material</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Track a Shipment</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Start Production Tracking</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Save Production Data</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>Save a Document</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>End Production Tracking</h1>
                                                            <p>Some sample text..</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>This is a title</h1>
                                                            <p>Some sample text about the article this hexagon leads to</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                            <li className="hex">
                                                <ButtonBase focusRipple style={{ 'width': '100%', 'height': '100%' }}
                                                    onClick={event => this.handleView(event, 'eBOM01')}>
                                                    <div className="hexIn">
                                                        <span className="hexLink">
                                                            <div className="hexagon-green" />
                                                            <h1>This is a title</h1>
                                                            <p>Some sample text about the article this hexagon leads to</p>
                                                        </span>
                                                    </div>
                                                </ButtonBase>
                                            </li>
                                        </ul>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </div>

                }

                <div style={{"bottom": "0", "position": "fixed", "width": "100%"}}>
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
                            <Grid container item xs={12} justify="flex-start">
                                <Typography>
                                    <span style={{"color": "white"}}>Copyright 2018. ALL RIGHTS RESERVED.</span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} justify="flex-start">
                            <Typography>
                                <span style={{ "color": "white" }}>Copyright 2018. ALL RIGHTS RESERVED.</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default SplashView;
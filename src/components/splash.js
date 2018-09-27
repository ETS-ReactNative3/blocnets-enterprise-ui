import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import animatedLogo from '../Blocnets-Logo-Animated-Version-2.mp4';
import Toolbar from 'material-ui/Toolbar';
import Button from '@material-ui/core/Button/Button';
//import ButtonBase from '@material-ui/core/ButtonBase';
import BlueHex from '../img/Hexagon_Blue.svg';
import RedHex from '../img/Hexagon_Red.svg';
import GreenHex from '../img/Hexagon_Green.svg';

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
            , 10000);
        setInterval(() => {
            this.setState({currentDateAndTime: new Date().toUTCString()})
        }, 1000);
    }

    constructor(props) {
        super(props);
        this.state = {
            currentDateAndTime: ''
        };
    }

    handleView = (event, transactionCode) => {
        this.props.viewHandler('login', false, transactionCode, '');
    };

    render() {

        return (

            <div>

                {viewWelcomeVideo ?

                    <div style={{padding: 24}}>
                        <Grid container spacing={24}>
                            <Paper elevation={24} style={paperStyle} zdepth={5}>
                                <div style={{padding: 24}}>
                                </div>
                                <div style={{padding: 24}}>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify="center">
                                            <Typography style={titleStyle}>
                                                WELCOME TO BLOCNETS
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{padding: 24}}>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={12} justify="center">
                                            <video width="320" height="240" autoPlay controls loop>
                                                <source src={animatedLogo} type="video/mp4"/>
                                            </video>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{padding: 24}}>
                                </div>
                            </Paper>
                        </Grid>
                    </div>

                    :

                    <div style={{padding: 24}}>
                        <Grid container spacing={24}>
                            <Paper elevation={24} style={paperStyle} zdepth={5}>
                                <Paper elevation={24} zdepth={5} style={{'borderRadius': '10px'}}>
                                    <Toolbar style={{
                                        "justifyContent": "center",
                                        "height": 170,
                                        'backgroundColor': 'white',
                                        'borderRadius': '10px'
                                    }} elevation={24}>
                                        <div style={{padding: 48}}>
                                            <Grid container spacing={24}>
                                                <Grid container item xs={12} justify="center">
                                                    <Typography style={titleStyle}>
                                                        <span>WHAT CAN BL</span>
                                                        <span style={{"color": "#c60000"}}>O</span>
                                                        <span>CNETS DO FOR YOU?</span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Toolbar>
                                    <Grid container spacing={24}>
                                        <Grid container item xs={6} sm={2} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event, 'TT02')}
                                                    style={{"backgroundColor": "#ffb000"}}>
                                                TT02
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={6} sm={2} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event, 'DRE02')}
                                                    style={{"backgroundColor": "#ffb000"}}>
                                                DRE02
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={6} sm={2} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event, 'eBOM01')}
                                                    style={{"backgroundColor": "#ffb000"}}>
                                                eBOM01
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={6} sm={2} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event, 'SAR01')}
                                                    style={{"backgroundColor": "#ffb000"}}>
                                                SAR01
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={6} sm={2} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event, 'SAR02')}
                                                    style={{"backgroundColor": "#ffb000"}}>
                                                SAR02
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={6} sm={2} justify="center">
                                            <Button type="submit" value="submit" variant="contained"
                                                    onClick={event => this.handleView(event, 'PRD01')}
                                                    style={{"backgroundColor": "#ffb000"}}>
                                                PRD01
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper><br/><br/><br/>
                                <Grid container spacing={24} style={{'marginBottom': '10px'}}>
                                    <Grid container spacing={24}>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={BlueHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={RedHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={GreenHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24}>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={BlueHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={BlueHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={RedHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={RedHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                            </ul>
                                        </Grid>
                                        <Grid item xs>
                                            <ul id="grid" className="clear">
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={GreenHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={GreenHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
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
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                        <object type="image/svg+xml" data={RedHex}
                                                                className="hex-shadow" aria-label="">
                                                        </object>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="hexagon">
                                                    </div>
                                                </li>
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

                <div style={{padding: 48}}>
                    <Grid container spacing={24}>
                        <Grid container item xs justify="center">
                            <Typography>
                                <span
                                    style={{"color": "white"}}>{this.state.currentDateAndTime ? this.state.currentDateAndTime : "Loading..."}</span>
                            </Typography>
                        </Grid>
                        <Grid container item xs justify="center">
                            <Typography>
                                <span style={{"color": "white"}}>Network Status: </span>
                                <span style={{"color": "#ffb000"}}>Full Use</span>
                            </Typography>
                        </Grid>
                        <Grid container item xs justify="center">
                            <Typography>
                                <span style={{"color": "white"}}>Your Status: </span>
                                <span style={{"color": "#ffb000"}}>Attached to Network</span>
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
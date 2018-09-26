import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import ButtonBase from '@material-ui/core/ButtonBase';
import BlueHex from '../img/Hexagon_Blue.svg';
import RedHex from '../img/Hexagon_Red.svg';
import GreenHex from '../img/Hexagon_Green.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import paperLogo from '../blocnets-logo.png';
import blocnetsLogo from "../blocknetwhite-1.png";

const paperStyle = {
    width: '100%',
    height: '85%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '10 px'
};

class SplashView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: 'SAR01',
            show: null,
        };
    }

    handleView = () => {
        this.props.viewHandler(this.state.code)
    }

    render() {

        return (
            <div>
                <Grid container spacing={24}>
                    <Paper elevation={24} style={paperStyle} zdepth={5}>
                        <Paper elevation={24} zdepth={5} style={{ 'borderRadius': '10px' }}>
                            <Toolbar style={{ "justifyContent": "center", "height": 170, 'backgroundColor': 'white', 'borderRadius': '10px' }} elevation={24}>
                                <ToolbarTitle
                                    text={"WHAT CAN BLOCNETS DO FOR YOU?"}
                                />
                            </Toolbar>
                        </Paper>
                        <br /><br /><br />
                        <Grid container spacing={24} style={{ 'marginBottom': '10px' }}>
                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <ul id="grid" className="clear">
                                        <li>
                                            <div className="hexagon">
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                                <object type="image/svg+xml" data={BlueHex} className="hex-shadow" aria-label="">
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
                                                <object type="image/svg+xml" data={RedHex} className="hex-shadow" aria-label="">
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
                                                <object type="image/svg+xml" data={GreenHex} className="hex-shadow" aria-label="">
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
                                                <object type="image/svg+xml" data={BlueHex} className="hex-shadow" aria-label="">
                                                </object>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                                <object type="image/svg+xml" data={BlueHex} className="hex-shadow" aria-label="">
                                                </object>
                                            </div>
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item xs>
                                    <ul id="grid" className="clear">
                                        <li>
                                            <div className="hexagon">
                                                <object type="image/svg+xml" data={RedHex} className="hex-shadow" aria-label="">
                                                </object>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                                <object type="image/svg+xml" data={RedHex} className="hex-shadow" aria-label="">
                                                </object>
                                            </div>
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item xs>
                                    <ul id="grid" className="clear">
                                        <li>
                                            <div className="hexagon">
                                                <object type="image/svg+xml" data={GreenHex} className="hex-shadow" aria-label="">
                                                </object>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                            </div>
                                        </li>
                                        <li>
                                            <div className="hexagon">
                                                <object type="image/svg+xml" data={GreenHex} className="hex-shadow" aria-label="">
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
                                                <object type="image/svg+xml" data={RedHex} className="hex-shadow" aria-label="">
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};


export default connect(mapStateToProps)(SplashView);
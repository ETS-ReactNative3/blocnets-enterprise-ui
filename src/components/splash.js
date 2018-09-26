import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import ButtonBase from '@material-ui/core/ButtonBase';
import BlueHex from '../img/Hexagon_Blue.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import paperLogo from '../blocnets-logo.png';
import blocnetsLogo from "../blocknetwhite-1.png";

const paperStyle = {
    width: "100%",
    height: '85%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: 10 + 'px'
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
                <Grid container spacing={24} style={{ 'borderRadius': '10px' }}>
                    <Paper elevation={24} style={paperStyle} zdepth={5}>
                        <Paper elevation={24} zdepth={5} style={{ 'borderRadius': '10px' }}>
                            <Toolbar style={{ "justifyContent": "center", "height": 170, 'backgroundColor': 'white', 'borderRadius': '10px' }} elevation={24}>
                                <ToolbarTitle
                                    text={"WHAT CAN BLOCNETS DO FOR YOU?"}
                                />
                            </Toolbar>
                        </Paper>
                        <br /><br /><br />
                        <Grid container spacing={24} style={{'marginBottom': 'inherit'}}>
                        <Grid item xs>
                                <ul id="grid" class="clear">
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs>
                                <ul id="grid" class="clear">
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs>
                                <ul id="grid" class="clear">
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                    <li>
                                        <div class="hexagon"></div>
                                    </li>
                                </ul>
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
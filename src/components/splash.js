import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/AccountCircleRounded';
import ButtonBase from '@material-ui/core/ButtonBase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import paperLogo from '../blocnets-logo.png';
import blocnetsLogo from "../blocknetwhite-1.png";

const paperStyle = {
    width: "70%",
    height: '85%',
    margin: '5%',
    textAlign: 'center',
    display: 'inline-block',
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
            <div style={{'width':'100%'}}>
                <Grid container spacing={24}>
                    <Paper className="White-theme" elevation={24} style={paperStyle} zDepth={5}>
                        <Toolbar style={{ "justifyContent": "center", "height": 80 }}>
                            <ToolbarTitle
                                text={"Hello World"}
                            />
                        </Toolbar>
                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Paper>
                                    <div className="hex-grid">
                                        <div className="hex-section" style={{ }}>
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <div className="hex-grid">
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper>
                                    <div className="hex-grid">
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                        <div className="hex-section">
                                            <figure>
                                                <IconButton aria-label="" onClick={this.handleView}>
                                                    <UserIcon />
                                                </IconButton>
                                            </figure>
                                            <svg className='svg-icon-dre01'>
                                            </svg>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        <svg width="inherit" height="inherit">
                            <defs>
                                <clipPath id="hexa-v" clipPathUnits="objectBoundingBox">
                                    <polygon points=".5 0, 1 .25, 1 .75, .5 1, 0 .75, 0 .25" />
                                </clipPath>
                                <clipPath id="hexa-h" clipPathUnits="objectBoundingBox">
                                    <polygon points=".25 0, .75 0, 1 .5, .75 1, .25 1, 0 .5" />
                                </clipPath>
                            </defs>
                        </svg>
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
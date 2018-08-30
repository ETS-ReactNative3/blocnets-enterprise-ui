import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "material-ui/Paper";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import yellow from "@material-ui/core/colors/yellow";

class TrackAndTraceResultsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
            },
        };
    }

    render() {

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        return (
            <form >
                <div style={{padding: 24}} >
                    <Grid container>
                        <Grid container item xs={12}>
                            Block Information
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container justify="center">
                        <Grid container item xs={12}>
                            <Paper style={{"width": "100%", "height": "50vh"}}>
                                <div style={{"overflowX": "auto"}}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisinuli.
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="eBOM" variant="contained" color="primary"
                                        fullWidth={true}>
                                    Engineering Bill of Materials
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="mBOM" variant="contained" color="primary"
                                        fullWidth={true}>
                                    Manufacturing Bill of Materials
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
            </form>
        );

    }

}

export default TrackAndTraceResultsView;
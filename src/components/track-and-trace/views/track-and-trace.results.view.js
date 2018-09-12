import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "material-ui/Paper";
import Typography from '@material-ui/core/Typography';
import Snackbar from "material-ui/Snackbar";

class TrackAndTraceResultsView extends Component {

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
    };

    render() {

        return (
            <form>
                <div>
                    <div style={{padding: 24}}>
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
                                        <Typography align="left">
                                            {this.props.tatData}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    <Snackbar
                        open={this.props.snackbar.open}
                        message={this.props.snackbar.message}
                        autoHideDuration={this.props.snackbar.autoHideDuration}
                        onRequestClose={this.handleSnackbarClose}
                        bodyStyle={{backgroundColor: this.props.snackbar.sbColor}}
                    />
                </div>
            </form>
        );

    }

}

export default TrackAndTraceResultsView;
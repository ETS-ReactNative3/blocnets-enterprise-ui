import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "material-ui/Paper";
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import yellow from "@material-ui/core/colors/yellow";
import Snackbar from "material-ui/Snackbar";
import BillOfMaterialsTree from "../../bill-of-materials/views/bill-of-materials.tree.view";

class TrackAndTraceResultsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBillOfMaterialsTree: false
        };
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        });
        this.props.data.snackbar.open = false;
    };

    handleEBOM = (event) => {
        this.setState({showBillOfMaterialsTree: true});
        event.preventDefault();
    };

    handleMBOM = (event) => {
        this.setState({showBillOfMaterialsTree: true});
        event.preventDefault();
    };

    render() {

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        return (
            <form>
                {this.state.showBillOfMaterialsTree === false ?
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
                                                {this.props.data.billOfMaterialsData}
                                            </Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <br/>
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button type="submit" value="eBOM" variant="contained" color="primary"
                                                fullWidth={true} onClick={event => this.handleEBOM(event)}
                                                disabled={!this.props.data.billOfMaterialsData}>
                                            Engineering Bill of Materials
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button type="submit" value="mBOM" variant="contained" color="primary"
                                                fullWidth={true} onClick={event => this.handleMBOM(event)}
                                                disabled={!this.props.data.billOfMaterialsData}>
                                            Manufacturing Bill of Materials
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                        </div>
                        <Snackbar
                            open={this.props.data.snackbar.open}
                            message={this.props.data.snackbar.message}
                            autoHideDuration={this.props.data.snackbar.autoHideDuration}
                            onRequestClose={this.handleSnackbarClose}
                            bodyStyle={{backgroundColor: this.props.data.snackbar.sbColor}}
                        />
                    </div>
                    : ''}
                {this.state.showBillOfMaterialsTree === true ?
                    <div><BillOfMaterialsTree/></div> : ""}
            </form>
        );

    }

}

export default TrackAndTraceResultsView;
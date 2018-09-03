import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "material-ui/Paper";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import yellow from "@material-ui/core/colors/yellow";
import Snackbar from "material-ui/Snackbar";
import BillOfMaterialsTree from "../../bill-of-materials/views/bill-of-materials.tree.view";
import { connect } from 'react-redux';

class TrackAndTraceResultsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: {
                autoHideDuration: 2000,
                message: 'Successfully tracked a block!',
                open: true,
                sbColor: 'black'
            },
            showBillOfMaterialsTree: false,
            blockInformation: ''
        };
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Error',
                open: true,
                sbColor: 'red'
            }
        }); to show error message */
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
    };

    handleEBOM = (event) => {
        console.log("This is it...");
        console.log(this.props.data.billOfMaterialsReducer.items);
        this.setState({ showBillOfMaterialsTree: true });
        event.preventDefault();
    };

    handleMBOM = (event) => {
        this.setState({ showBillOfMaterialsTree: true });
        event.preventDefault();
    };

    

    render() {

        // Does not work
        /* (function () {
            setTimeout(
                function () {
                    this.setState({
                        blockInformation: this.props.data.billOfMaterialsReducer
                    });
                }
                    .bind(this),
                3000
            );
        }); */

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        return (
            <form>
                {this.state.showBillOfMaterialsTree === false ?
                    <div>
                        <div style={{ padding: 24 }}>
                            <Grid container>
                                <Grid container item xs={12}>
                                    Block Information
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container justify="center">
                                <Grid container item xs={12}>
                                    <Paper style={{ "width": "100%", "height": "50vh" }}>
                                        <div style={{ "overflowX": "auto" }}>
                                            {this.state.blockInformation}
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button type="submit" value="eBOM" variant="contained" color="primary"
                                            fullWidth={true} onClick={event => this.handleEBOM(event)}>
                                            Engineering Bill of Materials
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button type="submit" value="mBOM" variant="contained" color="primary"
                                            fullWidth={true} onClick={event => this.handleMBOM(event)}>
                                            Manufacturing Bill of Materials
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                        </div>
                        <Snackbar
                            open={this.state.snackbar.open}
                            message={this.state.snackbar.message}
                            autoHideDuration={this.state.snackbar.autoHideDuration}
                            onRequestClose={this.handleSnackbarClose}
                            bodyStyle={{ backgroundColor: this.state.snackbar.sbColor }}
                        />
                    </div>
                    : ''}
                {this.state.showBillOfMaterialsTree === true ?
                    <div><BillOfMaterialsTree /></div> : ""}
            </form>
        );

    }

}


const mapStateToProps = (state) => {
    return {
        data: state
    };
};


export default connect(mapStateToProps)(TrackAndTraceResultsView);
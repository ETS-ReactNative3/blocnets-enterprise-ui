import React, { Component } from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getData } from '../../redux/actions/main.actions';
import axios from 'axios';

class ReceivingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            shipmentID: '',
            address: '',
            ipAddress: '',
            manualShipping: '',
            openDialog: false,
            count: 0,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
            },
        };
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIDChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.state.showProgressLogo = true;
        //this.props.getData(this.state.materialID);
        event.preventDefault();
        this.state.showProgressLogo = false;
        /* 
        if (this.state.shipmentID == '') {
            this.props.getData(this.state.materialID);
        } else {
            this.props.getData(this.state.shipmentID);
        } */
        this.props.getData(this.state.materialID)
        this.state.openDialog = true;
        console.log(this.state.data);
    }

    createData(info1, info2) {
        this.state.count += 1;
        return { id: this.state.count, info1, info2 };
    }

    handleDialogClose = () => {
        this.setState({ openDialog: false });
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    render() {

        if (this.props.requestError) {
            return <p>Oh No! Something went unexpected..</p>;
        }

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const rows = [
            this.createData('Material ID', this.state.materialID),
            this.createData('Shipment ID', this.state.shipmentID),
            this.createData('Address', this.state.data),
            this.createData('IP Address', this.state.ipAddress),
            this.createData('Manual Shipping', this.state.manualShipping),
        ];

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} className="App-logo-progress" /> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.materialID} onChange={this.handleIDChange} type="text"
                                name="materialID" floatingLabelText="Material ID" floatingLabelFixed={true}
                                style={{ "float": "left" }} hintText=""
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.shipmentID} onChange={this.handleIDChange} type="text"
                                name="shipmentID" floatingLabelText="Shipment ID" floatingLabelFixed={true}
                                style={{ "float": "left" }} hintText=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                    fullWidth={true} disabled={!this.state.materialID && !this.state.shipmentID}>
                                    Submit
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{ padding: 24 }}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <i className="material-icons" style={{ "cursor": "pointer" }}
                                    onClick={this.handleDialogClose}>close</i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <Paper>
                                    <Table>
                                        <TableBody>
                                            {rows.map(row => {
                                                return (
                                                    <TableRow key={row.id}>
                                                        <TableCell>
                                                            {row.info1}
                                                        </TableCell>
                                                        <TableCell>{row.info2}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open} message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration} onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{ backgroundColor: "red" }}
                />
            </form>
        );

    }

}

ReceivingView.propTypes = {
    getData: PropTypes.func.isRequired,
    loadingView: PropTypes.bool.isRequired,
    requestFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    return {
        loadingView: state.loadingView,
        getData: state.getData,
        requestFailed: state.requestFailed,
        data: state.data
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getData: (value) => dispatch(getData(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceivingView);
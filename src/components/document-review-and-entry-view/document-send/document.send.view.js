import React, {Component} from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import Snackbar from 'material-ui/Snackbar';
import response from './messageData.json';


class DocumentSendView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            sendToUser: '',
            messageType: '',
            dataType: '',
            openDialog: false,
            formComplete: '',
            count: 0,
            doNotAskAgain: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createData(info1, info2) {
        this.state.count += 1;
        return {id: this.state.count, info1, info2};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value, formComplete: true});
    }

    handleConfirmation(event) {
        this.setState({openDialog: true});
        event.preventDefault();
    }

    handleSubmit(event) {
        this.setState({showProgressLogo: true, openDialog: false});

        event.preventDefault();
    }

    handlePrint = () => {
    };


    handleDialogClose = () => {
        this.setState({openDialog: false});
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                message: '',
                open: false
            },
        });
    };

    render() {

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const button2Theme = createMuiTheme({
            palette: {
                primary: red
            },
        });

        const rows = [
            this.createData('userID', response.userID),
            this.createData('messageType', response.messageType),
            this.createData('dataType', response.dataType),
        ];

        return (
            <form onSubmit={this.handleConfirmation}>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} className="App-logo-progress"/> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs>
                            <TextField required
                                       value={this.state.sendToUser} onChange={this.handleChange} type="text"
                                       name="userID" floatingLabelText="Receipient's username" floatingLabelFixed={true}
                                       style={{"float": "left"}} hintText="username"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField required
                                       value={this.state.messageType} onChange={this.handleChange} type="text"
                                       name="messageType" floatingLabelText=" " floatingLabelFixed={true}
                                       style={{"float": "left"}} hintText="Message Type"
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField required
                                       value={this.state.dataType} onChange={this.handleChange} type="text"
                                       name="dataType" floatingLabelText=" " floatingLabelFixed={true}
                                       style={{"float": "left"}} hintText="Data Type"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!this.state.formComplete}>
                                    Send Document for Review
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{padding: 24}}>
                        <Grid container>
                            <Grid container item xs={12}>
                                Please confirm information.
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container justify="center">
                            <Grid container item xs={12}>
                                <Paper style={{"width": "100%"}}>
                                    <div style={{"overflowX": "auto"}}>
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
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={this.state.doNotAskAgain} onChange={this.handleCheckboxChange}
                                                name="doNotAskAgain" color="default"
                                            />
                                        }
                                        label="Do not ask again."
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="print" value="Print" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handlePrint}>
                                        Print...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="ok" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={button2Theme}>
                                    <Button type="cancel" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogClose}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open} message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </form>

        );
    }

}

export default DocumentSendView;
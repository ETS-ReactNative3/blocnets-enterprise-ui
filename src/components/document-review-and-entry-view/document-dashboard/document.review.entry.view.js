import React from 'react';
import PropTypes from 'prop-types';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';
import Button from "@material-ui/core/Button/Button";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Snackbar from "material-ui/Snackbar";
//Temporary Only
import response from './sample.json';

let counter = 0;

function createData(messageType, messageDescription, messageDate) {
    counter += 1;
    return {id: counter, messageType, messageDescription, messageDate};
}

function createTableContent() {
    let tableContent = [];
    for (let i = 0; i < response[0].messages.length; i++) {
        if (response[0].messages[i].status === 'pending') {
            tableContent.push(createData(response[0].messages[i].type, response[0].messages[i].desc, response[0].messages[i].date));
        }
    }
    return tableContent;
}

const rows = [
    {id: 'messageType', label: 'Message Type'},
    {id: 'messageDescription', label: 'Message Description'},
    {id: 'messageDate', label: 'Date'}
];

class TableHeader extends React.Component {
    render() {
        const {onSelectAllClick, numSelected, rowCount} = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                            >
                                {row.label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

TableHeader.propTypes = {
    onSelectAllClick: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class DocumentReviewEntryView extends React.Component {

    state = {
        showProgressLogo: false,
        selected: [],
        data: createTableContent(),
        page: 0,
        rowsPerPage: 10,
        openDialog: false,
        dialogMessageType: '',
        dialogMessageDescription: '',
        snackbar: {
            autoHideDuration: 2000,
            message: '',
            open: false,
            sbColor: 'black'
        },
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClickCheckbox = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected});
    };

    handleClickMessages = (event, messageType, messageDescription, messageDate) => {
        this.setState({
            openDialog: true,
            dialogMessageType: messageType,
            dialogMessageDescription: messageDescription
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleApprove = (event) => {
        //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
        //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Success',
                open: true,
                sbColor: 'black'
            }
        }); to show success message */
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Error',
                open: true,
                sbColor: 'red'
            }
        }); to show error message */
        event.preventDefault();
    };

    handleReject = (event) => {
        //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
        //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Success',
                open: true,
                sbColor: 'black'
            }
        }); to show success message */
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Error',
                open: true,
                sbColor: 'red'
            }
        }); to show error message */
        event.preventDefault();
    };

    handleDialogClose = () => {
        this.setState({openDialog: false});
    };

    handleDialogApprove = (event) => {
        //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
        //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Success',
                open: true,
                sbColor: 'black'
            }
        }); to show success message */
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Error',
                open: true,
                sbColor: 'red'
            }
        }); to show error message */
        this.setState({openDialog: false});
        event.preventDefault();
    };

    handleDialogReject = (event) => {
        //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
        //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Success',
                open: true,
                sbColor: 'black'
            }
        }); to show success message */
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Error',
                open: true,
                sbColor: 'red'
            }
        }); to show error message */
        this.setState({openDialog: false});
        event.preventDefault();
    };

    render() {

        const {data, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });
        const buttonThemeRed = createMuiTheme({
            palette: {
                primary: red
            },
        });

        return (
            <div>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} alt="" className="App-logo-progress"/> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container justify="center">
                        <Grid container item xs={12}>
                            <Paper style={{"width": "100%"}}>
                                <div style={{"overflowX": "auto"}}>
                                    <Table>
                                        <TableHeader
                                            numSelected={selected.length}
                                            onSelectAllClick={this.handleSelectAllClick}
                                            rowCount={data.length}
                                        />
                                        <TableBody>
                                            {data
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(n => {
                                                    const isSelected = this.isSelected(n.id);
                                                    return (
                                                        <TableRow
                                                            hover
                                                            aria-checked={isSelected}
                                                            tabIndex={-1}
                                                            key={n.id}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    onClick={event => this.handleClickCheckbox(event, n.id)}
                                                                    checked={isSelected}/>
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageType, n.messageDescription, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageType}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageType, n.messageDescription, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageDescription}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageType, n.messageDescription, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageDate}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{height: 49 * emptyRows}}>
                                                    <TableCell colSpan={6}/>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        component="div"
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={3}>
                            <Grid>
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Upload" variant="contained"
                                            color="primary" disabled>
                                        Upload...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <Grid container item xs justify="flex-end">
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Approve" variant="contained"
                                            color="primary" disabled={selected.length === 0}
                                            onClick={event => this.handleApprove(event)}>
                                        Approve
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs justify="flex-end">
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Reject" variant="contained"
                                            color="primary" disabled={selected.length === 0}
                                            onClick={event => this.handleReject(event)}>
                                        Reject
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{padding: 24}}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <i className="material-icons" style={{"cursor": "pointer"}}
                                   onClick={this.handleDialogClose}>close</i>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container>
                            <Grid container item xs={12}>
                                <b>{this.state.dialogMessageType}</b>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container>
                            <Grid container item xs={12}>
                                {this.state.dialogMessageDescription}
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="ok" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={event => this.handleDialogApprove(event)}>
                                        Approve
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="cancel" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={event => this.handleDialogReject(event)}>
                                        Reject
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </div>
        );

    }

}

DocumentReviewEntryView.propTypes = {
    classes: PropTypes.object,
};

export default DocumentReviewEntryView;
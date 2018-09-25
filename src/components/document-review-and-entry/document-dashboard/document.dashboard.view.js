import React from 'react';
import PropTypes from 'prop-types';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button/Button';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import {
    getEachMessageForUserID
} from '../../../redux/actions/user.message.array.action';

let counter = 0;

const rows = [
    {id: 'messageStatus', label: 'Status'},
    {id: 'messageType', label: 'Message Type'},
    {id: 'messageDataType', label: 'Data Type'},
    {id: 'messageDescription', label: 'Message'},
    {id: 'messageFile', label: 'Attached File(s)'},
    {id: 'messageDate', label: 'Date'}
];

let dialogCounter = 0;

function createDialogData(info1, info2) {
    dialogCounter += 1;
    return {id: dialogCounter, info1, info2};
}

class TableHeader extends React.Component {
    render() {
        const {onSelectAllClick, numSelected, rowCount} = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick} color="default"
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell key={row.id}>
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

class DocumentDashboardView extends React.Component {

    componentDidMount() {
        Promise.resolve(this.props.getEachMessageForUserID('BadData'))
            .then(() => {
                if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                    this.setState({
                        showProgressLogo: false,
                        data: this.createTableContent()
                    })
                } else {
                    this.setState({
                        showProgressLogo: false,
                        data: []
                    })
                }
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: true,
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 10,
            openDialog: false,
            dialogMessageStatus: '',
            dialogMessageType: '',
            dialogMessageDataType: '',
            dialogMessageDescription: '',
            dialogMessageFile: '',
            dialogMessageDate: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        }
    };

    createTableContent = () => {
        let tableContent = [];
        let createData = (messageStatus, messageType, messageDataType, messageDescription, messageFile, messageDate) => {
            counter += 1;
            return {
                id: counter,
                messageStatus,
                messageType,
                messageDataType,
                messageDescription,
                messageFile,
                messageDate
            };
        };
        if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
            for (let i = 0; i < this.props.data.umaReducer.getEachMessageForUserIDSuccess.length; i++) {
                tableContent.push(
                    createData(
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].status,
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].type,
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].desc,
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].text,
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].fileId,
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].date
                    ));
            }
        }
        return tableContent;
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

    handleClickMessages = (event, messageStatus, messageType, messageDataType, messageDescription, messageFile, messageDate) => {
        this.setState({
            openDialog: true,
            dialogMessageStatus: messageStatus,
            dialogMessageType: messageType,
            dialogMessageDataType: messageDataType,
            dialogMessageDescription: messageDescription,
            dialogMessageFile: messageFile,
            dialogMessageDate: messageDate
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleApprove = (event) => {
    };

    handleReject = (event) => {
    };

    handleDialogClose = () => {
        this.setState({openDialog: false});
    };

    handleDialogApprove = (event) => {
    };

    handleDialogReject = (event) => {
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

        const dialogRows = [
            createDialogData('Status', this.state.dialogMessageStatus.toUpperCase()),
            createDialogData('Message Type', this.state.dialogMessageType),
            createDialogData('Data Type', this.state.dialogMessageDataType),
            createDialogData('Message', this.state.dialogMessageDescription),
            createDialogData('File', this.state.dialogMessageFile),
            createDialogData('Date', this.state.dialogMessageDate)
        ];

        return (
            <div>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt=""/>
                        </div> : ""}
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
                                        <TableBody style={{"overflowWrap": "break-word"}}>
                                            {data
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(n => {
                                                    const isSelected = this.isSelected(n.id);
                                                    return (
                                                        <TableRow hover aria-checked={isSelected}
                                                                  tabIndex={-1} key={n.id}>
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    onClick={event => this.handleClickCheckbox(event, n.id)}
                                                                    checked={isSelected} color="default"/>
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageStatus, n.messageType, n.messageDataType, n.messageDescription, n.messageFile, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageStatus.toUpperCase()}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageStatus, n.messageType, n.messageDataType, n.messageDescription, n.messageFile, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageType}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageStatus, n.messageType, n.messageDataType, n.messageDescription, n.messageFile, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageDataType}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageStatus, n.messageType, n.messageDataType, n.messageDescription, n.messageFile, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageDescription}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageStatus, n.messageType, n.messageDataType, n.messageDescription, n.messageFile, n.messageDate)}
                                                                style={{"cursor": "pointer"}}>
                                                                {n.messageFile}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n.messageStatus, n.messageType, n.messageDataType, n.messageDescription, n.messageFile, n.messageDate)}
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
                                    <input
                                        style={{'display': 'none'}}
                                        type="file"
                                    />
                                    <label>
                                        <Button type="submit" value="Upload" variant="contained"
                                                color="primary" disabled={true}>
                                            Upload
                                            <CloudUploadIcon style={{'marginLeft': '12'}}/>
                                        </Button>
                                    </label>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <Grid container item xs justify="flex-end">
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Approve" variant="contained"
                                            color="primary" disabled={true}
                                            onClick={this.handleApprove}>
                                        Approve
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs justify="flex-end">
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Reject" variant="contained"
                                            color="primary" disabled={true}
                                            onClick={this.handleReject}>
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
                        <Grid container justify="center">
                            <Grid container item xs={12}>
                                <Paper style={{"width": "100%"}}>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                                          className="App-logo-progress" alt=""/>
                                            </div> : ""}
                                    </div>
                                    <div style={{"overflowX": "auto"}}>
                                        <Table style={{"tableLayout": "fixed"}}>
                                            <TableBody style={{"overflowWrap": "break-word"}}>
                                                {dialogRows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>{row.info1}</TableCell>
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
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Approve" variant="flat" color="primary"
                                            fullWidth={true} disabled={true}
                                            onClick={this.handleDialogApprove}>
                                        Approve
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Reject" variant="flat" color="primary"
                                            fullWidth={true} disabled={true}
                                            onClick={this.handleDialogReject}>
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

DocumentDashboardView.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        data: state,
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getEachMessageForUserID: (user) => dispatch(getEachMessageForUserID(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDashboardView);
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
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { getEachMessageForUserID } from '../../../redux/actions/UMA/user.message.array.action';
import { updateDocumentEntryByUniqueID } from '../../../redux/actions/document.review.entry.actions';
import { retrieveFileByKey } from '../../../redux/actions/FILE/file.action';
import { Document, Page } from 'react-pdf';

let counter = 0;

const rows = [
    { id: 'messageStatus', label: 'Status' },
    { id: 'messageType', label: 'Message Type' },
    { id: 'messageDataType', label: 'Data Type' },
    { id: 'messageDescription', label: 'Message' },
    { id: 'messageFile', label: 'Attached File(s)' },
    { id: 'messageDate', label: 'Date' }
];

let dialogCounter = 0;

function createDialogData(info1, info2) {
    dialogCounter += 1;
    return { id: dialogCounter, info1, info2 };
}

function handleDialogData(file) {
    return file;
}

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

class TableHeader extends React.Component {
    render() {
        const { onSelectAllClick, numSelected, rowCount, hideSelectAll } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        {
                            hideSelectAll === true ?
                                ''
                                :
                                <Checkbox
                                    checked={numSelected === rowCount}
                                    onChange={onSelectAllClick} color="default"
                                />
                        }
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
    rowCount: PropTypes.number.isRequired
};

class DocumentDashboardView extends React.Component {

    componentDidMount() {
        !this.isCancelled && Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
            .then(() => {
                if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                    this.setState({
                        showProgressLogo: false,
                        data: this.createTableContent()
                    });
                } else {
                    this.setState({
                        showProgressLogo: false,
                        data: []
                    });
                }
            })
    }

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: true,
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 10,
            openDialog: false,
            showProgressLogoDialog: false,
            dialog: {
                messageStatus: '',
                messageType: '',
                messageDataType: '',
                messageDescription: '',
                messageFile: '',
                messageDate: '',
                messageID: '',
            },
            messageList: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
            openFileDialog: false,
            mimeType: '',
            reconstructedFile: ["test"],
            numPages: null
        }
    };

    createTableContent = () => {
        let tableContent = [];
        let createData = (messageStatus, messageType, messageDataType, messageDescription, messageFile, messageDate, messageID) => {
            counter += 1;
            return {
                id: counter,
                messageStatus,
                messageType,
                messageDataType,
                messageDescription,
                messageFile,
                messageDate,
                messageID
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
                        this.props.data.umaReducer.getEachMessageForUserIDSuccess[i].date,
                        this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages[i]
                    ));
            }
        }
        return tableContent;
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClickCheckbox = (event, n) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(n.id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, n.id);
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
        this.setState({ selected: newSelected });
        let messageList = this.state.messageList;
        let indexDelete = null;
        if (selectedIndex === -1) {
            messageList.push({
                messageStatus: n.messageStatus,
                messageType: n.messageType,
                messageDataType: n.messageDataType,
                messageDescription: n.messageDescription,
                messageFile: n.messageFile,
                messageDate: n.messageDate,
                messageID: n.messageID
            });
            this.setState({ messageList: messageList });
        } else {
            if (messageList) {
                for (let i = 0; i < messageList.length; i++) {
                    if (messageList[i].messageID === n.messageID) {
                        indexDelete = i;
                    }
                }
                let messageList2 = messageList.slice(0, indexDelete);
                let messageList3 = messageList.slice(indexDelete + 1);
                messageList = messageList2.concat(messageList3);
                this.setState({ messageList: messageList });
            } else {
                messageList = [];
                this.setState({ messageList: messageList });
            }
        }
    };

    handleClickMessages = (event, n) => {
        this.setState({
            openDialog: true,
            dialog: {
                messageStatus: n.messageStatus,
                messageType: n.messageType,
                messageDataType: n.messageDataType,
                messageDescription: n.messageDescription,
                messageFile: n.messageFile,
                messageDate: n.messageDate,
                messageID: n.messageID
            }
        });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleApprove = () => {
        this.setState({ showProgressLogo: true });
        let messageList = this.state.messageList;
        let url = '';
        let body = '';
        let dreError = [];
        for (let i = 0; i < messageList.length; i++) {
            url = messageList[i].messageID;
            body = {
                text: messageList[i].messageDescription,
                status: 'Approved',
                type: messageList[i].messageType,
                desc: messageList[i].messageDataType,
                fileId: messageList[i].messageFile
            };
            Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
                .then(() => {
                    if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDError !== '') {
                        dreError.push(' ' + i + 1);
                    }
                });
        }
        if (dreError.length === 0) {
            Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
                .then(() => {
                    if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                        this.setState({
                            data: this.createTableContent()
                        })
                    } else {
                        this.setState({
                            data: []
                        })
                    }
                    this.setState({
                        showProgressLogo: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Document/s Approved Successfully!',
                            open: true,
                            sbColor: '#23CE6B'
                        },
                        selected: [],
                        messageList: []
                    })
                })
        } else {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error approving document! Please check Message -' + dreError + ', then try again.',
                    open: true,
                    sbColor: '#red'
                }
            })
        }
    };

    handleReject = () => {
        this.setState({ showProgressLogo: true });
        let messageList = this.state.messageList;
        let url = '';
        let body = '';
        let dreError = [];
        for (let i = 0; i < messageList.length; i++) {
            url = messageList[i].messageID;
            body = {
                text: messageList[i].messageDescription,
                status: 'Rejected',
                type: messageList[i].messageType,
                desc: messageList[i].messageDataType,
                fileId: messageList[i].messageFile
            };
            Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
                .then(() => {
                    if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDError !== '') {
                        dreError.push(' ' + i + 1);
                    }
                });
        }
        if (dreError.length === 0) {
            Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
                .then(() => {
                    if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                        this.setState({
                            data: this.createTableContent()
                        })
                    } else {
                        this.setState({
                            data: []
                        })
                    }
                    this.setState({
                        showProgressLogo: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Document/s Rejected Successfully!',
                            open: true,
                            sbColor: '#23CE6B'
                        },
                        selected: [],
                        messageList: []
                    })
                })
        } else {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error rejecting document! Please check Message -' + dreError + ', then try again.',
                    open: true,
                    sbColor: '#red'
                }
            })
        }
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false });
    };

    handleDialogApprove = (event) => {
        event.preventDefault();
        this.setState({ showProgressLogoDialog: true });
        let url = this.state.dialog.messageID;
        let body = {
            text: this.state.dialog.messageDescription,
            status: 'Approved',
            type: this.state.dialog.messageType,
            desc: this.state.dialog.messageDataType,
            fileId: this.state.dialog.messageFile
        };
        Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
            .then(() => {
                if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDSuccess) {
                    Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
                        .then(() => {
                            if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                                this.setState({
                                    data: this.createTableContent()
                                })
                            } else {
                                this.setState({
                                    data: []
                                })
                            }
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Document Approved Successfully!',
                                    open: true,
                                    sbColor: '#23CE6B'
                                },
                                openDialog: false
                            })
                        })
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error approving document! Please try again.',
                            open: true,
                            sbColor: '#red'
                        },
                        openDialog: false
                    })
                }
            });
    };

    handleDialogReject = (event) => {
        event.preventDefault();
        this.setState({ showProgressLogoDialog: true });
        let url = this.state.dialog.messageID;
        let body = {
            text: this.state.dialog.messageDescription,
            status: 'Rejected',
            type: this.state.dialog.messageType,
            desc: this.state.dialog.messageDataType,
            fileId: this.state.dialog.messageFile
        };
        Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
            .then(() => {
                if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDSuccess) {
                    Promise.resolve(this.props.getEachMessageForUserID(this.props.userName))
                        .then(() => {
                            if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                                this.setState({
                                    data: this.createTableContent()
                                })
                            } else {
                                this.setState({
                                    data: []
                                })
                            }
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Document Rejected Successfully!',
                                    open: true,
                                    sbColor: '#23CE6B'
                                },
                                openDialog: false
                            })
                        })
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error rejecting document! Please try again.',
                            open: true,
                            sbColor: '#red'
                        },
                        openDialog: false
                    })
                }
            });
    };

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

    decodeFile = (encodedFile, contentType) => {
        this.setState({
            reconstructedFile: [encodedFile],
            mimeType: contentType
        });
    };

    handleDREValidation = () => {
        if (this.props.data.fileReducer.retrieveFileByKeySuccess) {
            this.setState({
                openFileDialog: true,
                showProgressLogoDialog: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'File Retrieved Successfully!',
                    open: true,
                    sbColor: '#23CE6B'
                }
            });
            this.decodeFile(this.props.data.fileReducer.retrieveFileByKeySuccess.file, this.props.data.fileReducer.retrieveFileByKeySuccess.contentType);
        } else {
            this.setState({
                showProgressLogoDialog: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error retrieving file! Please try again.',
                    open: true,
                    sbColor: 'red'
                }
            });
        }
    };

    handleDialogViewFile = (event, messageFile) => {
        this.setState({ showProgressLogoDialog: true });
        Promise.resolve(this.props.retrieveFileByKey(messageFile))
            .then(() => {
                this.handleDREValidation();
            })
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    handleFileDialogClose = () => {
        this.setState({ openFileDialog: false });
    };

    render() {

        const { data, selected, rowsPerPage, page, numPages } = this.state;

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
            createDialogData('Status', this.state.dialog.messageStatus.toUpperCase()),
            createDialogData('Message Type', this.state.dialog.messageType),
            createDialogData('Data Type', this.state.dialog.messageDataType),
            createDialogData('Message', this.state.dialog.messageDescription),
            createDialogData('File', this.state.dialog.messageFile),
            createDialogData('Date', this.state.dialog.messageDate)
        ];

        const showImageFile = handleDialogData(<img src={this.state.reconstructedFile[0]} width='100%' height='auto'
                                                    alt='' />);

        return (
            <div>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container justify="center">
                        <Grid container item xs={12}>
                            <Paper style={{ "width": "100%" }}>
                                <div style={{ "overflowX": "auto" }}>
                                    <Table>
                                        <TableHeader
                                            numSelected={selected.length}
                                            onSelectAllClick={this.handleSelectAllClick}
                                            rowCount={data.length}
                                            hideSelectAll={true}
                                        />
                                        <TableBody style={{ "overflowWrap": "break-word" }}>
                                            {data
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(n => {
                                                    const isSelected = this.isSelected(n.id);
                                                    return (
                                                        <TableRow hover aria-checked={isSelected}
                                                                  tabIndex={-1} key={n.id}>
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    onClick={event => this.handleClickCheckbox(event, n)}
                                                                    checked={isSelected} color="default"
                                                                    disabled={n.messageStatus !== 'Pending'} />
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.messageStatus.toUpperCase()}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.messageType}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.messageDataType}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.messageDescription}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.messageFile}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickMessages(event, n)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.messageDate}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 49 * emptyRows }}>
                                                    <TableCell colSpan={7} />
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
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={3}>
                            {
                                /*
                                <Grid>
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <input
                                            style={{ 'display': 'none' }}
                                            type="file"
                                        />
                                        <label>
                                            <Button type="submit" value="Upload" variant="contained"
                                                    color="primary" disabled={true}>
                                                Upload
                                                <CloudUploadIcon style={{ 'marginLeft': '12' }} />
                                            </Button>
                                        </label>
                                    </MuiThemeProvider>
                                </Grid>
                                */
                            }
                        </Grid>
                        <Grid container item xs={12} sm={6}>
                        </Grid>
                        <Grid container item xs={12} sm={3}>
                            <Grid container item xs justify="flex-end">
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Approve" variant="contained"
                                            color="primary" disabled={this.state.selected.length === 0}
                                            onClick={this.handleApprove}>
                                        Approve
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs justify="flex-end">
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Reject" variant="contained"
                                            color="primary" disabled={this.state.selected.length === 0}
                                            onClick={this.handleReject}>
                                        Reject
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
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
                            <Grid container item xs={12}>
                                <Paper style={{ "width": "100%" }}>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                                          className="App-logo-progress" alt="" />
                                            </div> : ""}
                                    </div>
                                    <div style={{ "overflowX": "auto" }}>
                                        <Table style={{ "tableLayout": "fixed" }}>
                                            <TableBody style={{ "overflowWrap": "break-word" }}>
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
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                                <Grid container item xs>
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button type="submit" value="ViewFile" variant="contained" color="primary"
                                                onClick={event => this.handleDialogViewFile(event, this.state.dialog.messageFile)}
                                                disabled={this.state.dialog.messageFile === ''}>
                                            View File
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                                <Grid container item xs>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <Grid container item xs justify="flex-end">
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button type="submit" value="Approve" variant="contained" color="primary"
                                                onClick={this.handleDialogApprove}
                                                disabled={this.state.dialog.messageStatus !== 'Pending'}>
                                            Approve
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                                <Grid container item xs justify="flex-end">
                                    <MuiThemeProvider theme={buttonThemeRed}>
                                        <Button type="submit" value="Reject" variant="contained" color="primary"
                                                onClick={this.handleDialogReject}
                                                disabled={this.state.dialog.messageStatus !== 'Pending'}>
                                            Reject
                                        </Button>
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{ backgroundColor: this.state.snackbar.sbColor }}
                />
                <Dialog fullScreen open={this.state.openFileDialog} onClose={this.handleFileDialogClose}>
                    <div style={{ padding: 24 }}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <i className="material-icons" style={{ "cursor": "pointer" }}
                                   onClick={this.handleFileDialogClose}>close</i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify="center">
                            <Grid container item xs={12}>
                                <Paper style={{ "width": "100%" }}>
                                    <div style={{ "overflowX": "auto" }}>
                                        {
                                            this.state.mimeType.indexOf('image') > -1 ? showImageFile
                                                :
                                                this.state.mimeType.indexOf('application/pdf') > -1 ?
                                                    <Document
                                                        file={this.state.reconstructedFile[0]}
                                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                                        options={options}
                                                    >
                                                        {
                                                            Array.from(
                                                                new Array(numPages),
                                                                (el, index) => (
                                                                    <Page
                                                                        key={`page_${index + 1}`}
                                                                        pageNumber={index + 1}
                                                                    />
                                                                ),
                                                            )
                                                        }
                                                    </Document>
                                                    : ''
                                        }
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
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
        getEachMessageForUserID: (user) => dispatch(getEachMessageForUserID(user)),
        updateDocumentEntryByUniqueID: (url, body) => dispatch(updateDocumentEntryByUniqueID(url, body)),
        retrieveFileByKey: (url) => dispatch(retrieveFileByKey(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDashboardView);
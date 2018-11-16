import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';
import { getEachMessageForUserID } from '../../../redux/actions/UMA/user.message.array.action';
import { updateDocumentEntryByUniqueID } from '../../../redux/actions/document.review.entry.actions';
import { retrieveFileByKey } from '../../../redux/actions/FILE/file.action';
import { Document, Page } from 'react-pdf';

function TabContainer(props) {
    return (
        <Typography component='div'>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = theme => ({
    colorPrimary: {
        backgroundColor: '#000000',
        color: '#ffffff'
    },
    indicator: {
        backgroundColor: '#e32c1c'
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1
    }
});

let counter = 0;

const rows = [
    { id: 'messageSender', label: 'Sender' },
    { id: 'messageType', label: 'Message Type' },
    { id: 'messageFile', label: 'Attached File(s)' },
    { id: 'messageDescription', label: 'Message' },
    { id: 'messageDate', label: 'Date' }
];

const rowsSent = [
    { id: 'messageStatus', label: 'Status' },
    { id: 'messageRecipient', label: 'Recipient' },
    { id: 'messageType', label: 'Message Type' },
    { id: 'messageFile', label: 'Attached File(s)' },
    { id: 'messageDescription', label: 'Message' },
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
        return (
            <TableHead>
                <TableRow>
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

class TableHeaderSent extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {rowsSent.map(row => {
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

class DocumentDashboardView extends React.Component {

    componentDidMount() {
        if (!this.isCancelled && this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
            this.setState({
                showProgressLogo: false,
                data: this.createTableContent('pending'),
                approvedData: this.createTableContent('approved'),
                rejectedData: this.createTableContent('rejected'),
                sentData: this.createTableContent('sent')
            });
        } else if (!this.isCancelled && !this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
            this.setState({
                showProgressLogo: false,
                data: [],
                approvedData: [],
                rejectedData: [],
                sentData: []
            });
                }
        setInterval(() => {
            if (!this.isCancelled && this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                this.setState({
                    data: this.createTableContent('pending'),
                    approvedData: this.createTableContent('approved'),
                    rejectedData: this.createTableContent('rejected'),
                    sentData: this.createTableContent('sent')
                });
            } else if (!this.isCancelled && !this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                this.setState({
                    data: [],
                    approvedData: [],
                    rejectedData: [],
                    sentData: []
                });
            }
        }, 30000);
    };

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            showProgressLogo: true,
            value: this.props.tabValue,
            data: [],
            approvedData: [],
            rejectedData: [],
            sentData: [],
            page: 0,
            approvedPage: 0,
            rejectedPage: 0,
            sentPage: 0,
            rowsPerPage: 10,
            approvedRowsPerPage: 10,
            rejectedRowsPerPage: 10,
            sentRowsPerPage: 10,
            openDialog: false,
            showProgressLogoDialog: false,
            dialog: {
                messageStatus: '',
                messageType: '',
                messageDescription: '',
                messageFile: '',
                messageDate: '',
                messageID: '',
                messageSender: '',
                messageRecipient: ''
            },
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            },
            openFileDialog: false,
            mimeType: '',
            reconstructedFile: ['test'],
            numPages: null
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    createTableContent = (id) => {
        let userName = this.state.userName;
        let tableContent = [];
        let createData = (messageStatus, messageType, messageDescription, messageFile, messageDate, messageID, messageSender, messageRecipient) => {
            counter += 1;
            return {
                id: counter,
                messageStatus,
                messageType,
                messageDescription,
                messageFile,
                messageDate,
                messageID,
                messageSender,
                messageRecipient
            };
        };
        if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
            if (id === 'pending') {
                for (let i = 0; i < this.props.data.umaReducer.getEachMessageForUserIDSuccess.length; i++) {
                    let message = this.props.data.umaReducer.getEachMessageForUserIDSuccess[i];
                    if (message.header.status === 'Pending' && message.header.recipient === userName) {
                        tableContent.push(
                            createData(
                                message.header.status,
                                message.type,
                                message.text,
                                message.fileId,
                                message.date,
                                message.desc,
                                message.header.sender,
                                message.header.recipient
                            ));
                    }
                }
                return tableContent;
            } else if (id === 'approved') {
                for (let i = 0; i < this.props.data.umaReducer.getEachMessageForUserIDSuccess.length; i++) {
                    let message = this.props.data.umaReducer.getEachMessageForUserIDSuccess[i];
                    if (message.header.status === 'Approved' && message.header.recipient === userName) {
                        tableContent.push(
                            createData(
                                message.header.status,
                                message.type,
                                message.text,
                                message.fileId,
                                message.date,
                                message.desc,
                                message.header.sender,
                                message.header.recipient
                            ));
                    }
                }
                return tableContent;
            } else if (id === 'rejected') {
                for (let i = 0; i < this.props.data.umaReducer.getEachMessageForUserIDSuccess.length; i++) {
                    let message = this.props.data.umaReducer.getEachMessageForUserIDSuccess[i];
                    if (message.header.status === 'Rejected' && message.header.recipient === userName) {
                        tableContent.push(
                            createData(
                                message.header.status,
                                message.type,
                                message.text,
                                message.fileId,
                                message.date,
                                message.desc,
                                message.header.sender,
                                message.header.recipient
                            ));
                    }
                }
                return tableContent;
            } else if (id === 'sent') {
                for (let i = 0; i < this.props.data.umaReducer.getEachMessageForUserIDSuccess.length; i++) {
                    let message = this.props.data.umaReducer.getEachMessageForUserIDSuccess[i];
                    if (message.header.sender === userName) {
                        tableContent.push(
                            createData(
                                message.header.status,
                                message.type,
                                message.text,
                                message.fileId,
                                message.date,
                                message.desc,
                                message.header.sender,
                                message.header.recipient
                            ));
                    }
                }
                return tableContent;
            }
        }
    };

    handleClickMessages = (event, n) => {
        this.setState({
            openDialog: true,
            dialog: {
                messageStatus: n.messageStatus,
                messageType: n.messageType,
                messageDescription: n.messageDescription,
                messageFile: n.messageFile,
                messageDate: n.messageDate,
                messageID: n.messageID,
                messageSender: n.messageSender,
                messageRecipient: n.messageRecipient
            }
        });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeApprovedPage = (event, approvedPage) => {
        this.setState({ approvedPage });
    };

    handleChangeRejectedPage = (event, rejectedPage) => {
        this.setState({ rejectedPage });
    };

    handleChangeSentPage = (event, sentPage) => {
        this.setState({ sentPage });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleChangeApprovedRowsPerPage = event => {
        this.setState({ approvedRowsPerPage: event.target.value });
    };

    handleChangeRejectedRowsPerPage = event => {
        this.setState({ rejectedRowsPerPage: event.target.value });
    };

    handleChangeSentRowsPerPage = event => {
        this.setState({ sentRowsPerPage: event.target.value });
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false });
    };

    handleDialogApprove = (event) => {
        event.preventDefault();
        this.setState({ showProgressLogoDialog: true });
        let url = this.state.dialog.messageID;
        let body = {
            desc: url,
            fileId: this.state.dialog.messageFile,
            header: {
                status: 'Approved',
                sender: this.state.dialog.messageSender,
                recipient: this.state.dialog.messageRecipient
            },
            text: this.state.dialog.messageDescription,
            type: this.state.dialog.messageType,
            date: new Date().toISOString().substring(0, 10)
        };
        Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
            .then(() => {
                if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDSuccess) {
                    Promise.resolve(this.props.getEachMessageForUserID(this.state.userName))
                        .then(() => {
                            if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                                this.setState({
                                    data: this.createTableContent('pending'),
                                    approvedData: this.createTableContent('approved'),
                                    rejectedData: this.createTableContent('rejected'),
                                    sentData: this.createTableContent('sent')
                                });
                            } else {
                                this.setState({
                                    data: [],
                                    approvedData: [],
                                    rejectedData: [],
                                    sentData: []
                                })
                            }
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Document Approved Successfully!',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Success'
                                },
                                openDialog: false
                            })
                        });
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error approving document! Please try again.',
                            open: true,
                            sbColor: 'Module-Snackbar-Error'
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
            desc: url,
            fileId: this.state.dialog.messageFile,
            header: {
                status: 'Rejected',
                sender: this.state.dialog.messageSender,
                recipient: this.state.dialog.messageRecipient
            },
            text: this.state.dialog.messageDescription,
            type: this.state.dialog.messageType,
            date: new Date().toISOString().substring(0, 10)
        };
        Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
            .then(() => {
                if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDSuccess) {
                    Promise.resolve(this.props.getEachMessageForUserID(this.state.userName))
                        .then(() => {
                            if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                                this.setState({
                                    data: this.createTableContent('pending'),
                                    approvedData: this.createTableContent('approved'),
                                    rejectedData: this.createTableContent('rejected'),
                                    sentData: this.createTableContent('sent')
                                });
                            } else {
                                this.setState({
                                    data: [],
                                    approvedData: [],
                                    rejectedData: [],
                                    sentData: []
                                })
                            }
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Document Rejected Successfully!',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Success'
                                },
                                openDialog: false
                            })
                        });
                } else {
                    this.setState({
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Error rejecting document! Please try again.',
                            open: true,
                            sbColor: 'Module-Snackbar-Error'
                        },
                        openDialog: false
                    })
                }
            });
    };

    handleDialogArchiveMessage = (event) => {
        event.preventDefault();
        /*this.setState({ showProgressLogoDialog: true });


        let url = this.state.dialog.messageID;
        let body = {
            desc: '',
            fileId: this.state.dialog.messageFile,
            header: {
                status: 'Rejected',
                sender: this.state.dialog.messageSender,
                recipient: this.state.dialog.messageRecipient
            },
            text: this.state.dialog.messageDescription,
            type: this.state.dialog.messageType
        };
        Promise.resolve(this.props.updateDocumentEntryByUniqueID(url, body))
            .then(() => {
                if (this.props.data.dreReducer.updateDocumentEntryByUniqueIDSuccess) {
                    Promise.resolve(this.props.getEachMessageForUserID(this.state.userName))
                        .then(() => {
                            if (this.props.data.umaReducer.getEachMessageForUserIDSuccess) {
                                this.setState({
                                    data: this.createTableContent('pending'),
                                    approvedData: this.createTableContent('approved'),
                                    rejectedData: this.createTableContent('rejected')
                                })
                            } else {
                                this.setState({
                                    data: [],
                                    approvedData: [],
                                    rejectedData: []
                                })
                            }
                            this.setState({
                                showProgressLogoDialog: false,
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Document Rejected Successfully!',
                                    open: true,
                                    sbColor: 'Module-Snackbar-Success'
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
                            sbColor: 'Module-Snackbar-Error'
                        },
                        openDialog: false
                    })
                }
            });*/
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            },
        });
    };

    decodeFile = (encodedFile, contentType) => {
        this.setState({
            mimeType: contentType,
            reconstructedFile: [encodedFile]
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
                    sbColor: 'Module-Snackbar-Success'
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
                    sbColor: 'Module-Snackbar-Error'
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

        const { classes } = this.props;

        const {
            value, data, approvedData, rejectedData, sentData, rowsPerPage, approvedRowsPerPage, rejectedRowsPerPage,
            sentRowsPerPage, page, approvedPage, rejectedPage, sentPage, numPages
        } = this.state;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const approvedEmptyRows = approvedRowsPerPage - Math.min(approvedRowsPerPage, approvedData.length - approvedPage * approvedRowsPerPage);
        const rejectedEmptyRows = rejectedRowsPerPage - Math.min(rejectedRowsPerPage, rejectedData.length - rejectedPage * rejectedRowsPerPage);
        const sentEmptyRows = sentRowsPerPage - Math.min(sentRowsPerPage, sentData.length - sentPage * sentRowsPerPage);

        const dialogRows = [
            createDialogData('Sender', this.state.dialog.messageSender),
            createDialogData('Message Type', this.state.dialog.messageType),
            createDialogData('Attached File(s)', this.state.dialog.messageFile),
            createDialogData('Message', this.state.dialog.messageDescription),
            createDialogData('Date', this.state.dialog.messageDate)
        ];

        const dialogRowsSent = [
            createDialogData('Status', this.state.dialog.messageStatus),
            createDialogData('Recipient', this.state.dialog.messageRecipient),
            createDialogData('Message Type', this.state.dialog.messageType),
            createDialogData('Attached File(s)', this.state.dialog.messageFile),
            createDialogData('Message', this.state.dialog.messageDescription),
            createDialogData('Date', this.state.dialog.messageDate)
        ];

        const showImageFile = handleDialogData(
            <img alt='' height='auto' src={this.state.reconstructedFile[0]} width='100%' />);

        return (

            <div>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'>
                            <img alt='' className='App-logo-progress' src={blocnetsLogo} />
                        </div>
                        :
                        ''}
                </div>
                <div className={classes.root}>
                    <AppBar className={classes.colorPrimary} position='static'>
                        <Tabs classes={{ indicator: classes.indicator }} onChange={this.handleChange} value={value}>
                            <Tab label='Pending' />
                            <Tab label='Approved' />
                            <Tab label='Rejected' />
                            <Tab label='Sent' />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>
                        <div className='Module-Inbox'>
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper className='Module-Paper-Inbox'>
                                        <div className='Module-Paper-Div'>
                                            <Table>
                                                <TableHeader />
                                                <TableBody>
                                                    {data
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(n => {
                                                            return (
                                                                <TableRow hover key={n.id}>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}
                                                                    >
                                                                        {n.messageSender}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageType}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageFile}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDescription}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDate}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 49 * emptyRows }}>
                                                            <TableCell
                                                                colSpan={5}
                                                            />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                            <TablePagination
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                component='div'
                                                count={data.length}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                page={page}
                                                rowsPerPage={rowsPerPage}
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <div className='Module-Inbox'>
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper className='Module-Paper'>
                                        <div className='Module-Paper-Div'>
                                            <Table>
                                                <TableHeader />
                                                <TableBody>
                                                    {approvedData
                                                        .slice(approvedPage * approvedRowsPerPage, approvedPage * approvedRowsPerPage + approvedRowsPerPage)
                                                        .map(n => {
                                                            return (
                                                                <TableRow hover key={n.id}>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}
                                                                    >
                                                                        {n.messageSender}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageType}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageFile}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDescription}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDate}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {approvedEmptyRows > 0 && (
                                                        <TableRow style={{ height: 49 * approvedEmptyRows }}>
                                                            <TableCell
                                                                colSpan={5}
                                                            />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                            <TablePagination
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                component='div'
                                                count={approvedData.length}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onChangePage={this.handleChangeApprovedPage}
                                                onChangeRowsPerPage={this.handleChangeApprovedRowsPerPage}
                                                page={approvedPage}
                                                rowsPerPage={approvedRowsPerPage}
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </TabContainer>}
                    {value === 2 && <TabContainer>
                        <div className='Module-Inbox'>
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper className='Module-Paper'>
                                        <div className='Module-Paper-Div'>
                                            <Table>
                                                <TableHeader />
                                                <TableBody>
                                                    {rejectedData
                                                        .slice(rejectedPage * rejectedRowsPerPage, rejectedPage * rejectedRowsPerPage + rejectedRowsPerPage)
                                                        .map(n => {
                                                            return (
                                                                <TableRow hover key={n.id}>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}
                                                                    >
                                                                        {n.messageSender}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageType}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageFile}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDescription}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDate}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {rejectedEmptyRows > 0 && (
                                                        <TableRow style={{ height: 49 * rejectedEmptyRows }}>
                                                            <TableCell
                                                                colSpan={5}
                                                            />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                            <TablePagination
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                component='div'
                                                count={rejectedData.length}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onChangePage={this.handleChangeRejectedPage}
                                                onChangeRowsPerPage={this.handleChangeRejectedRowsPerPage}
                                                page={rejectedPage}
                                                rowsPerPage={rejectedRowsPerPage}
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </TabContainer>}
                    {value === 3 && <TabContainer>
                        <div className='Module-Inbox'>
                            <Grid container justify='center'>
                                <Grid container item xs={12}>
                                    <Paper className='Module-Paper'>
                                        <div className='Module-Paper-Div'>
                                            <Table>
                                                <TableHeaderSent />
                                                <TableBody>
                                                    {sentData
                                                        .slice(sentPage * sentRowsPerPage, sentPage * sentRowsPerPage + sentRowsPerPage)
                                                        .map(n => {
                                                            return (
                                                                <TableRow hover key={n.id}>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}
                                                                    >
                                                                        {n.messageStatus}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}
                                                                    >
                                                                        {n.messageRecipient}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageType}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageFile}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDescription}
                                                                    </TableCell>
                                                                    <TableCell className='Module-TableCell-Click'
                                                                               onClick={event => this.handleClickMessages(event, n)}>
                                                                        {n.messageDate}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {sentEmptyRows > 0 && (
                                                        <TableRow style={{ height: 49 * sentEmptyRows }}>
                                                            <TableCell
                                                                colSpan={6}
                                                            />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                            <TablePagination
                                                backIconButtonProps={{
                                                    'aria-label': 'Previous Page',
                                                }}
                                                component='div'
                                                count={sentData.length}
                                                nextIconButtonProps={{
                                                    'aria-label': 'Next Page',
                                                }}
                                                onChangePage={this.handleChangeSentPage}
                                                onChangeRowsPerPage={this.handleChangeSentRowsPerPage}
                                                page={sentPage}
                                                rowsPerPage={sentRowsPerPage}
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </TabContainer>}
                </div>
                <Dialog onClose={this.handleDialogClose} open={this.state.openDialog}>
                    <div className='Module'>
                        <Grid container>
                            <Grid container item xs justify='flex-end'>
                                <i className='material-icons Module-TableCell-Click'
                                   onClick={this.handleDialogClose}>
                                    close
                                </i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify='center'>
                            <Grid container item xs={12}>
                                <Paper className='Module-Paper'>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className='overlay'>
                                                <img alt='' className='App-logo-progress' src={blocnetsLogo} />
                                            </div>
                                            :
                                            ''}
                                    </div>
                                    {value !== 3 ?
                                        <div className='Module-Paper-Div'>
                                            <Table className='Module-Table'>
                                                <TableBody className='Module-TableBody'>
                                                    {dialogRows.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                <TableCell>
                                                                    {row.info1}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.info2}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        :
                                        <div className='Module-Paper-Div'>
                                            <Table className='Module-Table'>
                                                <TableBody className='Module-TableBody'>
                                                    {dialogRowsSent.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                <TableCell>
                                                                    {row.info1}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {row.info2}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>}
                                </Paper>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={24}>
                            <Grid container item xs={12} sm={6}>
                                <Grid container item xs justify='flex-start'>
                                    <Button className='Module-Button' disabled={this.state.dialog.messageFile === ''}
                                            onClick={event => this.handleDialogViewFile(event, this.state.dialog.messageFile)}
                                            type='submit' value='ViewFile' variant='contained'>
                                        View File
                                    </Button>
                                </Grid>
                                <Grid container item xs>
                                </Grid>
                            </Grid>
                            {value !== 3 ?
                                <Grid container item xs={12} sm={6}>
                                    <Grid container item xs justify='flex-end'>
                                        <Button className='Module-Button'
                                                disabled={this.state.dialog.messageStatus !== 'Pending'}
                                                onClick={this.handleDialogApprove}
                                                type='submit' value='Approve' variant='contained'>
                                            Approve
                                        </Button>
                                    </Grid>
                                    <Grid container item xs justify='flex-end'>
                                        <Button className='Module-Button'
                                                disabled={this.state.dialog.messageStatus !== 'Pending'}
                                                onClick={this.handleDialogReject}
                                                type='submit' value='Reject' variant='contained'>
                                            Reject
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container item xs={12} sm={6}>
                                    <Grid container item xs justify='flex-end'>
                                        <Button className='Module-Button'
                                                onClick={this.handleDialogArchiveMessage}
                                                type='submit' value='ArchiveMessage' variant='contained'>
                                            Archive Message
                                        </Button>
                                    </Grid>
                                </Grid>}
                        </Grid>
                    </div>
                </Dialog>
                <Snackbar autoHideDuration={this.state.snackbar.autoHideDuration} onClose={this.handleSnackbarClose}
                          open={this.state.snackbar.open}>
                    <SnackbarContent
                        classes={{ message: 'Module-Snackbar-Message' }}
                        className={this.state.snackbar.sbColor}
                        message={this.state.snackbar.message}
                    />
                </Snackbar>
                <Dialog fullWidth={true} maxWidth='lg' onClose={this.handleFileDialogClose}
                        open={this.state.openFileDialog}>
                    <div className='Module'>
                        <Grid container>
                            <Grid container item xs justify='flex-end'>
                                <i className='material-icons Module-TableCell-Click'
                                   onClick={this.handleFileDialogClose}>
                                    close
                                </i>
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container justify='center'>
                            <Grid container item xs={12}>
                                <Paper className='Module-Paper'>
                                    <div className='Module-Paper-Div'>
                                        {this.state.mimeType.indexOf('image') > -1 ?
                                            showImageFile
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
                                                :
                                                ''}
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

DocumentDashboardView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DocumentDashboardView));
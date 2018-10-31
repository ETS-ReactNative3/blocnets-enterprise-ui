import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';     // Docs: https://www.npmjs.com/package/react-pdf
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { retrieveFileByKey } from '../../../redux/actions/FILE/file.action';
import { getUserMessageDataByUserID } from '../../../redux/actions/UMA/user.message.array.action';

let counter = 0;

const rows = [
    { id: 'fileName', label: 'Name' },
    { id: 'fileSize', label: 'Size(Bytes)' },
    { id: 'fileType', label: 'File Type' },
    { id: 'lastModifiedDate', label: 'Last Modified Date' },
    { id: 'lastModifed', label: 'Last Modified' }
];

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

function handleDialogData(file) {
    return file;
}

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

TableHeader.propTypes = {
    rowCount: PropTypes.number.isRequired,
};

class ReadDocumentView extends React.Component {

    componentDidMount() {
        !this.isCancelled && Promise.resolve(this.props.getUserMessageDataByUserID(this.state.userName))
            .then(() => {
                if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess) {
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

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            data: [],
            page: 0,
            rowsPerPage: 10,
            userName: this.props.userName,
            openDialog: false,
            reconstructedFile: ["test"],
            mimeType: '',
            numPages: null,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    createTableContent = () => {
        let tableContent = [];
        let createData = (fileName, fileType, fileSize, lastModifiedDate, lastModified) => {
            counter += 1;
            return {
                id: counter,
                fileName,
                fileType,
                fileSize,
                lastModifiedDate,
                lastModified
            };
        };
        if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess) {
            if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles &&
                this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles.length > 0) {
                for (let i = 0; i < this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles.length; i++) {
                    if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles[i] !== 'string') {
                        let tmp = JSON.parse(this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles[i]);
                        tableContent.push(
                            createData(
                                tmp.data.name,
                                tmp.data.size,
                                tmp.data.type,
                                tmp.data.lastModifiedDate,
                                tmp.data.lastModified,
                            ));
                    }
                }
            }
        }
        return tableContent;
    };

    decodeFile = (encodedFile, contentType) => {
        console.log(encodedFile);
        //let file = atob(encodedFile);          // Base64 Decode and store binary
        let file = encodedFile
        this.setState({
            reconstructedFile: [file],
            mimeType: contentType
        });
    };

    handleDREValidation = () => {
        if (this.props.data.fileReducer.retrieveFileByKeySuccess) {
            this.setState({
                openDialog: true,
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Document Retrieved Successfully!',
                    open: true,
                    sbColor: '#23CE6B'
                }
            })
            this.decodeFile(this.props.data.fileReducer.retrieveFileByKeySuccess.file, this.props.data.fileReducer.retrieveFileByKeySuccess.contentType);
        } else {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error retrieving document! Please try again.',
                    open: true,
                    sbColor: 'red'
                }
            })
        }
    };


    handleClickedFile = (event, fileName) => {
        this.setState({ showProgressLogo: true })
        Promise.resolve(this.props.retrieveFileByKey(fileName))
            .then(() => {
                this.handleDREValidation();
            })
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false });
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handlePrint = (file) => {
        let str = file[0].split(',')[1];
        let tmp = atob(str);
        window.open(tmp);
    };

    render() {
        const { data, rowsPerPage, page, numPages } = this.state;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const showImageFile = handleDialogData(<img src={this.state.reconstructedFile[0]} width='100%' height='auto' alt='' />);

        return (
            <form>
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
                                            rowCount={data.length}
                                        />
                                        <TableBody style={{ "overflowWrap": "break-word" }}>
                                            {data
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map(n => {
                                                    return (
                                                        <TableRow hover
                                                            tabIndex={-1} key={n.id}>
                                                            <TableCell
                                                                onClick={event => this.handleClickedFile(event, n.fileName)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.fileName}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickedFile(event, n.fileName)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.fileType}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickedFile(event, n.fileName)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.fileSize}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickedFile(event, n.fileName)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.lastModifiedDate}
                                                            </TableCell>
                                                            <TableCell
                                                                onClick={event => this.handleClickedFile(event, n.fileName)}
                                                                style={{ "cursor": "pointer" }}>
                                                                {n.lastModified}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: 49 * emptyRows }}>
                                                    <TableCell colSpan={6} />
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
                </div>
                <Dialog fullScreen open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{ padding: 24 }}>
                        {/* <Button onClick={event => this.handlePrint(this.state.reconstructedFile)}>Print</Button> */}
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
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{ backgroundColor: this.state.snackbar.sbColor }}
                />
            </form>
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
        getUserMessageDataByUserID: (url) => dispatch(getUserMessageDataByUserID(url)),
        retrieveFileByKey: (url) => dispatch(retrieveFileByKey(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadDocumentView);
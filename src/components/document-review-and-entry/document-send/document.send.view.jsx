import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormLabel from '@material-ui/core/FormLabel/FormLabel';
import Select from '@material-ui/core/Select/Select';
import Input from '@material-ui/core/Input/Input';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import CheckIcon from '@material-ui/icons/Check';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { createDocumentEntryByUniqueID } from '../../../redux/actions/document.review.entry.actions';
import {
    getUserMessageDataByUserID,
    updateUserMessageDataByUserID
} from '../../../redux/actions/UMA/user.message.array.action';
import { uploadFileByUserId } from '../../../redux/actions/FILE/file.action';
//Temporary Only
import response from './messageData.json';

let userIDMenuItems = response[0].userID;
let messageTypeMenuItems = response[0].messageType;
let dataTypeMenuItems = response[0].dataType;

class SendDocumentView extends React.Component {

    componentDidMount() {
        if (!this.isCancelled && this.props.data.umaReducer.getUserMessageDataByUserIDSuccess
            && this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles
            && this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles.length > 0) {
            let files = ['None'];
            for (let i = 0; i < this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles.length; i++) {
                if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles[i] !== 'string') {
                    let tmp = JSON.parse(this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles[i]);
                    files.push(tmp.data.name)
                }
            }
            Promise.resolve(
                this.setState({
                    fileMenuItems: files
                })
            )
        }
    };

    componentWillUnmount() {
        this.isCancelled = true;
    };
    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            fileMenuItems: [],
            fileFromSavedDocsKey: '',
            fileFromMyComputerKey: '',
            file: '',
            fileMetaData: {},
            userName: this.props.userName,
            recipientUserName: '',
            errorTextRecipientUserName: 'This is a required field.',
            messageType: '',
            errorTextMessageType: 'This is a required field.',
            dataType: '',
            errorTextDataType: 'This is a required field.',
            message: '',
            errorTextMessage: 'This is a required field.',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleFileMetaData = (event) => {
        Promise.resolve(this.setState({
            fileMetaData: {
                lastModified: event.lastModified,
                lastModifiedDate: event.lastModifiedDate,
                name: event.name,
                size: event.size,
                type: event.type
            },
        }))
    }

    handleBase64File = (fileName, event) => {
        Promise.resolve(this.setState({
            fileFromSavedDocsKey: '',
            fileFromMyComputerKey: fileName,
            file: event
        }))
    }

    handleUploadError = (event) => {
        switch (event.target.error.code) {
            case event.target.error.NOT_FOUND_ERR:
                alert('File Not Found!');
                break;
            case event.target.error.NOT_READABLE_ERR:
                alert('File is unreadable!');
                break;
            case event.target.error.ABORT_ERR:
                break;
            default:
                alert('Error occurred while reading file!');
        }
        ;
    }

    handleProgressBar = (event) => {
        if (event.lengthComputable) {
            var percentLoaded = Math.round((event.loaded / event.total) * 100);
            if (percentLoaded < 100) {
                console.log(percentLoaded + '%');
                //progress.style.width = percentLoaded + '%';
                //progress.textContent = percentLoaded + '%';
            }
        }
    }

    handleFileChange = (event) => {
        //progress.style.width = '0%';
        //progress.textContent = '0%';
        let files = event.target.files;
        var file = files[0];
        let base64Result = (string) => {
            this.handleBase64File(file.name, string);
        };
        var reader = new FileReader();
        reader.onerror = this.handleUploadError;
        reader.onprogress = this.handleProgressBar;
        reader.onabort = function (e) {
            alert('File read cancelled!');
        };
        reader.onloadstart = function (e) {
            // TODO: Write a mechanism that begins 'loading' - icon/progress bar
        };
        reader.onload = function () {
            // Binary String
            //var binaryString = reader.result;
            //var wrapBinaryInBase64 = btoa(binaryString);
            //base64Result(wrapBinaryInBase64);

            // Base 64 string
            //var fileString = reader.result.split(',')[1]; // Remove Base 64 header - not needed for decoding later
            //base64Result(fileString);
            base64Result(reader.result);
        };
        if (file && file.size < 30000000) {
            reader.readAsDataURL(file);
            //reader.readAsBinaryString(file); // Binary => base64(Binary)
            this.handleFileMetaData(file);
        } else if (file && file.size > 30000000) {
            Promise.resolve(this.setState({ fileFromMyComputerKey: '' }))
            alert("File is too large. Reduce file size to less than 30mb!");
        } else {
            Promise.resolve(this.setState({ fileFromMyComputerKey: '' }))
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'recipientUserName' && event.target.value) {
            this.setState({ errorTextRecipientUserName: '' });
        } else if ([event.target.name].toString() === 'recipientUserName' && !event.target.value) {
            this.setState({ errorTextRecipientUserName: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'messageType' && event.target.value) {
            this.setState({ errorTextMessageType: '' });
        } else if ([event.target.name].toString() === 'messageType' && !event.target.value) {
            this.setState({ errorTextMessageType: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'fileFromSavedDocsKey' && event.target.value === 'None') {
            this.setState({ fileFromSavedDocsKey: '' });
        } else if ([event.target.name].toString() === 'fileFromSavedDocsKey' && event.target.value !== 'None') {
            this.setState({ fileFromSavedDocsKey: event.target.value, fileFromMyComputerKey: '' })
            //this.handleIconToggle()
        }
        if ([event.target.name].toString() === 'dataType' && event.target.value) {
            this.setState({ errorTextDataType: '' });
        } else if ([event.target.name].toString() === 'dataType' && !event.target.value) {
            this.setState({ errorTextDataType: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'message' && event.target.value) {
            this.setState({ errorTextMessage: '' });
        } else if ([event.target.name].toString() === 'message' && !event.target.value) {
            this.setState({ errorTextMessage: 'This is a required field.' });
        }
    };

    generateUniqueID = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    guid = () => {
        return this.generateUniqueID() + this.generateUniqueID() + '-' + this.generateUniqueID() + '-'
            + this.generateUniqueID() + '-' + this.generateUniqueID() + '-' + this.generateUniqueID()
            + this.generateUniqueID() + this.generateUniqueID();
    };

    handleDREValidation = () => {
        if (this.props.data.dreReducer.createDocumentEntryByUniqueIDSuccess === true
            && this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess === true) {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Document Sent Successfully!',
                    open: true,
                    sbColor: '#23CE6B'
                },
                recipientUserName: '',
                messageType: '',
                dataType: '',
                message: '',
                fileFromSavedDocsKey: '',
                fileFromMyComputerKey: ''
            });
        } else {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error sending document! Please try again.',
                    open: true,
                    sbColor: 'red'
                }
            })
        }
    }

    handleFileValidation = () => {
        if (this.props.data.fileReducer.uploadFileByUserIdError
            && this.props.data.fileReducer.uploadFileByUserIdError.status === 409) {
            this.setState({
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'File already exists! Please choose a different file name.',
                    open: true,
                    sbColor: 'red'
                }
            })
        } else if (this.props.data.fileReducer.uploadFileByUserIdError
            && this.props.data.fileReducer.uploadFileByUserIdError.status !== 409) {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error uploading document! Please try again.',
                    open: true,
                    sbColor: 'red'
                }
            });
        } else if (this.props.data.fileReducer.uploadFileByUserIdSuccess === true) {
            this.setState({
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Document Attached and Uploaded Successfully!',
                    open: true,
                    sbColor: '#23CE6B'
                }
            })
        }
    }

    handleFileKeyAttached = () => {
        if (this.state.fileFromSavedDocsKey !== '') {
            Promise.resolve(this.setState({ selectedFileKey: this.state.fileFromSavedDocsKey }))
        } else if (this.state.fileFromMyComputerKey !== '') {
            let fileBody = {
                file: this.state.file,
                fileName: this.state.fileFromMyComputerKey,
                creatorID: this.state.userName,
                contentType: this.state.fileMetaData.type,
                contentDisposition: '',
                contentLength: this.state.fileMetaData.size
            };
            Promise.resolve(this.props.uploadFileByUserId(fileBody.fileName, fileBody))
                .then(() => {
                    Promise.resolve(this.handleFileValidation())
                })
        }
    };

    handleSendDocumentForReview = (event) => {
        this.props.data.dreReducer.createDocumentEntryByUniqueIDSuccess = '';
        this.props.data.umaReducer.getUserMessageDataByUserIDError = '';    // Clean-up: unused Validation
        this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
        this.setState({ showProgressLogo: true });
        let tmp = {
            opt1: this.state.fileFromSavedDocsKey,
            opt2: this.state.fileFromMyComputerKey
        }
        let attachfileKey = tmp.opt1 !== '' ? tmp.opt1 : tmp.opt2 !== '' ? tmp.opt2 : '';
        let dreURL = this.guid();
        let dreBody = {
            text: this.state.message,
            status: 'Pending',
            type: this.state.messageType,
            desc: this.state.dataType,
            fileId: attachfileKey
        };
        let oldMessages = [];
        let allMessages = [];
        let umaURL = this.state.recipientUserName;
        let umaBody = {
            userfiles: ["string"],
            userMessages: ["string"],
            archivedMessages: ["string"]
        };
        Promise.resolve(this.handleFileKeyAttached()).then(() => {
            if ((tmp.opt1 === '' && tmp.opt2 === '' && attachfileKey === '')
                || (tmp.opt1 !== '' && tmp.opt2 === '' && attachfileKey !== '')
                || (tmp.opt1 === '' && tmp.opt2 !== '' && attachfileKey !== '')) {
                Promise.resolve(this.props.createDocumentEntryByUniqueID(dreURL, dreBody))
                    .then(() => {
                        Promise.resolve(this.props.getUserMessageDataByUserID(umaURL))
                            .then(() => {
                                if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess) {
                                    oldMessages = this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages;
                                    allMessages = [dreURL];
                                    for (let i = 0; i < oldMessages.length; i++) {
                                        allMessages.push(oldMessages[i]);
                                    }
                                    umaBody = {
                                        userfiles: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles,
                                        userMessages: allMessages,
                                        archivedMessages: ["string"]        // Change later to be dynamic
                                    };
                                    Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                        .then(() => {
                                            this.handleDREValidation();
                                        })
                                } else {
                                    umaBody = {
                                        userfiles: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles,
                                        userMessages: [dreURL],
                                        archivedMessages: ["string"]
                                    };
                                    Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                        .then(() => {
                                            this.handleDREValidation();
                                        })
                                }
                            })
                    })
            } else {
                this.setState({
                    showProgressLogo: false
                })
            }
        })
        event.preventDefault();
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

    render() {
        const { fileMenuItems, fileFromMyComputerKey } = this.state;

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const formComplete = this.state.recipientUserName && this.state.messageType
            && this.state.dataType && this.state.message;

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Recipient User Name</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Message Type</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Attach File from Saved Documents</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <Select value={this.state.recipientUserName} onChange={this.handleChange}
                                    input={<Input name="recipientUserName" style={{ "textAlign": "left" }} />}
                                    displayEmpty>
                                    {userIDMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText
                                    style={{ "color": "red" }}>{this.state.errorTextRecipientUserName}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <Select value={this.state.messageType} onChange={this.handleChange}
                                    input={<Input name="messageType" style={{ "textAlign": "left" }} />}
                                    displayEmpty>
                                    {messageTypeMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText
                                    style={{ "color": "red" }}>{this.state.errorTextMessageType}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <Select value={this.state.fileFromSavedDocsKey} onChange={this.handleChange}
                                    input={<Input name="fileFromSavedDocsKey" style={{ "textAlign": "left" }} />}
                                    displayEmpty>
                                    {fileMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3} justify="flex-end">
                            <Grid>
                                <input
                                    accept=".png,.jpg,.jpeg,.gif,.pdf"
                                    id="flat-button-file"
                                    //multiple
                                    type="file"
                                    className='Module-Button-Input'
                                    onChange={this.handleFileChange}
                                />
                                <label htmlFor="flat-button-file">
                                    <MuiThemeProvider theme={buttonThemeYellow}>
                                        <Button
                                            type='submit'
                                            value='Upload'
                                            variant='contained'
                                            component="span"
                                            color="primary">
                                            Attach File from My Computer
                                            {fileFromMyComputerKey !== '' ? <CheckIcon style={{ 'marginLeft': 'theme.spacing.unit' }} /> : <span></span>}
                                        </Button>
                                    </MuiThemeProvider>
                                </label>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6}>
                            <FormLabel style={{ "textAlign": "left" }}>Data Type</FormLabel>
                            <FormControl fullWidth={true}>
                                <Select value={this.state.dataType} onChange={this.handleChange}
                                    input={<Input name="dataType" style={{ "textAlign": "left" }} />}
                                    displayEmpty>
                                    {dataTypeMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText style={{ "color": "red" }}>{this.state.errorTextDataType}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{ "textAlign": "left" }}>Message</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                value={this.state.message}
                                onChange={this.handleChange}
                                type="text"
                                name="message"
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                                multiLine={true}
                                rows={2}
                                rowsMax={4}
                                fullWidth={true}
                                errorText={this.state.errorTextMessage}
                                errorStyle={{ "float": "left", "textAlign": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                    fullWidth={true} disabled={!formComplete}
                                    onClick={this.handleSendDocumentForReview}>
                                    Send Document for Review
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
        createDocumentEntryByUniqueID: (url, body) => dispatch(createDocumentEntryByUniqueID(url, body)),
        getUserMessageDataByUserID: (url) => dispatch(getUserMessageDataByUserID(url)),
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body)),
        uploadFileByUserId: (url, body) => dispatch(uploadFileByUserId(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendDocumentView);
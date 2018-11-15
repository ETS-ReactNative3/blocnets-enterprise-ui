import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import TextField from 'material-ui/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';
import { uploadFileByUserId } from '../../../redux/actions/FILE/file.action';
import {
    getUserMessageDataByUserID,
    updateUserMessageDataByUserID
} from '../../../redux/actions/UMA/user.message.array.action';

class SaveDocumentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            showProgressLogo: false,
            fileName: '',
            data: {},
            base64File: '',
            fileMetaData: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            }
        };
    };

    handleBase64File = (event) => {
        Promise.resolve(this.setState({ base64File: event }));
    };

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
    };

    handleProgressBar = (event) => {
        if (event.lengthComputable) {
            var percentLoaded = Math.round((event.loaded / event.total) * 100);
            if (percentLoaded < 100) {
                //progress.style.width = percentLoaded + '%';
                //progress.textContent = percentLoaded + '%';
            }
        }
    };

    handleFileMetaData = (event) => {
        let data = {
            lastModified: event.lastModified,
            lastModifiedDate: event.lastModifiedDate,
            name: event.name,
            size: event.size,
            type: event.type
        };
        Promise.resolve(this.setState({
            fileName: event.name,
            data: {
                lastModified: event.lastModified,
                lastModifiedDate: event.lastModifiedDate,
                name: event.name,
                size: event.size,
                type: event.type
            },
            fileMetaData: JSON.stringify({ data })
        }));
    };

    handleFileChange = (event) => {
        //progress.style.width = '0%';
        //progress.textContent = '0%';
        let files = event.target.files;
        var file = files[0];
        let base64Result = (string) => {
            this.handleBase64File(string);
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
            //Binary String
            //var binaryString = reader.result;
            //var wrapBinaryInBase64 = btoa(binaryString);
            //base64Result(wrapBinaryInBase64);
            // Base64 String
            //var fileString = reader.result.split(',')[1]; // Remove Base 64 header - not needed for decoding later
            //base64Result(fileString);
            base64Result(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
            //reader.readAsBinaryString(file); // Binary => base64(Binary)
            this.handleFileMetaData(file);
        }
    };

    handleDREValidation = () => {
        if (this.props.data.fileReducer.uploadFileByUserIdSuccess === true) {
            this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
            this.props.data.umaReducer.getUserMessageDataByUserIDSuccess = '';
            this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Document Saved Successfully!',
                    open: true,
                    sbColor: 'Module-Snackbar-Success'
                },
                fileName: '',
                data: {},
                base64File: '',
                fileMetaData: ''
            });
        } else {
            this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
            this.props.data.umaReducer.getUserMessageDataByUserIDSuccess = '';
            this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Error saving document! Please try again.',
                    open: true,
                    sbColor: 'Module-Snackbar-Error'
                }
            });
        }
    };

    handleFileUpload = (event) => {
        this.props.data.fileReducer.uploadFileByUserIdSuccess = '';
        this.props.data.umaReducer.getUserMessageDataByUserIDSuccess = '';
        this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
        this.props.data.fileReducer.uploadFileByUserIdError = '';
        this.setState({ showProgressLogo: true });
        let fileURL = this.state.fileName;
        let fileBody = {
            file: this.state.base64File,
            fileName: this.state.fileName,
            creatorID: this.state.userName,
            contentType: this.state.data.type,
            contentDisposition: '',
            contentLength: this.state.data.size
        }
        let oldFiles = [];
        let allFiles = [];
        let umaURL = this.state.userName;
        let umaBody = {
            userFiles: ['string'],
            userMessages: ['string'],
            archivedMessages: ['string']
        };
        let newUserFile = this.state.fileMetaData;
        Promise.resolve(this.props.uploadFileByUserId(fileURL, fileBody))
            .then(() => {
                if (this.props.data.fileReducer.uploadFileByUserIdSuccess) {
                    Promise.resolve(this.props.getUserMessageDataByUserID(umaURL))
                        .then(() => {
                            if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess) {
                                if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles) {
                                    oldFiles = this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles;
                                    allFiles = [newUserFile];
                                    for (let i = 0; i < oldFiles.length; i++) {
                                        allFiles.push(oldFiles[i]);
                                    }
                                } else {
                                    allFiles = [newUserFile];
                                }
                                umaBody = {
                                    userFiles: allFiles,
                                    userMessages: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages,
                                    archivedMessages: [this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.archivedMessages] // Change later to be dynamic
                                };
                                Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                    .then(() => {
                                        this.handleDREValidation();
                                    })
                            }
                        })
                } else {
                    if (this.props.data.fileReducer.uploadFileByUserIdError.status === 409) {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'File already exists! Please choose a different file name.',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            },
                            fileName: '',
                            data: {},
                            base64File: '',
                            fileMetaData: ''
                        });
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Error saving document! Please try again.',
                                open: true,
                                sbColor: 'Module-Snackbar-Error'
                            }
                        });
                    }
                }
            })
            .catch((error) => {
                this.setState({
                    showProgressLogo: false,
                    snackbar: {
                        autoHideDuration: 2000,
                        message: 'Error saving document! Please try again.',
                        open: true,
                        sbColor: 'Module-Snackbar-Error'
                    }
                });
            });
        event.preventDefault();
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            }
        });
    };

    render() {

        const formComplete = this.state.fileMetaData && this.state.fileName
            && this.state.base64File;

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'>
                            <img src={blocnetsLogo} className='App-logo-progress' alt='' />
                        </div>
                        :
                        ''}
                </div>
                <div className='Module'>
                    <Grid container spacing={24}>
                        <Grid container item xs>
                            <input
                                accept='.png,.jpg,.jpeg,.gif,.pdf'
                                className='Module-Button-Input'
                                id='flat-button-file'
                                onChange={this.handleFileChange}
                                type='file'
                            />
                            <label htmlFor='flat-button-file'>
                                <Button type='submit' value='Upload' variant='contained' component='span'
                                        className='Module-Button-Save'>
                                    Attach File from My Computer
                                    {this.state.fileName !== '' ?
                                        <CheckIcon />
                                        :
                                        <span></span>}
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs>
                            <TextField
                                className='Module-TextField'
                                disabled={true}
                                floatingLabelFixed={true}
                                floatingLabelText='File Name'
                                fullWidth={true}
                                hintText=''
                                name='fileName'
                                type='text'
                                value={this.state.fileName}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button className='Module-Button' disabled={!formComplete} fullWidth={true}
                                    onClick={this.handleFileUpload} type='submit' value='Submit' variant='contained'>
                                Save and Upload
                                <CloudUploadIcon className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar autoHideDuration={this.state.snackbar.autoHideDuration}
                          onClose={this.handleSnackbarClose} open={this.state.snackbar.open}>
                    <SnackbarContent
                        classes={{ message: 'Module-Snackbar-Message' }}
                        className={this.state.snackbar.sbColor}
                        message={this.state.snackbar.message}
                    />
                </Snackbar>
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
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body)),
        uploadFileByUserId: (url, body) => dispatch(uploadFileByUserId(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDocumentView);
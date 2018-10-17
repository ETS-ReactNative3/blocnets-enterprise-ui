import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import yellow from '@material-ui/core/colors/yellow';
import Button from '@material-ui/core/Button';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { uploadFileByUserId } from '../../../redux/actions/FILE/file.action';
import { getUserMessageDataByUserID, updateUserMessageDataByUserID } from '../../../redux/actions/UMA/user.message.array.action';

class SaveDocumentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            data: {},
            base64File: '',
            fileName: '',
            fileMetaData: '',
            userName: this.props.userName,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleFileMetaData = (event) => {
        let data = {
            lastModified: event.lastModified,
            lastModifiedDate: event.lastModifiedDate,
            name: event.name,
            size: event.size,
            type: event.type
        };
        Promise.resolve(this.setState({
            data: {
                lastModified: event.lastModified,
                lastModifiedDate: event.lastModifiedDate,
                name: event.name,
                size: event.size,
                type: event.type
            },
            fileName: event.name,
            fileMetaData: JSON.stringify({ data })
        }))
    }

    handleBase64File = (event) => {
        Promise.resolve(this.setState({ base64File: event }))
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
            // Binary String
            // var binaryString = reader.result;
            // console.log(btoa(binaryString));
            base64Result(reader.result);
        };
        if(file) {
            reader.readAsDataURL(file);
            this.handleFileMetaData(file);
        }
    }

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
                    sbColor: '#23CE6B'
                },
                data: {},
                base64File: '',
                fileName: '',
                fileMetaData: '',
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
                    sbColor: 'red'
                }
            })
        }
    }

    handleFileUpload = (event) => {
        this.props.data.dreReducer.uploadFileByUserIdSuccess = '';
        this.props.data.umaReducer.getUserMessageDataByUserIDSuccess = '';
        this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
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
            userFiles: ["string"],
            userMessages: ["string"],
            archivedMessages: ["string"]
        };
        let newUserFile = this.state.fileMetaData;
        console.log(fileBody);
        Promise.resolve(this.props.uploadFileByUserId(fileURL, fileBody))
            .then(() => {
                Promise.resolve(this.props.getUserMessageDataByUserID(umaURL))
                    .then(() => {
                        if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess) {
                            oldFiles = this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles;
                            allFiles = [newUserFile];
                            for (let i = 0; i < oldFiles.length; i++) {
                                allFiles.push(oldFiles[i]);
                            }
                            umaBody = {
                                userFiles: allFiles,
                                userMessages: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages,
                                archivedMessages: ["string"]        // Change later to be dynamic
                            };
                            Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                .then(() => {
                                    this.handleDREValidation();
                                })
                        } else {
                            umaBody = {
                                userFiles:[newUserFile],
                                userMessages: ["string"],
                                archivedMessages: ["string"]
                            };
                            Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                .then(() => {
                                    this.handleDREValidation();
                                })
                        }
                    })
            })
        event.preventDefault();
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

    render() {

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const formComplete = this.state.fileMetaData && this.state.fileName
            && this.state.base64File;

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={6} justify="flex-end">
                            <Grid>
                                <input
                                    id="flat-button-file"
                                    //multiple
                                    type="file"
                                    onChange={this.handleFileChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                    fullWidth={true} disabled={!formComplete}
                                    onClick={this.handleFileUpload}>
                                    Save and Upload
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
        getUserMessageDataByUserID: (url) => dispatch(getUserMessageDataByUserID(url)),
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body)),
        uploadFileByUserId: (url, body) => dispatch(uploadFileByUserId(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDocumentView);
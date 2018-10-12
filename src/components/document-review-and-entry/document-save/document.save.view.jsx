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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

class SaveDocumentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            file: '',
            fileName: '',
            fileMetaData: '',
            userName: '',
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
        }
        Promise.resolve(this.setState({
            fileName: data.name,
            fileMetaData: JSON.stringify({ data })
        }))
    }

    handleBase64File = (event) => {
        Promise.resolve(this.setState({ file: event }))
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
        reader.readAsDataURL(file);
        this.handleFileMetaData(file);
    }

    render() {

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
                        <Grid container item xs={12} sm={6} justify="flex-end">
                            <Grid>
                                <input
                                    /* style={{ 'display': 'none' }} */
                                    id="flat-button-file"
                                    //multiple
                                    type="file"
                                    onChange={this.handleFileChange}
                                />
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Upload" variant="contained"
                                        color="primary" component="span">
                                        Upload
                                            <CloudUploadIcon style={{ 'marginLeft': '12' }} />
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
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
        /* getUserMessageDataByUserID: (url) => dispatch(getUserMessageDataByUserID(url)),
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body)),
        uploadFileByUserId: (url, body) => dispatch(uploadFileByUserId(url, body)) */
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveDocumentView);
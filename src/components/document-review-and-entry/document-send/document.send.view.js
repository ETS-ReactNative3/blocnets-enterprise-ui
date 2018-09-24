import React from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import TextField from "material-ui/TextField";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { createDocumentEntryByUniqueID } from '../../../redux/actions/document.review.entry.actions';
import {
    getUserMessageDataByUserID,
    updateUserMessageDataByUserID
} from '../../../redux/actions/user.message.array.action';
import { uploadFileByUserId } from '../../../redux/actions/FILE/file.action';
//Temporary Only
import response from './messageData.json';

let userIDMenuItems = response[0].userID;
let messageTypeMenuItems = response[0].messageType;
let dataTypeMenuItems = response[0].dataType;

class SendDocumentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            file: '',
            recipientUserName: '',
            errorText1: 'This is a required field.',
            messageType: '',
            errorText2: 'This is a required field.',
            dataType: '',
            errorText3: 'This is a required field.',
            message: '',
            errorText4: 'This is a required field.',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

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
                message: ''
            });
        } else {
            this.setState({
                showProgressLogo: false,
                snackbar: {
                    autoHideDuration: 2000,
                    message: "Error: " + this.props.data.umaReducer.getUserMessageDataByUserIDError + "Please try again.",
                    open: true,
                    sbColor: 'red'
                }
            })
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'recipientUserName' && event.target.value) {
            this.setState({ errorText1: '' });
        } else if ([event.target.name].toString() === 'recipientUserName' && !event.target.value) {
            this.setState({ errorText1: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'messageType' && event.target.value) {
            this.setState({ errorText2: '' });
        } else if ([event.target.name].toString() === 'messageType' && !event.target.value) {
            this.setState({ errorText2: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'dataType' && event.target.value) {
            this.setState({ errorText3: '' });
        } else if ([event.target.name].toString() === 'dataType' && !event.target.value) {
            this.setState({ errorText3: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'message' && event.target.value) {
            this.setState({ errorText4: '' });
        } else if ([event.target.name].toString() === 'message' && !event.target.value) {
            this.setState({ errorText4: 'This is a required field.' });
        }
    };

    handleFileChange = (event) => {
        let files = event.target.files;
        var file = files[0];
        this.setState({
            file: file
        })
    }

    handleSendDocumentForReview = (event) => {
        this.props.data.dreReducer.createDocumentEntryByUniqueIDSuccess = '';
        this.props.data.umaReducer.getUserMessageDataByUserIDError = '';
        this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
        this.setState({ showProgressLogo: true });
        let fileURL = this.guid();
        let fileBody = {
            file: this.state.file,
            creatorID: 'Admin'
        }
        let dreURL = this.guid();
        let dreBody = {
            text: this.state.message,
            status: "pending",
            type: this.state.messageType,
            desc: this.state.dataType,
            fileId: this.state.fileKey
        };
        let oldMessages = [];
        let allMessages = [];
        let umaURL = this.state.recipientUserName;
        let umaBody = {
            userMessages: ["string"],
            archivedMessages: ["string"]
        };
        console.log(this.state.file);
        Promise.resolve(this.props.uploadFileByUserId(fileURL, fileBody))
            .then(() => {
                Promise.resolve(this.props.createDocumentEntryByUniqueID(dreURL, dreBody))
                    .then(() => {
                        Promise.resolve(this.props.getUserMessageDataByUserID(umaURL))
                            .then(() => {
                                if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages) {
                                    oldMessages = this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages;
                                    allMessages = [dreURL];
                                    for (let i = 0; i < oldMessages.length; i++) {
                                        allMessages.push(oldMessages[i]);
                                    }
                                    umaBody = {
                                        userMessages: allMessages,
                                        archivedMessages: ["string"]        // Change later to be dynamic
                                    };
                                    Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                        .then(() => {
                                            this.handleDREValidation();
                                        })
                                } else {
                                    umaBody = {
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
            })
        event.preventDefault();
    };

    guid = () => {
        return this.generateUniqueID() + this.generateUniqueID() + '-' + this.generateUniqueID() + '-'
            + this.generateUniqueID() + '-' + this.generateUniqueID() + '-' + this.generateUniqueID()
            + this.generateUniqueID() + this.generateUniqueID();
    };

    generateUniqueID = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
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
                                <FormHelperText style={{ "color": "red" }}>{this.state.errorText1}</FormHelperText>
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
                                <FormHelperText style={{ "color": "red" }}>{this.state.errorText2}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={12} sm={6} justify="flex-end">
                            <Grid>
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <input
                                        style={{ 'display': 'none' }}
                                        id="flat-button-file"
                                        //multiple
                                        type="file"
                                        onChange={this.handleFileChange}
                                    />
                                    <label htmlFor="flat-button-file">
                                        <Button
                                            type="submit"
                                            value="Upload"
                                            variant="contained"
                                            color="primary"
                                            component="span">
                                            Upload
                                            <CloudUploadIcon style={{ 'marginLeft': 'theme.spacing.unit' }} />
                                        </Button>
                                    </label>
                                </MuiThemeProvider>
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
                                <FormHelperText style={{ "color": "red" }}>{this.state.errorText3}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                value={this.state.message}
                                onChange={this.handleChange}
                                type="text"
                                name="message"
                                floatingLabelText="Message"
                                floatingLabelFixed={true}
                                style={{ "float": "left", "textAlign": "left" }}
                                hintText=""
                                multiLine={true}
                                rows={2}
                                rowsMax={4}
                                fullWidth={true}
                                errorText={this.state.errorText4}
                                errorStyle={{ "float": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <br />
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
        getUserMessageDataByUserID: (url, body) => dispatch(getUserMessageDataByUserID(url)),
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body)),
        uploadFileByUserId: (url, body) => dispatch(uploadFileByUserId(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendDocumentView);
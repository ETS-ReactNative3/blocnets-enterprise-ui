import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Grid from '@material-ui/core/Grid';
import NoSsr from '@material-ui/core/NoSsr';
import ReactSelect from 'react-select';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import ReactTextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import ReactClassNames from 'classnames';
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import Input from '@material-ui/core/Input/Input';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import TextField from 'material-ui/TextField';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { connect } from 'react-redux';
import { createDocumentEntryByUniqueID } from '../../../redux/actions/document.review.entry.actions';
import {
    getUserMessageDataByUserID,
    updateUserMessageDataByUserID
} from '../../../redux/actions/UMA/user.message.array.action';
import { uploadFileByUserId } from '../../../redux/actions/FILE/file.action';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import response from './messageData.json';

let userIDMenuItems = response[0].userID;
let messageTypeMenuItems = response[0].messageType;
let dataTypeMenuItems = response[0].dataType;

let count = 0;

const suggestions = userIDMenuItems.map(suggestion => ({
    value: suggestion,
    label: suggestion
}));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    input: {
        display: 'flex',
        padding: 0
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <ReactTextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={ReactClassNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function NoOptionsMessage(props) {
    return (
        <Typography
            color='textSecondary' className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function Option(props) {
    return (
        <MenuItem buttonRef={props.innerRef} selected={props.isFocused} component='div'
                  style={{ fontWeight: props.isSelected ? 500 : 400 }} {...props.innerProps}>
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography color='textSecondary' className={props.selectProps.classes.placeholder} {...props.innerProps} >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class SendDocumentView extends React.Component {

    componentDidMount() {
        if (!this.isCancelled && this.props.data.umaReducer.getUserMessageDataByUserIDSuccess
            && this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles
            && this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles.length > 0) {
            let files = ['None'];
            for (let i = 0; i < this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles.length; i++) {
                if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles[i] !== 'string') {
                    let tmp = JSON.parse(this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles[i]);
                    files.push(tmp.data.name);
                }
            }
            Promise.resolve(
                this.setState({ fileMenuItems: files })
            );
        }
    };

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            showProgressLogo: false,
            recipientUserName: null,
            errorTextRecipientUserName: 'This is a required field.',
            messageType: '',
            errorTextMessageType: 'This is a required field.',
            fileFromSavedDocsKey: '',
            fileMenuItems: [],
            fileFromMyComputerKey: '',
            file: '',
            fileMetaData: {},
            dataType: '',
            errorTextDataType: 'This is a required field.',
            message: '',
            errorTextMessage: 'This is a required field.',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            }
        };
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
    };

    handleProgressBar = (event) => {
        if (event.lengthComputable) {
            var percentLoaded = Math.round((event.loaded / event.total) * 100);
            if (percentLoaded < 100) {
                console.log(percentLoaded + '%');
                //progress.style.width = percentLoaded + '%';
                //progress.textContent = percentLoaded + '%';
            }
        }
    };

    handleBase64File = (fileName, event) => {
        Promise.resolve(
            this.setState({
                fileFromSavedDocsKey: '',
                fileFromMyComputerKey: fileName,
                file: event
            })
        );
    };

    handleFileMetaData = (event) => {
        Promise.resolve(
            this.setState({
                fileMetaData: {
                    lastModified: event.lastModified,
                    lastModifiedDate: event.lastModifiedDate,
                    name: event.name,
                    size: event.size,
                    type: event.type
                }
            })
        )
    };

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
            alert('File is too large. Reduce file size to less than 30mb!');
        } else {
            Promise.resolve(this.setState({ fileFromMyComputerKey: '' }))
        }
    };

    handleMultiChange = name => value => {
        this.setState({ [name]: value });
        if (value.length > 0) {
            this.setState({ errorTextRecipientUserName: '' });
        } else {
            this.setState({ errorTextRecipientUserName: 'This is a required field.' });
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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

    handleFileValidation = () => {
        if (this.props.data.fileReducer.uploadFileByUserIdError
            && this.props.data.fileReducer.uploadFileByUserIdError.status === 409) {
            this.setState({
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'File already exists! Please choose a different file name.',
                    open: true,
                    sbColor: 'Module-Snackbar-Error'
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
                    sbColor: 'Module-Snackbar-Error'
                }
            });
        } else if (this.props.data.fileReducer.uploadFileByUserIdSuccess === true) {
            this.setState({
                snackbar: {
                    autoHideDuration: 2000,
                    message: 'Document Attached and Uploaded Successfully!',
                    open: true,
                    sbColor: 'Module-Snackbar-Success'
                }
            })
        }
    };

    handleFileKeyAttached = () => {
        if (this.state.fileFromSavedDocsKey !== '') {
            Promise.resolve(
                this.setState({ selectedFileKey: this.state.fileFromSavedDocsKey })
            )
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

    handleDREValidation = (userNameLength) => {
        count++;
        if (userNameLength === count) {
            if (this.props.data.dreReducer.createDocumentEntryByUniqueIDSuccess === true
                && this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess === true) {
                this.setState({
                    showProgressLogo: false,
                    snackbar: {
                        autoHideDuration: 2000,
                        message: 'Document Sent Successfully!',
                        open: true,
                        sbColor: 'Module-Snackbar-Success'
                    },
                    recipientUserName: '',
                    fileFromSavedDocsKey: '',
                    fileFromMyComputerKey: '',
                    messageType: '',
                    dataType: '',
                    message: ''
                });
            } else {
                this.setState({
                    showProgressLogo: false,
                    snackbar: {
                        autoHideDuration: 2000,
                        message: 'Error sending document! Please try again.',
                        open: true,
                        sbColor: 'Module-Snackbar-Error'
                    }
                })
            }
        }
    };

    handleSendDocumentForReview = (event) => {
        this.setState({ showProgressLogo: true });
        let tmp = {
            opt1: this.state.fileFromSavedDocsKey,
            opt2: this.state.fileFromMyComputerKey
        };
        let attachfileKey = tmp.opt1 !== '' ? tmp.opt1 : tmp.opt2 !== '' ? tmp.opt2 : '';
        let userNameLength = this.state.recipientUserName.length;
        count = 0;
        Promise.resolve(this.handleFileKeyAttached()).then(() => {
            if ((tmp.opt1 === '' && tmp.opt2 === '' && attachfileKey === '')
                || (tmp.opt1 !== '' && tmp.opt2 === '' && attachfileKey !== '')
                || (tmp.opt1 === '' && tmp.opt2 !== '' && attachfileKey !== '')) {
                let recipientUserName = '';
                for (let j = 0; j < this.state.recipientUserName.length; j++) {
                    recipientUserName = this.state.recipientUserName[j].value;
                    this.props.data.dreReducer.createDocumentEntryByUniqueIDSuccess = '';
                    this.props.data.umaReducer.getUserMessageDataByUserIDError = '';    // Clean-up: unused Validation
                    this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
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
                    let umaURL = recipientUserName;
                    let umaBody = {
                        userfiles: ['string'],
                        userMessages: ['string'],
                        archivedMessages: ['string']
                    };
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
                                            archivedMessages: ['string']        // Change later to be dynamic
                                        };
                                        Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                            .then(() => {
                                                this.handleDREValidation(userNameLength);
                                            })
                                    } else {
                                        umaBody = {
                                            userfiles: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles,
                                            userMessages: [dreURL],
                                            archivedMessages: ['string']
                                        };
                                        Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                            .then(() => {
                                                this.handleDREValidation(userNameLength);
                                            })
                                    }
                                })
                        })
                }
            } else {
                this.setState({ showProgressLogo: false })
            }
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
            },
        });
    };

    render() {

        const { fileMenuItems, fileFromMyComputerKey } = this.state;

        const formComplete = this.state.recipientUserName && this.state.messageType
            && this.state.dataType && this.state.message;

        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <form>
                <div>
                    {
                        this.state.showProgressLogo ?
                            <div className='overlay'>
                                <img src={blocnetsLogo} className='App-logo-progress' alt='' />
                            </div>
                            :
                            ''
                    }
                </div>
                <div className='Module'>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <div className={classes.root}>
                                <NoSsr>
                                    <ReactSelect
                                        classes={classes}
                                        styles={selectStyles}
                                        textFieldProps={{
                                            label: 'Recipient User Name',
                                            InputLabelProps: {
                                                shrink: true,
                                            }
                                        }}
                                        options={suggestions}
                                        components={components}
                                        value={this.state.recipientUserName}
                                        onChange={this.handleMultiChange('recipientUserName')}
                                        placeholder='Select Multiple Recipients'
                                        isMulti
                                    />
                                    <FormHelperText className='TT-Font-Red'>
                                        {this.state.errorTextRecipientUserName}
                                    </FormHelperText>
                                </NoSsr>
                            </div>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <InputLabel className='Module-TextField'>Message Type</InputLabel>
                                <Select value={this.state.messageType} onChange={this.handleChange}
                                        input={<Input name='messageType' className='Mobile-MenuItem' />}
                                        displayEmpty>
                                    {messageTypeMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText className='TT-Font-Red'>
                                    {this.state.errorTextMessageType}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <InputLabel className='Module-TextField'>Attach File from Saved Documents</InputLabel>
                                <Select value={this.state.fileFromSavedDocsKey} onChange={this.handleChange}
                                        input={<Input name='fileFromSavedDocsKey' className='Mobile-MenuItem' />}
                                        displayEmpty>
                                    {fileMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3} justify='flex-end'>
                            <Grid>
                                <input
                                    accept='.png,.jpg,.jpeg,.gif,.pdf'
                                    id='flat-button-file'
                                    type='file'
                                    className='Module-Button-Input'
                                    onChange={this.handleFileChange}
                                />
                                <label htmlFor='flat-button-file'>
                                    <Button type='submit' value='Upload' variant='contained' component='span'
                                            className='Module-Button-Save'>
                                        Attach File from My Computer
                                        {fileFromMyComputerKey !== '' ? <CheckIcon /> : <span></span>}
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel className='Module-TextField'>Data Type</InputLabel>
                                <Select value={this.state.dataType} onChange={this.handleChange}
                                        input={<Input name='dataType' className='Mobile-MenuItem' />}
                                        displayEmpty>
                                    {dataTypeMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText className='TT-Font-Red'>{this.state.errorTextDataType}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                value={this.state.message}
                                onChange={this.handleChange}
                                type='text'
                                name='message'
                                floatingLabelText='Message'
                                floatingLabelFixed={true}
                                className='Module-TextField'
                                hintText=''
                                multiLine={true}
                                rows={2}
                                rowsMax={4}
                                fullWidth={true}
                                errorText={this.state.errorTextMessage}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button type='submit' value='Submit' variant='contained' className='Module-Button'
                                    fullWidth={true} disabled={!formComplete}
                                    onClick={this.handleSendDocumentForReview}>
                                Send Document for Review
                                <SendIcon className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar open={this.state.snackbar.open} autoHideDuration={this.state.snackbar.autoHideDuration}
                          onClose={this.handleSnackbarClose}>
                    <SnackbarContent
                        message={this.state.snackbar.message}
                        className={this.state.snackbar.sbColor}
                        classes={{ message: 'Module-Snackbar-Message' }}
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
        createDocumentEntryByUniqueID: (url, body) => dispatch(createDocumentEntryByUniqueID(url, body)),
        getUserMessageDataByUserID: (url) => dispatch(getUserMessageDataByUserID(url)),
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body)),
        uploadFileByUserId: (url, body) => dispatch(uploadFileByUserId(url, body))
    };
};

SendDocumentView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SendDocumentView));
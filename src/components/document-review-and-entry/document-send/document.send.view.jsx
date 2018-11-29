import React from 'react';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
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
import response from './messageData.json';

let userIDMenuItems = response[0].userID;
let messageTypeMenuItems = response[0].messageType;

let dreURLForSender = [];
let sendToSelf = false;
let countSendToSelf = 0;

const suggestions = userIDMenuItems.map(suggestion => ({
    label: suggestion,
    value: suggestion
}));

const styles = theme => ({
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08
        )
    },
    divider: {
        height: theme.spacing.unit * 2
    },
    input: {
        display: 'flex',
        padding: 0
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    paper: {
        left: 0,
        marginTop: theme.spacing.unit,
        position: 'absolute',
        right: 0,
        zIndex: 10
    },
    placeholder: {
        fontSize: 16,
        left: 2,
        position: 'absolute'
    },
    root: {
        flexGrow: 1
    },
    singleValue: {
        fontSize: 16
    },
    valueContainer: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        overflow: 'hidden'
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
                    children: props.children,
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    ...props.innerProps,
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Menu(props) {
    return (
        <Paper className={props.selectProps.classes.paper} {...props.innerProps} square>
            {props.children}
        </Paper>
    );
}

function MultiValue(props) {
    return (
        <Chip
            className={ReactClassNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            deleteIcon={<CancelIcon {...props.removeProps} />}
            label={props.children}
            onDelete={props.removeProps.onClick}
            tabIndex={-1}
        />
    );
}

function NoOptionsMessage(props) {
    return (
        <Typography className={props.selectProps.classes.noOptionsMessage} {...props.innerProps} color='textSecondary'>
            {props.children}
        </Typography>
    );
}

function Option(props) {
    return (
        <MenuItem buttonRef={props.innerRef} component='div' selected={props.isFocused}
                  style={{ fontWeight: props.isSelected ? 500 : 400 }} {...props.innerProps}>
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography className={props.selectProps.classes.placeholder} {...props.innerProps} color='textSecondary'>
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
            fileMenuItems: [],
            fileFromSavedDocsKey: '',
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
            this.setState({ fileFromSavedDocsKey: event.target.value })
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
                    sbColor: 'Module-Snackbar-Success'
                },
                recipientUserName: null,
                errorTextRecipientUserName: 'This is a required field.',
                messageType: '',
                errorTextMessageType: 'This is a required field.',
                fileFromSavedDocsKey: '',
                message: '',
                errorTextMessage: 'This is a required field.',
            });
            this.props.viewHandler(true);
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
    };

    handleSendDocumentToSender = (dreURL, umaURL, userNameLength) => {
        if (umaURL !== this.state.userName) {
            dreURLForSender.push(dreURL);
        }
        if (umaURL === this.state.userName && countSendToSelf === 0) {
            sendToSelf = true;
            countSendToSelf++;
        }
        if ((sendToSelf === false && dreURLForSender.length === userNameLength) || (sendToSelf === true && dreURLForSender.length === userNameLength - 1)) {
            let oldMessages = [];
            let allMessages = [];
            let umaBody = {
                userfiles: ['string'],
                userMessages: ['string'],
                archivedMessages: ['string']
            };
            if (this.props.data.umaReducer.getUserMessageDataByUserIDSuccess) {
                oldMessages = this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userMessages;
                allMessages = dreURLForSender;
                for (let i = 0; i < oldMessages.length; i++) {
                    allMessages.push(oldMessages[i]);
                }
                umaBody = {
                    userfiles: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles,
                    userMessages: allMessages,
                    archivedMessages: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.archivedMessages
                };
                Promise.resolve(this.props.updateUserMessageDataByUserID(this.state.userName, umaBody))
                    .then(() => {
                        this.handleDREValidation();
                    });
            }
        }
    };

    handleSendDocumentForReview = (event) => {
        dreURLForSender = [];
        sendToSelf = false;
        countSendToSelf = 0;
        this.setState({ showProgressLogo: true });
        let userNameLength = this.state.recipientUserName.length;
        let recipientUserName = '';
        for (let j = 0; j < userNameLength; j++) {
            recipientUserName = this.state.recipientUserName[j].value;
            this.props.data.dreReducer.createDocumentEntryByUniqueIDSuccess = '';
            this.props.data.umaReducer.getUserMessageDataByUserIDError = '';
            this.props.data.umaReducer.updateUserMessageDataByUserIDSuccess = '';
            let dreURL = this.guid();
            let dreBody = {
                desc: dreURL,
                fileId: this.state.fileFromSavedDocsKey,
                header: {
                    status: 'Pending',
                    sender: this.state.userName,
                    recipient: recipientUserName
                },
                text: this.state.message,
                type: this.state.messageType,
                date: new Date().toISOString().substring(0, 10)
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
                                    archivedMessages: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.archivedMessages
                                };
                                Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                    .then(() => {
                                        Promise.resolve(this.props.getUserMessageDataByUserID(this.state.userName))
                                            .then(() => {
                                                this.handleSendDocumentToSender(dreURL, umaURL, userNameLength);
                                            });
                                    });
                            } else {
                                umaBody = {
                                    userfiles: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.userFiles,
                                    userMessages: [dreURL],
                                    archivedMessages: this.props.data.umaReducer.getUserMessageDataByUserIDSuccess.archivedMessages
                                };
                                Promise.resolve(this.props.updateUserMessageDataByUserID(umaURL, umaBody))
                                    .then(() => {
                                        Promise.resolve(this.props.getUserMessageDataByUserID(this.state.userName))
                                            .then(() => {
                                                this.handleSendDocumentToSender(dreURL, umaURL, userNameLength);
                                            });
                                    });
                            }
                        })
                })
        }
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

        const { fileMenuItems } = this.state;

        const formComplete = this.state.recipientUserName && this.state.messageType && this.state.message;

        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                }
            })
        };

        return (
            <form>
                <div>
                    {this.state.showProgressLogo ?
                        <div className='overlay'>
                            <img alt='' className='App-logo-progress' src={blocnetsLogo} />
                        </div>
                        :
                        ''}
                </div>
                <div className='Module'>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <div className={classes.root}>
                                <NoSsr>
                                    <ReactSelect
                                        classes={classes}
                                        components={components}
                                        isMulti
                                        onChange={this.handleMultiChange('recipientUserName')}
                                        options={suggestions}
                                        placeholder='Select Multiple Recipients'
                                        styles={selectStyles}
                                        textFieldProps={{
                                            label: 'Recipient User Name',
                                            InputLabelProps: {
                                                shrink: true,
                                            }
                                        }}
                                        value={this.state.recipientUserName}
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
                                <InputLabel className='Module-TextField'>
                                    Message Type
                                </InputLabel>
                                <Select displayEmpty input={<Input className='Mobile-MenuItem' name='messageType' />}
                                        onChange={this.handleChange} value={this.state.messageType}>
                                    {messageTypeMenuItems.map((menuItem, i) => {
                                        return (
                                            <MenuItem key={i} value={menuItem}>
                                                {menuItem}
                                            </MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText className='TT-Font-Red'>
                                    {this.state.errorTextMessageType}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <InputLabel className='Module-TextField'>
                                    Attach File from Saved Documents
                                </InputLabel>
                                <Select displayEmpty
                                        input={<Input name='fileFromSavedDocsKey' className='Mobile-MenuItem' />}
                                        onChange={this.handleChange} value={this.state.fileFromSavedDocsKey}>
                                    {fileMenuItems.map((menuItem, i) => {
                                        return (
                                            <MenuItem key={i} value={menuItem}>
                                                {menuItem}
                                            </MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                className='Module-TextField'
                                errorText={this.state.errorTextMessage}
                                floatingLabelFixed={true}
                                floatingLabelText='Message'
                                fullWidth={true}
                                hintText=''
                                multiLine={true}
                                name='message'
                                onChange={this.handleChange}
                                rows={2}
                                rowsMax={4}
                                type='text'
                                value={this.state.message}
                            />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button className='Module-Button' disabled={!formComplete} fullWidth={true}
                                    onClick={this.handleSendDocumentForReview} type='submit' value='Submit'
                                    variant='contained'>
                                Send Document for Review
                                <SendIcon className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar autoHideDuration={this.state.snackbar.autoHideDuration} onClose={this.handleSnackbarClose}
                          open={this.state.snackbar.open}>
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
        data: state
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        createDocumentEntryByUniqueID: (url, body) => dispatch(createDocumentEntryByUniqueID(url, body)),
        getUserMessageDataByUserID: (url) => dispatch(getUserMessageDataByUserID(url)),
        updateUserMessageDataByUserID: (url, body) => dispatch(updateUserMessageDataByUserID(url, body))
    };
};

SendDocumentView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SendDocumentView));
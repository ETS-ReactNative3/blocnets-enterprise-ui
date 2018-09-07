import React from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { createDocumentEntryByUserID } from '../../../redux/actions/document.review.entry.actions';
//Temporary Only
import response from './messageData.json';

let userIDMenuItems = response[0].userID;
let messageTypeMenuItems = response[0].messageType;
let dataTypeMenuItems = response[0].dataType;

class DocumentSendView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            recipientUserName: '',
            messageType: '',
            dataType: '',
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleUpload = (event) => {
    };

    handleSubmit = (event) => {

        let data = {
            status: "pending",
            type: this.state.messageType,
            desc: this.state.dataType,
            fileId: ''
        };

        this.props.createDocumentEntryByUserID(this.state.recipientUserName, data);
        //this.setState({showProgressLogo: true}); to show blocnetsLogo before submit
        //this.setState({showProgressLogo: false}); to show blocnetsLogo after receiving response
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Success',
                open: true,
                sbColor: 'black'
            }
        });
        /*this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: 'Error',
                open: true,
                sbColor: 'red'
            }
        }); to show error message */
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

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const formComplete = this.state.recipientUserName && this.state.messageType && this.state.dataType;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {this.state.showProgressLogo ? <img src={blocnetsLogo} className="App-logo-progress" alt=""/> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <InputLabel>
                                    Recipient User Name
                                </InputLabel>
                                <Select value={this.state.recipientUserName} onChange={this.handleChange}
                                        input={<Input name="recipientUserName" style={{"textAlign": "left"}}/>}
                                        displayEmpty>
                                    <MenuItem value={userIDMenuItems}>{userIDMenuItems}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormControl fullWidth={true}>
                                <InputLabel>
                                    Message Type
                                </InputLabel>
                                <Select value={this.state.messageType} onChange={this.handleChange}
                                        input={<Input name="messageType" style={{"textAlign": "left"}}/>}
                                        displayEmpty>
                                    {messageTypeMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={12} sm={6} justify="flex-end">
                            <Grid>
                                <MuiThemeProvider theme={buttonThemeYellow}>
                                    <Button type="submit" value="Upload" variant="contained"
                                            color="primary" onClick={this.handleUpload()} disabled>
                                        Upload...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel>
                                    Data Type
                                </InputLabel>
                                <Select value={this.state.dataType} onChange={this.handleChange}
                                        input={<Input name="dataType" style={{"textAlign": "left"}}/>}
                                        displayEmpty>
                                    {dataTypeMenuItems.map((menuItem, i) => {
                                        return (<MenuItem value={menuItem} key={i}>{menuItem}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!formComplete}>
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
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </form>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        state,
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        createDocumentEntryByUserID: (url, body) => dispatch(createDocumentEntryByUserID(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentSendView);
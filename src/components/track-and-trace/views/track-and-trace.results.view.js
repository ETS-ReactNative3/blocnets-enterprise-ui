import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from 'material-ui/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch/Switch';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import TrackAndTraceTreeView from './track-and-trace.tree.view';

class TrackAndTraceResultsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMaterialMap: false,
            showMaterialMapSwitch: false,
            tree: this.props.tree,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    };

    handleChange = (event) => {
        if ([event.target.name].toString() === 'showMaterialMapSwitch' && event.target.checked === true) {
            this.setState({
                showMaterialMap: true,
                showMaterialMapSwitch: true
            });
        } else if ([event.target.name].toString() === 'showMaterialMapSwitch' && event.target.checked === false) {
            this.setState({
                showMaterialMap: false,
                showMaterialMapSwitch: false
            });
        }
    };

    handleTreeClose = () => {
        this.setState({
            showMaterialMap: false,
            showMaterialMapSwitch: false
        });
    };

    handleSnackbarClose = () => {
        this.props.snackbar.open = false;
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

        const buttonThemeRed = createMuiTheme({
            palette: {
                primary: red
            },
        });

        return (
            <form>
                <div>
                    <div style={{padding: 24}}>
                        <Grid container>
                            <Grid container item xs={12}>
                                Block Information
                            </Grid>
                        </Grid>
                        <br/>
                        {this.props.tatData.length !== 0 ?
                            <Grid container justify="center">
                                <Grid container item xs={12}>
                                    <Paper style={{"width": "100%"}}>
                                        <div style={{"overflowX": "auto"}}>
                                            <Table style={{"tableLayout": "fixed"}}>
                                                <TableBody style={{"overflowWrap": "break-word"}}>
                                                    {this.props.tatData.map(row => {
                                                        return (
                                                            <TableRow key={row.id}>
                                                                <TableCell>{row.info1}</TableCell>
                                                                <TableCell>{row.info2}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid> :
                            <Grid container justify="center">
                                <Grid container item xs={12}>
                                    <Paper style={{"width": "100%", "height": "50vh"}}>
                                        <div style={{"overflowX": "auto"}}>
                                            <Typography align="left">
                                            </Typography>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        }
                        <br/>
                        {this.props.tree.length !== 0 ?
                            <Grid container>
                                <Grid item>
                                    <MuiThemeProvider theme={buttonThemeRed}>
                                        <Switch
                                            onChange={this.handleChange}
                                            name="showMaterialMapSwitch"
                                            checked={this.state.showMaterialMapSwitch}
                                        />
                                        Show Material Map
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid> :
                            ''
                        }
                        <br/>
                        <Dialog open={this.state.showMaterialMap} onClose={this.handleTreeClose}>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <i className="material-icons" style={{"cursor": "pointer"}}
                                       onClick={this.handleTreeClose}>close</i>
                                </Grid>
                            </Grid>
                            <br/>
                            <div>
                                <TrackAndTraceTreeView data={this.state}/>
                            </div>
                        </Dialog>
                    </div>
                    <Snackbar
                        open={this.props.snackbar.open}
                        message={this.props.snackbar.message}
                        autoHideDuration={this.props.snackbar.autoHideDuration}
                        onRequestClose={this.handleSnackbarClose}
                        bodyStyle={{backgroundColor: this.props.snackbar.sbColor}}
                    />
                    <Snackbar
                        open={this.state.snackbar.open}
                        message={this.state.snackbar.message}
                        autoHideDuration={this.state.snackbar.autoHideDuration}
                        onRequestClose={this.handleSnackbarClose}
                        bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                    />
                </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackAndTraceResultsView);
import React, { Component } from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Dialog from 'material-ui/Dialog'; 
import FlatButton from 'material-ui/FlatButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Toggle from 'material-ui/Toggle';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Tree from 'react-d3-tree';
import { connect } from 'react-redux';
import { getShippingDataByMaterialID } from '../../../redux/actions/shipping.and.receiving.actions';
import { createConstruct } from '../../../redux/actions/tree.spawn.action';

let counter = 0;

function createData(info1, info2) {
    counter += 1;
    return {id: counter, info1, info2};
}

class TrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materialID: '',
            shipmentID: '',
            shipmentSent: '',
            shipmentCompleted: '',
            shipmentQuantity: '',
            manuallyShipped: '',
            shipped: true,
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            ipAddress: '',
            receivedShipment: '',
            receivedOrder: '',
            deliveryOrderNo: '',
            prdKey: '',
            openDialog: false,
            showProgressLogoDialog: false,
            showProgressLogo: false,
            snackBar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: ''
            },
            dialog: {
                open: false,
            },
            legacy: {
                expanded: false,
            },
            id: '',
            dialogData: '',
            items: []
        };
        /* this.store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
            this.setState({
              items: this.store.getState().sarReducer
            });
          }); */
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleExpandChange = (expanded) => {
        this.setState({
            legacy: {
                expanded: expanded
            }
        });
    };

    handleLegacyToggle = (event, toggle) => {
        this.setState({
            legacy: {
                expanded: toggle
            }
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialogData: '',
            dialog: {
                open: false
            },
        });
    };

    handleRequestClose = () => {
        this.setState({
            snackBar: {
                open: false,
                message: '',
            },
        });
    };

    handleIdChange(event) {
        this.setState({ id: event.target.value });
    }

    handleSubmit(event) {

        this.props.getShippingDataByMaterialID(this.state.id);
        this.setState({ showProgressLogo: true });
        setTimeout(function () {
            let response = JSON.stringify(this.props.data.sarReducer.getShippingDataByMaterialIDSuccess);
            let error = JSON.stringify(this.props.data.sarReducer.getShippingDataByMaterialIDFail);
            console.log(response);
            console.log(error);
            if (error) {
                this.setState({
                    showProgressLogo: false,
                    dialogData: '',
                    snackbar: {
                        open: true,
                        message: 'Track Error! Please try again.',
                        autoHideDuration: 2000,
                        sbColor: 'red'
                    }
                });
            } else if (response) {
                this.setState({
                    snackBar: {
                        open: true,
                        message: "Successfully tracked a block!",
                        autoHideDuration: 2000,
                    },
                    dialog: {
                        open: true,
                    },
                    showProgressLogo: false,
                    dialogData: JSON.stringify(this.props.data.sarReducer.getShippingDataByMaterialIDSuccess)
                });
            }
        }
            .bind(this),
            1000);


        event.preventDefault();
    };

    render() {

        const buttonThemeYellow = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const buttonThemeRed = createMuiTheme({
            palette: {
                primary: red
            },
        });

        const style = {
            margin: 12,
        };

        const rows = [
            createData('Material ID', this.state.materialID),
            createData('Shipment ID', this.state.shipmentID),
            createData('Address', this.state.addressLine1 + ' ' + this.state.addressLine2 + ' '
                + this.state.city + ' ' + this.state.state + ' ' + this.state.postalCode + ' '
                + this.state.country),
            createData('IP Address', this.state.ipAddress),
            createData('Manually Shipped', this.state.manuallyShipped),
            createData('Delivery Order No.', this.state.deliveryOrderNo),
            createData('Shipment Quantity', this.state.shipmentQuantity),
            createData('Shipment Sent', this.state.shipmentSent),
            createData('Shipment Completed', this.state.shipmentCompleted),
            createData('Received Shipment', this.state.receivedShipment),
            createData('Received Order', this.state.receivedOrder),
            createData('Started Production', this.state.prdKey)
        ];

        const actions = [
            <FlatButton
                label="Close"
                default={true}
                onClick={this.handleDialogClose}
            />,
        ];

        return (
            <form onSubmit={this.handleSubmit} style={{ "marginTop": "5%" }}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} sm={3}>
                            <TextField
                                value={this.state.id} onChange={this.handleIdChange}
                                type="text"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left", "marginLeft": "5%" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button
                                    type="submit"
                                    label="Track"
                                    value="Submit"
                                    color="primary"
                                    fullWidth={true}
                                    style={style}
                                    variant="contained">
                                    Track
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                < br />
                <Snackbar
                    open={this.state.snackBar.open}
                    message={this.state.snackBar.message}
                    autoHideDuration={this.state.snackBar.autoHideDuration}
                    onRequestClose={this.handleRequestClose}
                />
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <div style={{padding: 24}}>
                        <Grid container>
                            <Grid container item xs={12}>
                                Please confirm information.
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container justify="center">
                            <Grid container item xs={12}>
                                <Paper style={{"width": "100%"}}>
                                    <div>
                                        {this.state.showProgressLogoDialog ?
                                            <div className="overlay"><img src={blocnetsLogo}
                                                                          className="App-logo-progress" alt=""/>
                                            </div> : ""}
                                    </div>
                                    <div style={{"overflowX": "auto"}}>
                                        <Table style={{"tableLayout": "fixed"}}>
                                            <TableBody>
                                                {rows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>{row.info1}</TableCell>
                                                            <TableCell>{row.info2}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>{/* 
                                        <Tree data={myTreeData}></Tree> */}
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={this.handleCheckboxChange}
                                                name="doNotAskAgain"
                                                color="default"
                                            />
                                        }
                                        label="Do not ask again."
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={24}>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="OK" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleSubmit}>
                                        OK
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                            <Grid container item xs={4} sm={4}>
                                <MuiThemeProvider theme={buttonThemeRed}>
                                    <Button type="submit" value="Cancel" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handleDialogClose}>
                                        Cancel
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
            </form >
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
        getShippingDataByMaterialID: (url) => dispatch(getShippingDataByMaterialID(url)),
        createConstruct: (materialID) => dispatch(createConstruct(materialID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerView);
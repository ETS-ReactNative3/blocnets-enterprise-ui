import React, {Component} from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import TextField from 'material-ui/TextField';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from "@material-ui/core/Divider/Divider";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from 'material-ui/Snackbar';
import {connect} from 'react-redux';
import {getBillOfMaterialsByMaterialID} from '../../redux/actions/bill-of-materials.actions';
import {
    createShippingDataByMaterialID,
    createShippingDataByShipmentID
}
    from '../../redux/actions/shipping.and.receiving.actions';

class ShippingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            materialID: '',
            errorText1: 'This is a required field.',
            shipmentID: '',
            address: '',
            addressMenuItems: '',
            ipAddress: '',
            errorText2: 'This is a required field.',
            manualShipping: false,
            manualShipping2: 'NO',
            shipmentCompleted: false,
            shipmentCompleted2: 'NO',
            materialIDQuantityList: [{
                materialID: '',
                quantity: ''
            }],
            openDialog: false,
            showProgressLogoDialog: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    handleMaterialIDChange = (event) => {
        if (event.target.value) {
            let eBOMData = [];
            this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess = '';
            let shipToAddressMenuItemsLength = '';
            this.setState({showProgressLogo: true});
            this.props.getBillOfMaterialsByMaterialID(event.target.value);
            setTimeout(
                function () {
                    eBOMData = this.props.data.bomReducer.getBillOfMaterialsByMaterialIDSuccess;
                    if (eBOMData) {
                        this.setState({
                            showProgressLogo: false,
                            addressMenuItems: eBOMData.supplier.supplierCustomerShipToAddress,
                            ipAddress: eBOMData.supplier.supplierCustomerShipToIPAddress
                        });
                        shipToAddressMenuItemsLength = this.state.addressMenuItems.replace(/\s+/g, '').length;
                        if (shipToAddressMenuItemsLength === 0) {
                            this.setState({
                                addressMenuItems: '',
                                ipAddress: '',
                                snackbar: {
                                    autoHideDuration: 2000,
                                    message: 'Address cannot be found!',
                                    open: true,
                                    sbColor: 'red'
                                },
                            });
                        }
                    } else {
                        this.setState({
                            showProgressLogo: false,
                            addressMenuItems: '',
                            ipAddress: '',
                            snackbar: {
                                autoHideDuration: 2000,
                                message: 'Address cannot be found!',
                                open: true,
                                sbColor: 'red'
                            },
                        });
                    }
                }
                    .bind(this),
                1000
            );
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        if ([event.target.name].toString() === 'materialID' && event.target.value) {
            this.setState({errorText1: ''});
            let materialIDQuantityList = [...this.state.materialIDQuantityList];
            materialIDQuantityList[0].materialID = event.target.value;
            this.setState({
                materialIDQuantityList: materialIDQuantityList
            });
        } else if ([event.target.name].toString() === 'materialID' && !event.target.value) {
            this.setState({
                errorText1: 'This is a required field.',
                addressMenuItems: '',
                ipAddress: ''
            });
        }
        if ([event.target.name].toString() === 'address' && event.target.value) {
            this.setState({errorText2: ''});
        } else if ([event.target.name].toString() === 'address' && !event.target.value) {
            this.setState({errorText2: 'This is a required field.'});
        }
    };

    handleCheckboxChange = (event) => {
        this.setState({[event.target.name]: event.target.checked});
        if ([event.target.name].toString() === 'manualShipping' && event.target.checked === true) {
            this.setState({
                manualShipping: true,
                manualShipping2: 'YES'
            });
        } else if ([event.target.name].toString() === 'manualShipping' && event.target.checked === false) {
            this.setState({
                manualShipping: false,
                manualShipping2: 'NO'
            });
        }
        if ([event.target.name].toString() === 'shipmentCompleted' && event.target.checked === true) {
            this.setState({
                shipmentCompleted: true,
                shipmentCompleted2: 'YES'
            });
        } else if ([event.target.name].toString() === 'shipmentCompleted' && event.target.checked === false) {
            this.setState({
                shipmentCompleted: false,
                shipmentCompleted2: 'NO'
            });
        }
    };

    handleAddition = (event) => {
        let materialIDQuantityList = this.state.materialIDQuantityList;
        let materialIDQuantityList2 = {
            materialID: '',
            quantity: ''
        };
        let materialIDQuantityListFinal = materialIDQuantityList.concat(materialIDQuantityList2);
        this.setState({
            materialIDQuantityList: materialIDQuantityListFinal
        })
    };

    handleDeletion = (index) => (event) => {
        let materialIDQuantityList = this.state.materialIDQuantityList;
        let materialIDQuantityList2 = materialIDQuantityList.slice(0, index);
        let materialIDQuantityList3 = materialIDQuantityList.slice(index + 1);
        let materialIDQuantityListFinal = materialIDQuantityList2.concat(materialIDQuantityList3);
        this.setState({
            materialIDQuantityList: materialIDQuantityListFinal
        })

    };

    handleText = index => event => {
        event.preventDefault();
        let materialIDQuantityList = [...this.state.materialIDQuantityList];
        if ([event.target.name].toString() === 'materialIDList' && event.target.value) {
            materialIDQuantityList[index].materialID = event.target.value;
        } else if ([event.target.name].toString() === 'materialIDList' && !event.target.value) {
            materialIDQuantityList[index].materialID = '';
        }
        if ([event.target.name].toString() === 'quantityList' && event.target.value) {
            materialIDQuantityList[index].quantity = event.target.value;
        } else if ([event.target.name].toString() === 'quantityList' && !event.target.value) {
            materialIDQuantityList[index].quantity = '';
        }
        this.setState({
            materialIDQuantityList: materialIDQuantityList
        });
    };

    handleConfirmation = (event) => {
        this.setState({openDialog: true});
        event.preventDefault();
    };

    handlePrint = () => {
    };

    handleSubmit = (event) => {
        this.props.data.sarReducer.createShippingDataByMaterialIDSuccess = '';
        this.props.data.sarReducer.createShippingDataByShipmentIDSuccess = '';
        this.setState({
            showProgressLogo: true,
            showProgressLogoDialog: true
        });
        let shipmentUrl = this.state.shipmentID;
        let materialUrl = this.state.materialID;
        let data = {
            materialID: this.state.materialID,
            shipmentID: this.state.shipmentID,
            address1: this.state.addressLine1,
            address2: this.state.addressLine2,
            city: this.state.city,
            state: this.state.addressState,
            postalCode: this.state.postalCode,
            country: this.state.country,
            ipAddress: this.state.ipAddress,
            manuallyShipped: this.state.manualShipping,
            deliverOrderNo: this.state.deliveryOrderNo,
            shipmentQuantity: this.state.shipmentQuantity,
            shipmentSent: true,
            shipmentCompleted: true,
            shipped: true,
            receivedShipment: false,
            receivedOrder: false
        };
        this.props.createShippingDataByMaterialID(materialUrl, data);
        this.props.createShippingDataByShipmentID(shipmentUrl, data);
        setTimeout(
            function () {
                if (this.props.data.sarReducer.createShippingDataByMaterialIDSuccess === true &&
                    this.props.data.sarReducer.createShippingDataByShipmentIDSuccess === true) {
                    this.setState({
                        showProgressLogo: false,
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Shipping Successful!',
                            open: true,
                            sbColor: '#23CE6B'
                        },
                        openDialog: false,
                        materialID: '',
                        errorText1: 'This is a required field.',
                        shipmentID: '',
                        addressLine1: '',
                        addressLine2: '',
                        city: '',
                        addressState: '',
                        postalCode: '',
                        country: '',
                        ipAddress: '',
                        errorText2: 'This is a required field.',
                        ipAddressLength: '',
                        counter: '001',
                        manualShipping: '',
                        manualShipping2: 'NO',
                        deliveryOrderNo: '',
                        shipmentQuantity: ''
                    });
                } else {
                    this.setState({
                        showProgressLogo: false,
                        showProgressLogoDialog: false,
                        snackbar: {
                            autoHideDuration: 2000,
                            message: 'Shipping Error! Please try again.',
                            open: true,
                            sbColor: 'red'
                        }
                    })
                }
            }
                .bind(this),
            3000
        );
        /* let shipmentID = this.state.shipmentID;
        let newShipmentID = this.state.shipmentID;
        let countString = '';
        let countInteger = '';
        countInteger = parseInt(shipmentID.substring(7, 10))+1;
        countString = countInteger.toString().padStart(3,'0');
        newShipmentID = shipmentID.substring(0, 6) + '-' + countString;
        this.setState({shipmentID: newShipmentID}); */
    };

    handleDialogClose = () => {
        this.setState({
            showProgressLogo: false,
            openDialog: false,
            showProgressLogoDialog: false,
            doNotAskAgain2: false
        });
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

        const addCircleIconStyle = {
            color: "black",
            transform: "scale(1.8)"
        };

        const deleteIconStyle = {
            color: "black",
            transform: "scale(1.6)"
        };

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

        const formComplete = this.state.materialID && this.state.address;

        const rows = [
            createData('Material ID', this.state.materialID),
            createData('Shipment ID', this.state.shipmentID),
            createData('Address', this.state.address),
            createData('Manual Shipping', this.state.manualShipping2),
            createData('Shipment Completed', this.state.shipmentCompleted2),
            createData('Material ID/Quantity', this.state.materialIDList)
        ];

        let counter = 0;

        function createData(info1, info2) {
            counter += 1;
            return {id: counter, info1, info2};
        }

        function createTableContent() {
            let tableContent = [
                createData('Material ID', this.state.materialID),
                createData('Shipment ID', this.state.shipmentID),
                createData('Address', this.state.address),
                createData('Manual Shipping', this.state.manualShipping2),
                createData('Shipment Completed', this.state.shipmentCompleted2),
                createData('', '')
            ];
            for (let i = 0; i < this.state.materialIDList.length; i++) {
                tableContent.push(createData('Material ID/Quantity', this.state.materialIDList[i] + '/' + this.state.quantityList[i]));
            }
            return tableContent;
        }

        return (
            <form onSubmit={this.handleConfirmation}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt=""/>
                        </div> : ""}
                </div>
                <div style={{padding: 24}}>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{"textAlign": "left"}}>Material ID</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{"textAlign": "left"}}>Shipment ID</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.materialID}
                                onChange={this.handleChange}
                                type="text"
                                name="materialID"
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                                errorText={this.state.errorText1}
                                errorStyle={{"float": "left", "textAlign": "left"}}
                                onBlur={this.handleMaterialIDChange}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.shipmentID}
                                onChange={this.handleChange}
                                type="text"
                                name="shipmentID"
                                style={{"float": "left", "textAlign": "left"}}
                                hintText=""
                            />
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormLabel style={{"textAlign": "left"}}>Address</FormLabel>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <FormControl fullWidth={true}>
                                <Select value={this.state.address} onChange={this.handleChange}
                                        input={<Input name="address" style={{"textAlign": "left"}}/>}
                                        displayEmpty>
                                    <MenuItem
                                        value={this.state.addressMenuItems}>{this.state.addressMenuItems}</MenuItem>
                                </Select>
                            </FormControl>
                            <FormHelperText style={{"color": "red"}}>{this.state.errorText2}</FormHelperText>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="manualShipping"
                                            color="default"
                                        />
                                    }
                                    label="Manual Shipping"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheckboxChange}
                                            name="shipmentCompleted"
                                            color="default"
                                        />
                                    }
                                    label="Shipment Completed"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <br/><br/>
                    <Divider style={{"height": "3px", "backgroundColor": "red"}}/>
                    <br/><br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{"textAlign": "left"}}>Material ID</FormLabel>
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <FormLabel style={{"textAlign": "left"}}>Quantity</FormLabel>
                        </Grid>
                    </Grid>
                    {this.state.materialIDQuantityList.map((materialIDQuantityList, index) => (
                        <span key={index}>
                            <Grid container spacing={24}>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type="text"
                                        style={{"float": "left", "textAlign": "left"}}
                                        name="materialIDList"
                                        onChange={this.handleText(index)}
                                        hintText=""
                                        value={materialIDQuantityList.materialID}
                                    />
                                </Grid>
                                <Grid container item xs={6} sm={3}>
                                    <TextField
                                        type="text"
                                        style={{"float": "left", "textAlign": "left"}}
                                        name="quantityList"
                                        onChange={this.handleText(index)}
                                        hintText=""
                                        value={materialIDQuantityList.quantity}
                                    />
                                </Grid>
                                {index === 0 ?
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleAddition}>
                                            <AddCircleIcon style={addCircleIconStyle}/>
                                        </IconButton>
                                    </Grid>
                                    :
                                    <Grid container item xs={6} sm={3}>
                                        <IconButton onClick={this.handleDeletion(index)}>
                                            <DeleteIcon style={deleteIconStyle}/>
                                        </IconButton>
                                    </Grid>
                                }
                            </Grid>
                        </span>
                    ))}


                    <br/><br/>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                        fullWidth={true} disabled={!formComplete}>
                                    Send Shipment
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose} autoScrollBodyContent={true}>
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
                                        </Table>
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
                                    <Button type="submit" value="Print" variant="flat" color="primary" fullWidth={true}
                                            onClick={this.handlePrint} disabled>
                                        Print...
                                    </Button>
                                </MuiThemeProvider>
                            </Grid>
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
        data: state
    };
};

// This way, we can call our action creator by doing this.props.fetchData(url);
const mapDispatchToProps = (dispatch) => {
    return {
        getBillOfMaterialsByMaterialID: (url) => dispatch(getBillOfMaterialsByMaterialID(url)),
        createShippingDataByMaterialID: (url, body) => dispatch(createShippingDataByMaterialID(url, body)),
        createShippingDataByShipmentID: (url, body) => dispatch(createShippingDataByShipmentID(url, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingView);
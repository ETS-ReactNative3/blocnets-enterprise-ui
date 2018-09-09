import React, { Component } from 'react';
import blocnetsLogo from "../../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import TextField from 'material-ui/TextField';
import Typography from "@material-ui/core/Typography/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Snackbar from 'material-ui/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import {
    createProductionOrderByProdOrderNo
}
    from '../../../redux/actions/production.actions';


const addCircleIconStyle = {
    color: "black",
    transform: "scale(1.8)"
}

const deleteIconStyle = {
    color: "black",
    transform: "scale(1.6)"
}

class StartProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorText: 'This is a required field.',
            errorText1: 'This is a required field.',
            productionOrderNo: '',
            materialID: [
                {
                    materialID: '',
                    parent: '',
                    children: []
                },
                {
                    materialID: '',
                    parent: '',
                    children: []
                }
            ],
            showProgressLogo: false,
            received: false,
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        };
    }

    handleText = i => e => {
        let materialID = [...this.state.materialID]
        materialID[i] = e.target.value
        console.log(materialID);
        this.setState({
            materialID
        })
    };

    handleDeletion = i => e => {
        e.preventDefault()
        let materialID = [
            ...this.state.materialID.slice(1, i),
            ...this.state.materialID.slice(i + 1)
        ]
        console.log(materialID);
        this.setState({
            materialID
        })
    };

    handleAddition = e => {
        e.preventDefault()
        let materialID = this.state.materialID.concat([''])
        console.log(materialID);
        this.setState({
            materialID
        })
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if ([event.target.name].toString() === 'productionOrderNo' && event.target.value !== '') {
            this.setState({ errorText: '' });
        } else if ([event.target.name].toString() === 'productionOrderNo' && !event.target.value) {
            this.setState({ errorText: 'This is a required field.' });
        }
        if ([event.target.name].toString() === 'staticMaterialID' && event.target.value !== '') {
            this.setState({ errorText1: '' });
        } else if ([event.target.name].toString() === 'staticMaterialID' && !event.target.value) {
            this.setState({ errorText1: 'This is a required field.' });
        }
    };

    handleStartProduction = (event) => {

        let data = {
            materialID: "string",
            oldMaterialID: this.state.materialID,
            ipAddress: '',
            oldProdOrders: [],
            productionOrderNo: '',
            receivedOrder: '',
            completedProductionOrder: false,
            productionQuantity: ''
        }

        this.props.createProductionOrderByProdOrderNo(this.state.productionOrderNo, data);

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

        const formComplete = this.state.productionOrderNo && this.state.materialID > 1;

        return (
            <form onSubmit={this.handleStartProduction}>
                <div>
                    {this.state.showProgressLogo ?
                        <div className="overlay"><img src={blocnetsLogo} className="App-logo-progress" alt="" />
                        </div> : ""}
                </div>
                <div style={{ padding: 24 }}>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                value={this.state.productionOrderNo}
                                onChange={this.handleChange}
                                type="text"
                                name="productionOrderNo"
                                floatingLabelText="Production Order No."
                                floatingLabelFixed={true}
                                style={{ "float": "left" }}
                                hintText=""
                                errorText={this.state.errorText}
                                errorStyle={{ "float": "left" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <TextField
                                type="text"
                                name="staticMaterialID"
                                floatingLabelText="Material ID"
                                style={{ "float": "left" }}
                                hintText=""
                                onChange={this.handleChange}
                                value={this.state.materialID[0].materialID}
                            />
                            <IconButton onClick={this.handleAddition}>
                                <AddCircleIcon style={addCircleIconStyle} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {this.state.materialID.map((materialID, index) => (
                        <span key={index}>
                            <Grid container spacing={24}>
                                <Grid container item xs={12}>
                                    <TextField
                                        type="text"
                                        name="materialID"
                                        onChange={this.handleText(index)}
                                        value={materialID}
                                    />
                                    <IconButton onClick={this.handleDeletion(index)}>
                                        <DeleteIcon style={deleteIconStyle} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </span>
                    ))}
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonThemeYellow}>
                                <Button type="submit" value="Submit" variant="contained" color="primary"
                                    fullWidth={true} disabled={!formComplete}>
                                    Start Production
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createProductionOrderByProdOrderNo: (url, body) => dispatch(createProductionOrderByProdOrderNo(url, body)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartProduction);
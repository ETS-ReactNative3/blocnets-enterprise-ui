import React, { Component } from 'react';
import blocnetsLogo from "../../blocknetwhite-1.png";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Tree from 'react-d3-tree';
import { connect } from 'react-redux';
import { getShippingDataByMaterialID } from '../../redux/actions/shipping.and.receiving.actions';

class TrackerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            snackBar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
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

        const style = {
            margin: 12,
        };

        const actions = [
            <FlatButton
                label="Close"
                default={true}
                onClick={this.handleDialogClose}
            />,
        ];

        const myTreeData = [
            {
                name: 'heroku=1',
                attributes: {
                    timestamp: 'Apr 7 07:34:11',
                    block: 'Instantiated worldcrop',
                    Booty: 'Juicy af'
                },
                children: [
                    {
                        name: 'Entity_1',
                        attributes: {
                            timestamp: 'Apr 7 07: 34: 40 ',
                            block: 'Updated worldcorp',
                        },
                        children: [
                            {
                                name: 'Entity_3',
                                attributes: {
                                    timestamp: 'Apr 7 07:36:05',
                                    block: 'Finalized worldcorp',
                                }
                            },
                        ]
                    },
                    {
                        name: 'Entity_2',
                        attributes: {
                            timestamp: 'Apr 7 07: 34: 40 ',
                            block: 'Refactored worldcorp',
                        },
                        children: [
                            {
                                name: 'Entity_4',
                                attributes: {
                                    timestamp: 'Apr 7 07:36:05',
                                    block: 'Finalized worldcorp',
                                }
                            },
                        ]
                    },
                ],
            },
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
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.id} onChange={this.handleIdChange}
                                type="text"
                                floatingLabelText="Material ID"
                                floatingLabelFixed={true}
                                style={{ "float": "left", "marginLeft": "5%" }}
                            />
                        </Grid>
                        <Grid container item xs={6} sm={3}>
                            <TextField
                                value={this.state.id} onChange={this.handleIdChange}
                                type="text"
                                floatingLabelText="Production Order"
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
                <Dialog
                    title="Block Information "
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.handleClose}
                >
                    <Card>
                        <div>
                            <CardText>{JSON.stringify(this.props.data.sarReducer.getShippingDataByMaterialIDSuccess)}</CardText>
                        </div>
                    </Card>
                    < br />
                    <Toggle
                        toggled={this.state.legacy.expanded}
                        onToggle={this.handleLegacyToggle}
                        labelPosition="right"
                        label="Show eBOM example"
                    />
                    <Card expanded={this.state.legacy.expanded} onExpandChange={this.handleExpandChange}>
                        <CardTitle title="eBOM" subtitle="example" expandable={true} />
                        <CardText expandable={true}>
                            <Tree data={myTreeData} />
                        </CardText>
                    </Card>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerView);
import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import Button from '@material-ui/core/Button';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from 'material-ui/Checkbox';
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import red from "@material-ui/core/colors/red";


class BillOfMaterialsReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    createData(info1, info2) {
        this.state.count += 1;
        return {id: this.state.count, info1, info2};
    }



    render() {

        const rows = [
            this.createData('Material ID', this.props.data.data.materialID)
        ];

        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        const button2Theme = createMuiTheme({
            palette: {
                primary: red
            },
        });


        return (

            <div style={{padding: 24}} >
                <Grid container>
                    <Grid container item xs={12}>
                        Please confirm information.
                    </Grid>
                </Grid>
                <br/>
                <Grid container justify="center">
                    <Grid container item xs={12}>
                        <Paper>
                            <Table>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    {row.info1}
                                                </TableCell>
                                                <TableCell>{row.info2}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid container item xs={12}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={this.state.doNotAskAgain} onChange={this.handleCheckboxChange}
                                        name="doNotAskAgain" color="default"
                                    />
                                }
                                label="Do not ask again."
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid container item xs={12} sm={3}>
                        <Grid container item xs>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="ok" value="OK" variant="contained" color="primary" fullWidth={true}
                                        onClick={this.handleSubmit}>
                                    OK
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                        <Grid container item xs>
                            <MuiThemeProvider theme={button2Theme}>
                                <Button type="cancel" value="Cancel" variant="contained" color="primary" fullWidth={true}
                                        onClick={this.handleDialogClose}>
                                    Cancel
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

BillOfMaterialsReview.propTypes = {
    classes: PropTypes.object,
};

export default BillOfMaterialsReview; 
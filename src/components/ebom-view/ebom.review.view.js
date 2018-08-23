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


class EBOMReview extends React.Component {

    render() {

        return (
            <Button>Test</Button>

        );
    }
}

EBOMReview.propTypes = {
    classes: PropTypes.object,
};

export default EBOMReview; 
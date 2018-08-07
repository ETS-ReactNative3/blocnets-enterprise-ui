import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import axios from 'axios';

function getSteps() {
  return ['Material Dimensions',
    'Material Handling Characteristics',
    'Material Other',
    'Material Quality Standards',
    'Supplier Customer Definition',
    'Supplier Payment Terms',
    'Supplier Order Quantities Controls',
    'Suppliers'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div>
          <TextField type="text" hintText="Enter volume amount " floatingLabelText="Volume" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter weight amount " floatingLabelText="Weight" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter length amount " floatingLabelText="Length" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter width amount " floatingLabelText="Width" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter heigth amount " floatingLabelText="Height" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
        </div>);
    case 1:
      return (
        <div>
          <TextField type="text" hintText="Enter the temperature limit" floatingLabelText="Temp Limits" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter shock/vibration limits" floatingLabelText="Shock/Vibration" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter altitude restrictions" floatingLabelText="Altitude Restrictions" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter compression restrictions" floatingLabelText="Compression Restrictions" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <Checkbox label="Always Upright" />
        </div>);
    case 2:
      return (
        <div>
          <Checkbox label="METALLIC" />
          <Divider />
          <Checkbox label="HASMAT" />
          <Divider />
          <Checkbox label="MAGNETIC" />
        </div>
      );
    case 3:
      return (
        <div>
          <TextField type="text" hintText="Enter Length Tolerance" floatingLabelText="Length Tolerance" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter Round Tolerance" floatingLabelText="Round Tolerance" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter Non-skid Tolerance" floatingLabelText="Non-skid Tolerance" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
        </div>
      );
    case 4:
      return (
        <div>
          <TextField type="text" hintText="Enter SHIP TO street address" floatingLabelText="Street Address" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter SHIP TO IP address" floatingLabelText="IP Address" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter BILL TO street address" floatingLabelText="Street Address" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter BILL TO IP address" floatingLabelText="IP Address" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
        </div>
      );
    case 5:
      return (
        <div>
          <TextField type="text" hintText="Enter Payment Terms" floatingLabelText="Payment Terms" floatingLabelFixed={true} style={{ "float": "left", "marginLeft": "5%" }} />
        </div>);
    case 6:
      return (
        <div>
          <TextField type="text" hintText="Type here..." floatingLabelText="Minimum Economic Order Quantities" style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Type here..." floatingLabelText="Maximum Economic Order Quantities" style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Type here..." floatingLabelText="Maximum Economic Product Withdraw Rate" style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Type here..." floatingLabelText="Minimum Order Lead Times" style={{ "float": "left", "marginLeft": "5%" }} />
        </div>
      );
    case 7:
      return (
        <div>
          <TextField type="text" hintText="Enter IP Address / Street Address" floatingLabelText="IP Address/Street Address" style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter info here..." floatingLabelText="Material Supplied Per IP Address" style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter Supplier Payment Terms" floatingLabelText="Supplier Payment Terms" style={{ "float": "left", "marginLeft": "5%" }} />
          <Divider />
          <TextField type="text" hintText="Enter Supplier Order Policy" floatingLabelText="Supplier Order Policy" style={{ "float": "left", "marginLeft": "5%" }} />
        </div>
      );
    default:
      return 'Unknown step';
  }
}

class EBOMView extends React.Component {

  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const styles = theme => ({
      root: {
        width: '90%',
      },
      button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
      actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
      },
      resetContainer: {
        padding: theme.spacing.unit * 3,
      },
    });
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={styles.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <div>{getStepContent(index)}</div>
                  <div className={styles.actionsContainer}>
                    <div>
                      <FlatButton
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={styles.button}
                      >
                        Back
                      </FlatButton>
                      <FlatButton
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={styles.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </FlatButton>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={styles.resetContainer}>
            <div>All steps completed - you&quot;re finished</div>
            <FlatButton onClick={this.handleReset} className={styles.button}>
              Reset
            </FlatButton>
          </Paper>
        )}
      </div>
    );
  }
}

EBOMView.propTypes = {
  classes: PropTypes.object,
};

export default EBOMView;
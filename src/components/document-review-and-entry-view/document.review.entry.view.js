import React from 'react';
import PropTypes from 'prop-types';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


class DocumentReviewEntryView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showProgressLogo: false,
      materialID: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      addressState: '',
      postalCode: '',
      country: '',
      ipAddress: '',
      manualShipping: '',
      manualShipping2: 'NO',
      formComplete: '',
      openDialog: false,
      count: 0,
      doNotAskAgain: '',
      snackbar: {
        autoHideDuration: 2000,
        message: '',
        open: false,
        sbColor: 'black'
      },
    };
    this.serviceKey = {
      "type": "hyperledger-fabric",
      "channelId": "dev1c306705-f53f-4dbb-aa05-acc057c9bf1bcore",
      "serviceUrl": "https://hyperledger-fabric.cfapps.us10.hana.ondemand.com/api/v1",
      "documentationUrl": "https://api.sap.com/shell/discover/contentpackage/SCPBlockchainTechnologies/api/hyperledger",
      "oAuth": {
        "clientId": "sb-2f1dce41-c872-48e8-8ee3-6d0dd7e2c2c2!b520|na-3a01f1e2-bc33-4e12-86a2-ffffaea79918!b33",
        "clientSecret": "Yw+YrsdnLkUZbKtUbvf47Qk7pps=",
        "url": "https://ebom.authentication.us10.hana.ondemand.com"
      }
    };
  }

  createData(info1, info2) {
    this.state.count += 1;
    return { id: this.state.count, info1, info2 };
  }

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

    const rows = [
      this.createData('Material ID', this.state.materialID),
      this.createData('Address', this.state.addressLine1 + ' ' + this.state.addressLine2 + ' '
        + this.state.city + ' ' + this.state.addressState + ' ' + this.state.postalCode + ' '
        + this.state.country),
      this.createData('IP Address', this.state.ipAddress),
      this.createData('Manual Shipping', this.state.manualShipping2),
    ];

    return (
      <div className={styles.root}>
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
      </div>
    );
  }
}

DocumentReviewEntryView.propTypes = {
  classes: PropTypes.object,
};

export default DocumentReviewEntryView;
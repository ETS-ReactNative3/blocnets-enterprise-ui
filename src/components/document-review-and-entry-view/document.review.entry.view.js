import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';


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
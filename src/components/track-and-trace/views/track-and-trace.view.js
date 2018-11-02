import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import blocnetsLogo from '../../../blocknetwhite-1.png';
import Typography from '@material-ui/core/Typography/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TrackAndTraceSearchView from './track-and-trace-search.view';
import { connect } from 'react-redux';

class TrackAndTraceView extends Component {

    handleTTSearchData = (show, open, transactionCode, blockInformation, tatData, tree, shippingData, snackbar) => {
        if (show === 'catalogue'){
            this.props.viewHandler(show);
        } else if (transactionCode !== 'DRE02') {
            this.props.viewHandler(show, open, transactionCode, blockInformation, tatData, tree, shippingData, snackbar);
        }
    };

    render() {

        const theme = createMuiTheme({
            palette: {
                type: 'dark'
            },
        });

        return (
            <form>
                <div className='Module'>
                    <Grid container spacing={24}>
                        <Grid container item xs={12} justify='center'>
                            <img src={blocnetsLogo} className='TT-Logo' alt='' />
                        </Grid>
                    </Grid>
                    <br /><br />
                    <Grid container spacing={24}>
                        <Grid container item xs={12} justify='center'>
                            <Typography className='TT-Title'>
                                <span className='TT-Font-White'>BL</span>
                                <span className='TT-Font-Red'>O</span>
                                <span className='TT-Font-White'>CNETS</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <br /><br />
                    <MuiThemeProvider theme={theme}>
                        <Grid container spacing={24}>
                            <Grid container item xs>
                            </Grid>
                            <Grid container item xs={8} justify='center'>
                                <TrackAndTraceSearchView
                                    trackButtonFlag={true}
                                    viewHandler={this.handleTTSearchData} />
                            </Grid>
                            <Grid container item xs>
                            </Grid>
                        </Grid>
                    </MuiThemeProvider>
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

export default connect(mapStateToProps)(TrackAndTraceView);
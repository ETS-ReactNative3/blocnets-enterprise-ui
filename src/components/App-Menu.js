import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAlt from '@material-ui/icons/ListAlt';
import LocalShipping from '@material-ui/icons/LocalShipping';
import Domain from '@material-ui/icons/Domain';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import LocationOn from '@material-ui/icons/LocationOn';
import Send from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class AppMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: this.props.showApp,
            open: this.props.open,
            transactionCode: this.props.transactionCode,
            userName: this.props.userName,
            badgeContent: 0,
            tatData: [],
            tree: [],
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            }
        };
    }

    showBillOfMaterials = () => {
        this.props.viewHandler('showBillOfMaterialsId');
    };

    showShippingView = () => {
        this.props.viewHandler('showShippingViewId');
    };

    showReceivingView = () => {
        this.props.viewHandler('showReceivingViewId');
    };

    showStartProductionView = () => {
        this.props.viewHandler('showStartProductionViewId');
    };

    showCompleteProductionView = () => {
        this.props.viewHandler('showCompleteProductionViewId');
    };

    showTrackAndTraceView = () => {
        this.props.viewHandler('showTrackAndTraceViewId');
    };

    showSendDocumentView = () => {
        this.props.viewHandler('showSendDocumentViewId');
    };

    showSaveDocumentView = () => {
        this.props.viewHandler('showSaveDocumentViewId');
    };

    showMapContainer = () => {
        this.props.viewHandler('showMapContainerId');
    };

    render() {

        return (
            <div>


                <MenuItem id='showBillOfMaterialsId' onClick={this.showBillOfMaterials}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <ListAlt />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Master Material Data' />
                </MenuItem>
                <hr />
                <MenuItem id='showShippingViewId' onClick={this.showShippingView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <LocalShipping />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Shipping' />
                </MenuItem>
                <hr />
                <MenuItem id='showReceivingViewId' onClick={this.showReceivingView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <Domain />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Receiving' />
                </MenuItem>
                <hr />
                <MenuItem id='showStartProductionViewId' onClick={this.showStartProductionView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <PlayArrow />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Start Production Tracking' />
                </MenuItem>
                <hr />
                <MenuItem id='showCompleteProductionViewId' onClick={this.showCompleteProductionView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <Stop />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Stop Production Tracking' />
                </MenuItem>
                <hr />
                <MenuItem id='showTrackAndTraceViewId' onClick={this.showTrackAndTraceView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Track and Trace' />
                </MenuItem>
                <hr />
                <MenuItem id='showSendDocumentViewId' onClick={this.showSendDocumentView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <Send />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Send a Document' />
                </MenuItem>
                <hr />
                <MenuItem id='showSaveDocumentViewId' onClick={this.showSaveDocumentView}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Save a Document' />
                </MenuItem>
                <hr />
                <MenuItem id='showMapContainerId' onClick={this.showMapContainer}
                          style={{ 'textAlign': 'left' }}>
                    <ListItemIcon style={{ 'verticalAlign': 'middle' }}>
                        <LocationOn />
                    </ListItemIcon>
                    <ListItemText style={{ 'display': 'inline-block', 'verticalAlign': 'middle' }}
                                  primary='Geo Mapping' />
                </MenuItem>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};


export default connect(mapStateToProps)(AppMenu);

import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DomainIcon from '@material-ui/icons/Domain';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
/* import LocationOnIcon from '@material-ui/icons/LocationOn'; */

class AppMenu extends Component {

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

    showReadDocumentView = () => {
        this.props.viewHandler('showReadDocumentViewId');
    };

    showMapContainerView = () => {
        this.props.viewHandler('showMapContainerViewId');
    };

    render() {

        return (

            <div>
                <MenuItem className='Mobile-MenuItem' id='showBillOfMaterialsId' onClick={this.showBillOfMaterials}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Master Material Data' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showShippingViewId' onClick={this.showShippingView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <LocalShippingIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Shipping' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showReceivingViewId' onClick={this.showReceivingView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <DomainIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Receiving' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showStartProductionViewId'
                          onClick={this.showStartProductionView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <PlayArrowIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Start Production Tracking' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showCompleteProductionViewId'
                          onClick={this.showCompleteProductionView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <StopIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Stop Production Tracking' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showTrackAndTraceViewId' onClick={this.showTrackAndTraceView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Track and Trace' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showSendDocumentViewId' onClick={this.showSendDocumentView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Send a Document' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showSaveDocumentViewId' onClick={this.showSaveDocumentView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Save a Document' />
                </MenuItem>
                <hr />
                <MenuItem className='Mobile-MenuItem' id='showReadDocumentViewId' onClick={this.showReadDocumentView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='View a Document' />
                </MenuItem>
                <hr />
                {/* <MenuItem className='Mobile-MenuItem' id='showMapContainerViewId' onClick={this.showMapContainerView}>
                    <ListItemIcon className='Mobile-ListItemIcon'>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText className='Mobile-ListItemText' primary='Geo Mapping' />
                </MenuItem> */}
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
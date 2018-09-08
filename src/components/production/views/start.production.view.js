import React, { Component } from 'react';

class StartProduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* showProgressLogo: false,
            materialID: '',
            ipAddress: '',
            openMaterialIDDialog: false,
            openShipmentIDDialog: false,
            showProgressLogoDialog: false,
            received: false, */
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        };
    }

    render() {
        return <p>Start Production View</p>
    }

}

export default StartProduction;
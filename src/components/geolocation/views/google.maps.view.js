import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';

let counter = 0;

function createData(info1, info2, info3, info4) {
    counter += 1;
    return { id: counter, info1, info2, info3, info4 };
}

let rows = [];

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        };
    }

    onMarkerClick = (props, marker, event) => {
        rows = [];
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
        if (this.state.selectedPlace.name === 'AVC Corporation') {
            rows = [
                createData('NHA', 'Part No.', 'Part Name', 'Supplier'),
                createData('13497953-049', '13305989-001', 'Rubber O Ring', 'PCI USA LLC 5 Old Train Rd Etters PA 17319'),
                createData('13497953-049', '13307451-005', 'Label Gummed', 'Vishad Jones 1122 23rd St Columbus NE 68601'),
                createData('13497953-049', '13307463-004', 'Lidar Shipping Label', 'Vishad Intertech 63 Lancaster Ave Malvern PA 19355'),
                createData('13497953-049', '13307481-004', 'Desiccator', 'Lockedscale Semiconductor 2100 Elliot Rd  Tempe AZ 85284'),
                createData('13497953-049', '13312741-601', 'Lower Support Cross Bar', 'Dico Componets 143 Sparks Ave Pelham NY 10803'),
                createData('13497953-049', '13312746-001', 'Shoulder Washer', 'National Aerospace Corp 1000 Wilson Blvd Arlington VA 22209'),
                createData('13497953-049', '13312755-001', 'Battery Box Cover Assembly', 'Silidonx Incorporated 2201 Laurel Wood Santa Clara CA 95134'),
                createData('13497953-049', '13312768-002', 'Lower Absorber Spacer', 'Silidonx Incorporated 2201 Laurel Wood Santa Clara CA 95135'),
                createData('13497953-049', '13497954-049', 'Basic Sight Assembly', 'Silidonx Incorporated 2201 Laurel Wood Santa Clara CA 95136'),
                createData('13497953-049', '13305457-006', 'Dewar Detector Assembly', 'Silidonx Incorporated 2201 Laurel Wood Santa Clara CA 95137'),
                createData('13497953-049', '13305464-001', 'EMI Environmental Protective Cover', 'Silidonx Incorporated 2201 Laurel Wood Santa Clara CA 95138'),
                createData('13497953-049', '13305465-001', 'Number 1 Window', 'Raythoid Corp 151 Hernando Rd Tucson AZ 85756'),
                createData('13497953-049', '133305568-509', 'Scanner Assembly', 'Keem Electronics Corp  855 Keem Way  Simpson SX 29681'),
                createData('13497953-049', '13305607-002', 'Pneumatic Valve', 'BVX Corp 888 17th St Myrtle Beach SC 29577'),
                createData('13497953-049', '13305623-001', 'Number 2 Window', 'Presidio Components 7166 Construction Dr San Diego CA 92121'),
                createData('13497953-049', '13305639-003', 'Visible Optics Assembly Lens Cap', 'Parker Hannifin Corp  77 Dragon Ct Woburn MA 01888'),
                createData('13497953-049', '13305679-002', 'Elapsed Time Meter Gasket', 'Dilind  210 Outoflogic Dr  San Jose CA 95124'),
                createData('13497953-049', '13305771-001', 'Visible Optics Baffle', 'Ground Interconnect  350 Ground Dr  Georgetown TX 78626'),
                createData('13497953-049', '13307068-009', 'Adjustment Detector Dewar Control Plate', 'Tideo Electronics 280 Fulling Mill Dr Middletown PA 17057')
            ];
        }
        if (this.state.selectedPlace.name === 'Alterd Corporation') {
            rows = [
                createData('NHA', 'Part No.', 'Part Name', 'Supplier'),
                createData('13305465-001', '13305441-001', 'Blank Window', 'Integrated Device San Jose CA 95151')
            ];
        }
        if (this.state.selectedPlace.name === 'Analog Components') {
            rows = [
                createData('NHA', 'Part No.', 'Part Name', 'Supplier'),
                createData('133305568-509', '13305569-009', 'Scanner Motor Mount', 'Least Integrated Products 160 Rio Robles San Jose CA 95134'),
                createData('133305568-509', '13305669-002', 'Scanning Mirror', 'Cypress Corporation 198 Champion Ct San Jose CA 95134'),
                createData('133305568-509', '13305921-001', 'Mount Clamp', 'Raythoid Corp 20 El Segundio Dr El Segundio CA 90245'),
                createData('133305568-509', '13307180-005', 'Scanner Stop', 'Sammy Inc  520 Park East Blvd New Albany 47150'),
                createData('133305568-509', '13307182-501', 'Motor / Resolver Assembly', 'Ppc International 30303 Lakeside Dr Bannock IL 60015'),

            ];
        }
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                activeMarker: null,
                selectedPlace: {},
                showingInfoWindow: false
            })
        }
    };

    handleDialogClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                activeMarker: null,
                selectedPlace: {},
                showingInfoWindow: false
            })
        }
    };

    render() {

        return (
            <div>
                <Grid container spacing={24}>
                    <div className='map-frame'>
                        <Map className='map-container' google={this.props.google} zoom={5}
                             initialCenter={{ lat: 39.0292, lng: -96.7892 }}>
                            <Marker name={'AVC Corporation'} onClick={this.onMarkerClick}
                                    partNameNHA={'LIDAR Radar'}
                                    position={{ lat: 33.680130, lng: -78.909200 }} />
                            <Marker name={'Alterd Corporation'} onClick={this.onMarkerClick}
                                    partNameNHA={'Number 1 Window'}
                                    position={{ lat: 37.401360, lng: -121.935490 }} />
                            <Marker name={'Analog Components'} onClick={this.onMarkerClick}
                                    partNameNHA={'Scanner Assembly'}
                                    position={{ lat: 42.210480, lng: -71.180550 }} />
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}>
                                <div>
                                    <h1>{this.state.selectedPlace.name}</h1>
                                    Part Name NHA: {this.state.selectedPlace.partNameNHA}
                                </div>
                            </InfoWindow>
                        </Map>
                    </div>
                </Grid>
                <Dialog open={this.state.showingInfoWindow} onClose={this.handleDialogClose}
                        autoScrollBodyContent={true}>
                    <div className='Module'>
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <i className='material-icons' style={{ 'cursor': 'pointer' }}
                                   onClick={this.handleDialogClose}>close</i>
                            </Grid>
                        </Grid>
                        <Grid container justify='flex-start'>
                            <Grid item>
                                <h1>{this.state.selectedPlace.name}</h1>
                                Part Name NHA: {this.state.selectedPlace.partNameNHA}
                            </Grid>
                        </Grid>
                    </div>
                    <div className='Module'>
                        <Grid container justify='center'>
                            <Grid item xs={12}>
                                <Paper className='Module-Paper'>
                                    <div className='Module-Paper-Div'>
                                        <Table className='Module-Table'>
                                            <TableBody className='Module-TableBody'>
                                                {rows.map(row => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            <TableCell>{row.info1}</TableCell>
                                                            <TableCell>{row.info2}</TableCell>
                                                            <TableCell>{row.info3}</TableCell>
                                                            <TableCell>{row.info4}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default GoogleApiWrapper({ apiKey: ('AIzaSyAl04D9xFHXdrMejHnTBqh4wwYhT0FJQ-8') })(MapContainer)
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };


  render() {
    return (
      <Grid container spacing={24}>
        <div className='map-frame' >
          <Map google={this.props.google} zoom={14} className='map-container'>
            <Marker onClick={this.onMarkerClick} name={'Current location'} position={{ lat: 37.778519, lng: -122.405640 }} />
          </Map>
        </div>
      </Grid>
    );
  }
}

export default GoogleApiWrapper({ apiKey: ('AIzaSyAl04D9xFHXdrMejHnTBqh4wwYhT0FJQ-8') })(MapContainer)
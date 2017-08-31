/* global google */
import _ from "lodash"
import React, { Component } from "react"
import Helmet from "react-helmet"
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { connect } from 'react-redux'

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: 4.700851, lng: -74.121095 }}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

class MapComponent extends Component {
  constructor() {
    super()
    this.state = {
      markers: [],
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  render() {
    if (this.props.service) {
      const nextMarkers = [
        {
          position: this.props.service.routes[0].legs[0].end_location,
          defaultAnimation: 2,
          key: 1, // Add a key property for: http://fb.me/react-warning-keys
        },
        {
          position: this.props.service.routes[0].legs[0].start_location,
          defaultAnimation: 2,
          key: 0, // Add a key property for: http://fb.me/react-warning-keys
        },
      ];
      this.setState({markers: nextMarkers})
    }
    return (
      <div className="map" style={{height: `100%`}}>
        <Helmet
          title="Mapa de servicio"
        />
        <Map
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}

const mapStateProps = state => {
  return {service: state.service}
}

export default connect(mapStateProps)(MapComponent)

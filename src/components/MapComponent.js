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
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
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
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  }
  

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    if (this.props.service) {
      alert("la distancia entre los puntos es: " + this.props.service.routes[0].legs[0].distance.text)
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
      this.state.markers = nextMarkers
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
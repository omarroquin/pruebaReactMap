import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import MapForm from './MapForm'
import '../styles/Map.css'

class Map extends Component {
  render() {
    if (this.props.user) {
      return <Redirect to='/login'/>
    }
    return (
      <div className="map-container">
        <MapForm />
      </div>
    );
  }
}

const mapStateProps = state => {
  return {user: state.user}
}

export default connect(mapStateProps)(Map)

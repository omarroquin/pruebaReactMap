import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import $ from 'jquery'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'
import * as actions from '../actions'

class MapForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      start: '',
      end: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    var i = 0;
    if (!this.state.description.length) {
      $("#description").addClass("has-error")
    } else {
      if ($("#description").hasClass("has-error")) {
        $("#description").removeClass("has-error")
      }
      i++
    }
    if (!this.state.start.length) {
      $("#start").addClass("has-error")
    } else {
      if ($("#start").hasClass("has-error")) {
        $("#start").removeClass("has-error")
      }
      i++
    }
    if (!this.state.end.length) {
      $("#end").addClass("has-error")
    } else {
      if ($("#end").hasClass("has-error")) {
        $("#end").removeClass("has-error")
      }
      i++
    }
    if (i === 3) {
        $.ajax({
          url: "http://maps.googleapis.com/maps/api/directions/json?origin=" + this.state.start.replace("#", "") + ",Bogota,Colombia&destination=" + this.state.end.replace("#", "") + ",Bogota,Colombia",
          type: "GET",
          success: (response) => {
            $("#distance").removeClass("hide")
            this.props.servicio(response)
          }
        });
    }
  }

  render() {
    if (this.props.service) {
      this.distance = this.props.service.routes[0].legs[0].distance.text
    } else {
      this.distance = ""
    }
    return (
      <div>
        <form className="map-form" onSubmit={this.onSubmit}>
          <h3>Detalles del servicio</h3>
          <div id="description" className="form-group">
            <label className="control-label" htmlFor="description">Descripción:</label>
            <Field
              onChange={this.onChange}
              value={this.state.description}
              name="description"
              component="input"
              type="text"
              className="form-control"
              />
          </div>
          <div id="start" className="form-group">
            <label className="control-label" htmlFor="start">Dirección de origen:</label>
            <Field
              onChange={this.onChange}
              value={this.state.start}
              name="start"
              component="input"
              type="text"
              className="form-control"
              />
          </div>
          <div id="end" className="form-group">
            <label className="control-label" htmlFor="end">Dirección de destino:</label>
            <Field
              onChange={this.onChange}
              value={this.state.end}
              name="end"
              component="input"
              type="end"
              className="form-control"
              />
          </div>
          <span id="text-error-map" className="hide">El correo o la contraseña son incorrectos.</span>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">
              Iniciar Sesión
            </button>
          </div>
          <div id="distance" className="hide">
            La distancia entre los dos puntos es: {this.distance}
          </div>
        </form>
        <MapComponent />
      </div>
    );
  }
}

// Decorate the form component
MapForm = reduxForm({
  form: 'map' // a unique name for this form
})(MapForm);

const mapStateProps = state => {
  return {service: state.service}
}

export default connect(mapStateProps, actions)(MapForm)

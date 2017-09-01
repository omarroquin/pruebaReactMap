import React from 'react'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'
import * as actions from '../actions'

class MapForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			description: '',
			start: '',
			end: '',
			markers: []
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		var i = 0
		let description_element = document.getElementById('description')
		if (!this.state.description.length) {
			if (description_element.className.indexOf('has-error') === -1)
				description_element.className += ' has-error'

		} else {
			description_element.classList.remove('has-error')
			i++
		}

		let start_element = document.getElementById('start')
		if (!this.state.start.length) {
			if (start_element.className.indexOf('has-error') === -1)
				start_element.className += ' has-error'

		} else {
			start_element.classList.remove('has-error')
			i++
		}

		let end_element = document.getElementById('end')
		if (!this.state.end.length) {
			if (end_element.className.indexOf('has-error') === -1)
				end_element.className += ' has-error'
		} else {
			end_element.classList.remove('has-error')
			i++
		}
		if (i === 3) {
			axios.get('http://maps.googleapis.com/maps/api/directions/json?origin=' + this.state.start.replace('#', '') + ',Bogota,Colombia&destination=' + this.state.end.replace('#', '') + ',Bogota,Colombia')
				.then((response) => {
					let distance_element = document.getElementById('distance')
					distance_element.classList.remove('hide')
					this.props.servicio(response.data)

					let markers = [response.data.routes[0].legs[0].start_location]
					markers.push(response.data.routes[0].legs[0].end_location)
					this.setState({markers})
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}

	render() {
		if (this.props.service) {
			this.distance = this.props.service.routes[0].legs[0].distance.text
		} else {
			this.distance = ''
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
              Calcular distancia
						</button>
					</div>
					<div id="distance" className="hide">
            La distancia entre los dos puntos es: {this.distance}
					</div>
				</form>
				<MapComponent markers={this.state.markers} />
			</div>
		)
	}
}

// Decorate the form component
MapForm = reduxForm({
	form: 'map' // a unique name for this form
})(MapForm)

const mapStateProps = state => {
	return {service: state.service}
}

export default connect(mapStateProps, actions)(MapForm)

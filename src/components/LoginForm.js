import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import Users from '../data/users'
import { connect } from 'react-redux'
import * as actions from '../actions'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		if (!this.state.email.length) {
			let email_element = document.getElementById('email')
			if (email_element.className.indexOf('has-error') === -1)
				email_element.className += ' has-error'
      
			let password_element = document.getElementById('password')
			if (!this.state.password.length) {
				if (password_element.className.indexOf('has-error') === -1)
					password_element.className += ' has-error'
			}

			password_element.classList.remove('has-error')

		} else if (!this.state.password.length) {
			let email_element = document.getElementById('email')
			email_element.classList.remove('has-error')

			let password_element = document.getElementById('password')
			if (password_element.className.indexOf('has-error') === -1)
				password_element.className += ' has-error'

		} else {
			let email_element = document.getElementById('email')
			email_element.classList.remove('has-error')

			let password_element = document.getElementById('password')
			password_element.classList.remove('has-error')

			this.loged = false
			for (var i in Users) {
				if ((Users[i].email === this.state.email) && (Users[i].password === this.state.password)) {
					this.loged = true
				}
			}
			if (this.loged) {
				let text_error_element = document.getElementById('text-error')
				if (text_error_element.className.indexOf('hide') === -1) {
					text_error_element.className += ' hide'
				}
				this.props.login(this.state.email)
			} else {
				let text_error_element = document.getElementById('text-error')
				text_error_element.classList.replace('text-error')
			}
		}
	}

	render() {
		if (this.props.user) {
			return <Redirect to='/map'/>
		}
		return (
			<form onSubmit={this.onSubmit}>
				<h2>Inicio de Sesión</h2>
				<br />
				<div id="email" className="form-group">
					<label className="control-label" htmlFor="email">Correo:</label>
					<Field
						onChange={this.onChange}
						value={this.state.email}
						name="email"
						component="input"
						type="email"
						className="form-control"
					/>
				</div>
				<div id="password" className="form-group">
					<label className="control-label" htmlFor="email">Contraseña:</label>
					<Field
						onChange={this.onChange}
						value={this.state.password}
						name="password"
						component="input"
						type="password"
						className="form-control"
					/>
				</div>
				<span id="text-error" className="hide">El correo o la contraseña son incorrectos.</span>
				<div className="form-group">
					<button type="submit" className="btn btn-primary btn-lg">
            Iniciar Sesión
					</button>
				</div>
			</form>
		)
	}
}

// Decorate the form component
LoginForm = reduxForm({
	form: 'login' // a unique name for this form
})(LoginForm)

const mapStateProps = state => {
	return {user: state.user}
}

export default connect(mapStateProps, actions)(LoginForm)

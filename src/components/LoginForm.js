import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import Users from '../data/users'
import { connect } from 'react-redux'
import * as actions from '../actions'

class LoginForm extends Component {
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
    e.preventDefault();
    if (!this.state.email.length) {
      $("#email").addClass("has-error")
      if (!this.state.password.length) {
        $("#password").addClass("has-error")
      } else if ($("#password").hasClass("has-error")) {
        $("#password").removeClass("has-error")
      }
    } else if (!this.state.password.length) {
      if ($("#email").hasClass("has-error")) {
        $("#email").removeClass("has-error")
      }
      $("#password").addClass("has-error")
    } else {
      if ($("#email").hasClass("has-error")) {
        $("#email").removeClass("has-error")
      }
      if ($("#password").hasClass("has-error")) {
        $("#password").removeClass("has-error")
      }
      this.loged = false
      for (var i in Users) {
        if ((Users[i].email === this.state.email) && (Users[i].password === this.state.password)) {
          this.loged = true
        }
      }
      if (this.loged) {
        if (!$("#text-error").hasClass("hide")) {
          $("#text-error").addClass("hide")
        }
        this.props.login(this.state.email)
      } else {
        $("#text-error").removeClass("hide")
      }
    }
  }

  render() {
    if (!this.props.user) {
      return <Redirect to='/map'/>
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Inicio de Sesión</h2>
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
    );
  }
}

// Decorate the form component
LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);

const mapStateProps = state => {
  return {user: state.user}
}

export default connect(mapStateProps, actions)(LoginForm)

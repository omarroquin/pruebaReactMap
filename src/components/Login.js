import React from 'react'
import '../styles/Login.css'
import LoginForm from './LoginForm'

class Login extends React.Component {
	render() {
		return (
			<div className="login-container">
				<LoginForm />
			</div>
		)
	}
}

export default Login

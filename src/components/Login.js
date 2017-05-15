import React, { Component } from 'react';
import '../styles/Login.css';
import LoginForm from './LoginForm';

class Login extends Component {
  render() {
    return (
      <div className="col-md-4 col-md-offset-4 col-xs-12">
        <LoginForm />
      </div>
    )
  }
};

export default Login;

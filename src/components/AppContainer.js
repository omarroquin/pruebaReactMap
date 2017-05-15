import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class AppContainer extends Component {
  render() {
    if (!this.props.user) {
      return <Redirect to='/login'/>
    }
    return <Redirect to='/map'/>
  }
}

const mapStateProps = state => {
  return {user: state.user}
}

export default connect(mapStateProps)(AppContainer)

import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class AppContainer extends React.Component {
	render() {
		if (!this.props.user) {
			return <Redirect to='/login'/>
		}
		return <Redirect to='/map'/>
	}
}

const mapStateProps = state => ({user: state.user})

export default connect(mapStateProps)(AppContainer)

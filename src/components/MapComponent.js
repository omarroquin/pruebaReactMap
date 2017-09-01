import React from 'react'
import { connect } from 'react-redux'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1Ijoib21hcnJvcXVpbiIsImEiOiJjajcwcTJma3gwMTEzMzNueHppbnZ2OWlkIn0.56awW3Y_LSZtwOO0XSDMGw'
})

class MapComponent extends React.Component {

	componentDidMount() {}

	render() {
		const listMarkers = this.props.markers.map((marker, index) => (
			<Marker key={index}
				coordinates={[marker.lng, marker.lat]}
				anchor="bottom">
				<img src="/marker.png" alt="marker" height="40px" />
			</Marker>
		))

		return (
			<div className="map">
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: '100%',
						width: '100%'
					}}
					center={[-74.047985, 4.683285]}>
					{listMarkers}
				</Map>
			</div>
		)
	}
}

const mapStateProps = state => {
	return {service: state.service}
}

export default connect(mapStateProps)(MapComponent)

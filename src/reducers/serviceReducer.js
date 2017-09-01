export default (state = null, action) => {
	switch (action.type) {
	case 'calculate-data':
		return action.payload
	default:
		return state
	}
}

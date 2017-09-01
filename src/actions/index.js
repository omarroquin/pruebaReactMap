export const login = ( email ) => {
	return {
		type: 'login-user',
		payload: email
	}
}

export const servicio = ( data ) => {
	return {
		type: 'calculate-data',
		payload: data
	}
}

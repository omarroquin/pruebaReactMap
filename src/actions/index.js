export const login = ( email ) => {
  return {
    type: 'login-user',
    payload: email
  }
}

export const servicio = ( data ) => {
    alert("la distancia entre los puntos es: " + data.routes[0].legs[0].distance.text)
  return {
    type: 'calculate-data',
    payload: data
  }
}

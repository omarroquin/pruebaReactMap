export default (state = null, action) => {
  switch (action.type) {
    case 'login-user':
      return action.payload
    default:
      return state
  }
}

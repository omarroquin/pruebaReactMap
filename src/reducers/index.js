import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './userReducer'
import serviceReducer from './serviceReducer'

const reducers = {
	// ... your other reducers here ...
	user: userReducer,
	service: serviceReducer,
	form: formReducer
}
const reducer = combineReducers(reducers)

export default reducer

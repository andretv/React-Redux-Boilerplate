import login from './login'
import { combineReducers } from 'redux'

// Constants
import { SET_TOKEN } from './../actions/token'

const token = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  login,
  token,
})
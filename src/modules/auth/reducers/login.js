import { combineReducers } from 'redux'
import { TOGGLE_REMEMBERME, SET_EMAIL_TO_REMEMBER } from 'modules/auth/actions/login'

const redirectToReferrer = (state = false, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const rememberMe = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_REMEMBERME:
      return !state
    default:
      return state
  }
}

const emailToRemember = (state = '', action) => {
  switch (action.type) {
    case SET_EMAIL_TO_REMEMBER:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  redirectToReferrer,
  rememberMe,
  emailToRemember,
})

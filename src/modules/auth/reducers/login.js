import { combineReducers } from 'redux';
import { TOGGLE_REMEMBERME, SET_EMAIL_TO_REMEMBER } from 'modules/auth/actions/login';

/**
 * @type {boolean}
 * @description If true, redirect user to attempted route path
 * after authenticating.
 */
const redirectToReferrer = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * @type {boolean}
 * @description If true, saves the last email loged into the system.
 */
const rememberMe = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_REMEMBERME:
      return !state;
    default:
      return state;
  }
};

/**
 * @type {string}
 * @description Last email loged into the system.
 */
const emailToRemember = (state = '', action) => {
  switch (action.type) {
    case SET_EMAIL_TO_REMEMBER:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  redirectToReferrer,
  rememberMe,
  emailToRemember,
});

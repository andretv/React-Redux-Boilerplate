import { combineReducers } from 'redux';
import login from './login';

/**
 * Constants
 */
import { SET_TOKEN } from '../actions/token';

/**
 * @type {string}
 * @description Token that is used in Authorization header.
 */
const token = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  login,
  token,
});

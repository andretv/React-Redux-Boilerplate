/**
 * Actions.
 */
// import { setToken } from 'modules/auth/actions/token';

/**
 * Api.
 */
// import api from './api';

/**
 * @function applyApiInterceptors
 * @param {any} store Application store.
 *
 * @description Apply interceptors for all api requests.
 */
const applyApiInterceptors = (store) => {

  /**
   * Intercept every api response checking if there's an authorization
   * token and sets it to the store.
   *
   * Exemple:
   */
  // api.interceptors.response.use((response) => {
  //   if (response.headers.authorization) {
  //     store.dispatch(setToken(response.headers.authorization));
  //   }

  //   return response;
  // });

  /**
   * Intercept every store changes reassigning default authorization
   * header for api requests.
   *
   * Exemple:
   */
  // store.subscribe(() => {
  //   const { auth: { token } } = store.getState();
  //   Object.assign(api.defaults, { headers: { authorization: token } });
  // });
};

export default applyApiInterceptors;

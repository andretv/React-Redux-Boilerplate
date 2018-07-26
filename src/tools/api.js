import axios from 'axios';
import { store } from 'src/root/root';

/**
 * Actions.
 */
import { setToken } from 'modules/auth/actions/token';

/**
 * @constant BASE_URL comes from webpack DefinePlugin.
 * @description Axios main api instance.
 */
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercept every api response checking if there's an authorization
 * token and sets it to the store.
 */
instance.interceptors.response.use(response => {

  if (response.headers.authorization) {
    store.dispatch(setToken(response.headers.authorization));
  }

  return response;
});

/**
 * Intercept every store changes reassigning default authorization
 * header for api requests.
 */
store.subscribe(() => {
  const { auth: { token } } = store.getState();
  Object.assign(instance.defaults, { headers: { authorization: token } });
});

export default instance;

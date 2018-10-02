import axios from 'axios';

/**
 * @description Axios main api instance.
 */
const api = axios.create({
  /* eslint no-undef: 0 */
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

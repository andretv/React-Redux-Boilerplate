import axios from 'axios'
import { store } from 'src/root/root'

// Actions
import { setToken } from 'modules/auth/actions/token'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(response => {

  if (response.headers.authorization) {
    store.dispatch(setToken(response.headers.authorization))
  }

  return response
})

store.subscribe(() => {
  const { auth: { token } } = store.getState()
  Object.assign(instance.defaults, { headers: { authorization: token } })
})

export default instance
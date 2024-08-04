import axios from 'axios'
import AuthSession from '../local/auth_session'
import Lib from '../../lib'

const Api = axios.create({
  baseURL: 'http://mwro-api-staging.inkwo.dev/'
})

Api.interceptors.request.use(async (config) => {
  const token = Lib.error_callback(await AuthSession.get(), console.error)

  if (token) config.headers.authorization = `${token}`

  return config
})

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      AuthSession.destroy()
    }

    return Promise.reject(error)
  }
)

export default Api

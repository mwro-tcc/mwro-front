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

export default Api

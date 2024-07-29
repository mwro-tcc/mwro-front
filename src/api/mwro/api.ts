import axios from 'axios'
import AuthSession from '../local/auth_session'
import Lib from '../../lib'

const Api = axios.create({
  baseURL: 'http://192.168.15.11:3040/'
})

Api.interceptors.request.use(async (config) => {
  const token = Lib.error_callback(await AuthSession.get(), console.error)
  //('AQUI', token)
  if (token) config.headers.authorization = `${token}`

  return config
})

export default Api

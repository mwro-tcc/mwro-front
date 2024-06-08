import axios, { AxiosInstance, AxiosResponse } from 'axios'
import AuthSession from '../local/auth_session'
import Lib from '../../lib'

const Api = axios.create({
    baseURL: 'http://192.168.0.85:3040',
})

Api.interceptors.request.use(async (config) => {
    const token = Lib.error_callback(
        await Lib.safe_call(AuthSession.get, []),
        console.error,
    )

    if (token) config.headers.authorization = `Bearer ${token}`

    return config
})

export default Api

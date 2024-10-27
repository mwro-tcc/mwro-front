import axios, { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Storage from 'storage'
import { router } from 'expo-router'

export const MWRO_API_BASE_URL = 'http://mwro-stg.inkwo.dev/'

const Api = axios.create({
  baseURL: MWRO_API_BASE_URL
})

Api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(Storage.AUTH_TOKEN)

  if (token) config.headers.authorization = `${token}`

  return config
})

Api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    if (error?.response?.status === 401) {
      AsyncStorage.removeItem(Storage.AUTH_TOKEN)
      router.replace('/(auth)/welcome')
    }

    console.error(error?.response?.data?.message ?? 'Server Error')
    return Promise.reject(error)
  }
)

export default Api

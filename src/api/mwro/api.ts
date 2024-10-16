import axios, { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Storage from 'storage'
import { router } from 'expo-router'
import { deeplog } from '@lib/deeplog'

const Api = axios.create({
  baseURL: 'http://mwro-stg.inkwo.dev/'
})

Api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(Storage.AUTH_TOKEN)

  if (token) config.headers.authorization = `${token}`

  return config
})

Api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      AsyncStorage.removeItem(Storage.AUTH_TOKEN)
      router.replace('/(auth)/welcome')
    }

    deeplog(error?.response)

    return Promise.reject(error)
  }
)

export default Api

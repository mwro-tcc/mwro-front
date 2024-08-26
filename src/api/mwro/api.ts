import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Storage from 'storage'
import { router } from 'expo-router'

const Api = axios.create({
  baseURL: 'http://mwro-api-staging.inkwo.dev/'
})

Api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(Storage.AUTH_TOKEN)

  if (token) config.headers.authorization = `${token}`

  return config
})

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      AsyncStorage.removeItem(Storage.AUTH_TOKEN)
      router.replace('/(auth)/welcome')
    }

    return Promise.reject(error)
  }
)

export default Api

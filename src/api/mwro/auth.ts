import { SignInForm, SignUpForm, User } from '../../types/user'
import Api from './api'
import Routes from './routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from '@lib/toast'
import { AxiosError, AxiosResponse } from 'axios'
import { create } from 'zustand'
import { router } from 'expo-router'
import Storage from 'storage'

type AuthResponse = {
  user: User
  token: string
}

class Auth {
  static async signUp(data: SignUpForm) {
    if (data.password !== data.confirm_password) {
      Toast.error('A senha utilizada deve ser a mesma nos dois campos')
      return
    }

    Api.post<AuthResponse>(Routes.Auth.sign_up, { ...data, phoneNumber: '12345678901234' })
      .then(Auth.onSuccess)
      .catch((error: AxiosError) => {
        Toast.error(error?.message)
      })
  }

  static async signIn(data: SignInForm) {
    Api.post<AuthResponse>(Routes.Auth.sign_in, data)
      .then(Auth.onSuccess)
      .catch((error: AxiosError) => {
        Toast.error(error?.message)
        console.log(error?.response)
      })
  }

  static async signOut() {
    await AsyncStorage.removeItem(Storage.AUTH_TOKEN).catch(console.error)
    router.replace('/(auth)/welcome')
  }

  static async getToken() {
    return AsyncStorage.getItem(Storage.AUTH_TOKEN).catch(console.error)
  }

  static onSuccess(response: AxiosResponse<AuthResponse>) {
    AsyncStorage.setItem(Storage.AUTH_TOKEN, response?.data?.token).catch(
      console.error
    )
    router.replace('/main')
  }
}

export default Auth

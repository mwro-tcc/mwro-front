import { SignInForm, SignUpForm, User } from '../../types/user'
import Api from './api'
import Routes from './routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from '@lib/toast'
import { AxiosError, AxiosResponse } from 'axios'
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

    const serializedData: Omit<SignUpForm, 'confirm_password'> = {
      name: data.email,
      email: data.email.toLowerCase(),
      password: data.password
    }

    Api.post<AuthResponse>(Routes.Auth.sign_up, serializedData)
      .then(Auth.onSuccess)
      .catch((error: AxiosError) => {
        Toast.error('Não foi possível criar a conta')
      })
  }

  static async signIn(data: SignInForm) {
    const serializedData: SignInForm = {
      email: data.email.toLowerCase(),
      password: data.password
    }

    Api.post<AuthResponse>(Routes.Auth.sign_in, serializedData)
      .then(Auth.onSuccess)
      .catch((error: AxiosError) => {
        Toast.error('Credenciais inválidas')
      })
  }

  static async signOut() {
    await AsyncStorage.removeItem(Storage.AUTH_TOKEN).catch(console.error)
    await AsyncStorage.removeItem(Storage.AUTH_USER).catch(console.error)
    router.replace('/(auth)/welcome')
  }

  static async getToken() {
    return AsyncStorage.getItem(Storage.AUTH_TOKEN).catch(console.error)
  }

  static onSuccess(response: AxiosResponse<AuthResponse>) {
    AsyncStorage.setItem(Storage.AUTH_TOKEN, response?.data?.token).catch(
      console.error
    )
    AsyncStorage.setItem(Storage.AUTH_USER, response?.data?.user?.uuid).catch(
      console.error
    )
    router.replace('/main')
  }
}

export default Auth

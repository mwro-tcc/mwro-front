import { User as UserType } from '@src/types/user'
import Api from './api'
import Routes from './routes'
import { AxiosError } from 'axios'
import Toast from '@lib/toast'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Storage from 'storage'

class User {
  static async update(fields: Partial<UserType>) {
    return Api.put(Routes.User.update, fields).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async delete() {
    return Api.delete(Routes.User.delete)
      .then(async () => {
        await AsyncStorage.removeItem(Storage.AUTH_TOKEN).catch(console.error)
        router.replace('/(auth)/welcome')
        Toast.success('Sua conta foi deletada')
      })
      .catch((error: AxiosError) => void Toast.error(error?.message))
  }
}

export default User

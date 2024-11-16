import Api from './api'
import Routes from './routes'
import { AxiosError } from 'axios'
import Toast from '@lib/toast'

class Favorite {
  static async favorite(id: string) {
    return await Api.post(Routes.Favorite.favorite(id)).catch(
      (error: AxiosError) => Toast.error(error?.message)
    )
  }

  static async unfavorite(id: string) {
    return await Api.delete(Routes.Favorite.unfavorite(id)).catch(
      (error: AxiosError) => Toast.error(error?.message)
    )
  }
}

export default Favorite

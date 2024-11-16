import Toast from '@lib/toast'
import { AxiosError } from 'axios'
import Api from './api'
import Routes from './routes'

class Rating {
  static async submit_rating(id: string, score: number) {
    return await Api.post(Routes.Rating.submit_rating(id), { score }).catch(
      (error: AxiosError) => Toast.error(error?.message)
    )
  }
}

export default Rating

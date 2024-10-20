import Lib from '../../lib'
import Api from './api'
import Routes from './routes'

const Favorite = {
  async create(id: string) {
    return await Lib.safe_call(Api.post<void>, [Routes.Favorite.favorite(id)])
  },
  async delete(id: string) {
    return await Lib.safe_call(Api.delete<void>, [
      Routes.Favorite.unfavorite(id)
    ])
  }
}

export default Favorite

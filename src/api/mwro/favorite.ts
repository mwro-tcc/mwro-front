import createConsoleErrorHandler from '@lib/create_console_error_handler'
import Api from './api'
import Routes from './routes'

class Favorite {
  static async favorite(id: string) {
    return Api.post(Routes.Favorite.favorite(id)).catch(
      createConsoleErrorHandler('Erro ao favoritar produto:')
    )
  }

  static async unfavorite(id: string) {
    return Api.delete(Routes.Favorite.unfavorite(id)).catch(
      createConsoleErrorHandler('Erro ao favoritar produto:')
    )
  }
}

export default Favorite

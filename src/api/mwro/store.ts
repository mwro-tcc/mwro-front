import Api from './api'
import Routes from './routes'
import { Store as StoreType, StoreForm } from '@src/types/store'
import { AxiosError } from 'axios'
import Toast from '@lib/toast'

class Store {
  static COLLECTION_KEY = 'stores'
  static MODEL_KEY = 'store'

  static async list_user_stores() {
    return await Api.get(Routes.Store.list_user_stores).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async create(data: StoreForm) {
    return await Api.post(Routes.Store.create, data).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async update(data: StoreForm) {
    return await Api.put(Routes.Store.update(data.uuid), data).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async get(id: string) {
    return await Api.get(Routes.Store.get(id)).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async get_products(id: string) {
    return await Api.get(Routes.Store.get_store_products(id)).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async delete(id: string) {
    return await Api.delete(Routes.Store.delete(id)).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }

  static async get_favorites() {
    return await Api.get(Routes.Store.get_favorites()).catch(
      (error: AxiosError) => void Toast.error(error?.message)
    )
  }
}

export default Store

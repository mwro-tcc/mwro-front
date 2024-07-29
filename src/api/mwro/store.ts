import Lib from '../../lib'
import Api from './api'
import Routes from './routes'
import { Store as StoreType, StoreForm } from '@src/types/store'
import { Product as ProductType } from '@src/types/product'

type StoreResponse = {
  store: StoreType
}

type ProductResponse = {
  product: ProductType
}

const Store = {
  async list_user_stores() {
    return await Lib.safe_call(Api.get<StoreResponse[]>, [
      Routes.Store.list_user_stores
    ])
  },
  async create(data: StoreForm) {
    return await Lib.safe_call(Api.post<StoreResponse>, [
      Routes.Store.create,
      data
    ])
  },
  async update(data: StoreForm) {
    return await Lib.safe_call(Api.put<StoreResponse>, [
      Routes.Store.update(data.uuid),
      data
    ])
  },
  async get(id: string) {
    return await Lib.safe_call(Api.get<StoreResponse>, [Routes.Store.get(id)])
  },
  async get_products(id: string) {
    return await Lib.safe_call(Api.get<ProductResponse[]>, [
      Routes.Store.get_store_products(id)
    ])
  },
  async delete(id: string) {
    return await Lib.safe_call(Api.delete<StoreResponse>, [
      Routes.Store.delete(id)
    ])
  }
}

export default Store

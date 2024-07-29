import Lib from '../../lib'
import Api from './api'
import Routes from './routes'
import { Product as ProductType, ProductForm } from '@src/types/product'

type ProductResponse = {
  product: ProductType
}

const Product = {
  async create(data: ProductForm) {
    return await Lib.safe_call(Api.post<ProductResponse>, [
      Routes.Product.create,
      { ...data, price: data.price as number, stock: data.stock as number }
    ])
  },
  async update(data: ProductForm) {
    return await Lib.safe_call(Api.put<ProductResponse>, [
      Routes.Product.update(data.uuid),
      { ...data, price: data.price as number, stock: data.stock as number }
    ])
  },
  async get(id: string) {
    return await Lib.safe_call(Api.get<ProductResponse>, [
      Routes.Product.get(id)
    ])
  },
  async delete(id: string) {
    return await Lib.safe_call(Api.delete<ProductResponse>, [
      Routes.Product.delete(id)
    ])
  }
}

export default Product

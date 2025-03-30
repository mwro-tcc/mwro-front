import { Store } from './store'
import { User } from './user'

export type Product = {
  uuid: string
  name: string
  storeUuid: string
  price: number
  stock: number
  description: string
  owner: User
  store: Store
}

export type ProductForm = Partial<Omit<Product, 'id'>>

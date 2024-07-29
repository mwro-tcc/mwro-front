export type Product = {
  uuid: string
  name: string
  storeUuid: string
  price: number
  stock: number
  description: string
}

export type ProductForm = Partial<Omit<Product, 'id'>>

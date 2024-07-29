import Product from '@api/mwro/product'
import Lib from '../lib'
import Toast from '../lib/toast'
import { ProductForm } from '@src/types/product'

export function useProduct() {
  const create_product = async (data: ProductForm) => {
    const res = Lib.error_callback(await Product.create(data), Toast.error)
    if (res) return res
  }

  const update_product = async (data: ProductForm) => {
    const res = Lib.error_callback(await Product.update(data), Toast.error)
    if (res) return res.data.product
  }

  const get_product = async (id: string) => {
    const res = Lib.error_callback(await Product.get(id), console.error)
    if (res) return res.data.product
  }

  const delete_product = async (id: string) => {
    const res = Lib.error_callback(await Product.delete(id), console.error)
    if (res) return res
  }

  return {
    create_product,
    update_product,
    get_product,
    delete_product
  }
}

import Store from '@api/mwro/store'
import Lib from '../lib'
import Toast from '../lib/toast'
import { StoreForm } from '@src/types/store'

export function useStore() {
  const create_store = async (data: StoreForm) => {
    const res = Lib.error_callback(await Store.create(data), Toast.error)
    if (res) return res
  }

  const update_store = async (data: StoreForm) => {
    const res = Lib.error_callback(await Store.update(data), Toast.error)
    if (res) return res
  }

  const list_user = async () => {
    const res = Lib.error_callback(await Store.list_user_stores(), Toast.error)
    if (res) return res
  }

  const get_products = async (id: string) => {
    // TODO: add pagination
    const res = Lib.error_callback(await Store.get_products(id), console.error)
    if (res) return res.data
  }

  const delete_store = async (id: string) => {
    const res = Lib.error_callback(await Store.delete(id), console.error)
    if (res) return res
  }

  return {
    create_store,
    update_store,
    list_user,
    get_products,
    delete_store
  }
}

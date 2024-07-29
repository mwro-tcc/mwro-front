import { CommunityForm } from '../types/community'
import Lib from '../lib'
import Toast from '../lib/toast'
import { Community } from '@api/mwro'

export function useCommunity() {
  const list_user_communities = async () => {
    const res = Lib.error_callback(
      await Community.list_user_communities(),
      Toast.error
    )

    return res?.data
  }

  const create_community = async (data: CommunityForm) => {
    const res = Lib.error_callback(await Community.create(data), Toast.error)
    if (res) return res.data.community
  }

  const update_community = async (data: CommunityForm) => {
    const res = Lib.error_callback(await Community.update(data), Toast.error)
    if (res) return res.data.community
  }

  const get_products = async (id: string) => {
    // TODO: add pagination
    const res = Lib.error_callback(
      await Community.get_community_products(id),
      console.error
    )
    if (res) return res.data
  }

  const get_stores = async (id: string) => {
    // TODO: add pagination
    const res = Lib.error_callback(
      await Community.get_community_stores(id),
      console.error
    )
    if (res) return res.data
  }

  return {
    list_user_communities,
    create_community,
    update_community,
    get_products,
    get_stores
  }
}

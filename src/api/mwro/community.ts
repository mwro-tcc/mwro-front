import {
  CommunityForm,
  Community as CommunityType
} from '../../types/community'
import { Product as ProductType } from '../../types/product'
import { Store as StoreType } from '../../types/store'
import Lib from '../../lib'
import Api from './api'
import Routes from './routes'
import Toast from '@lib/toast'
import { AxiosError } from 'axios'

type CommunityResponse = {
  community: CommunityType
}

class Community {
  static COLLECTION_KEY = 'communities'
  static MODEL_KEY = 'community'

  static async list_user_communities() {
    return await Lib.safe_call(Api.get<CommunityType[]>, [
      Routes.Community.list_user_communities
    ])
  }
  static async create(data: CommunityForm) {
    return await Api.post<CommunityResponse>(
      Routes.Community.create,
      {
        ...data,
        isPrivate: false
      }
    ).catch((error: AxiosError) => {
      Toast.error(error?.message)
    })
  }
  static async update(data: CommunityForm) {
    return await Api.put<CommunityResponse>(
      Routes.Community.update(data.uuid),
      {
        ...data,
        isPrivate: false
      }
    ).catch((error: AxiosError) => {
      Toast.error(error?.message)
    })
  }
  static async get(id: string) {
    return await Lib.safe_call(Api.get<CommunityResponse>, [
      Routes.Community.get(id)
    ])
  }
  static async get_community_products(id: string) {
    return await Lib.safe_call(Api.get<ProductType[]>, [
      Routes.Community.get_community_products(id)
    ])
  }
  static async get_community_stores(id: string) {
    return await Lib.safe_call(Api.get<StoreType[]>, [
      Routes.Community.get_community_stores(id)
    ])
  }
}

export default Community

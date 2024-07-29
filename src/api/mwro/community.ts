import {
  CommunityForm,
  Community as CommunityType
} from '../../types/community'
import { Product as ProductType } from '../../types/product'
import { Store as StoreType } from '../../types/store'
import Lib from '../../lib'
import Api from './api'
import Routes from './routes'

type CommunityResponse = {
  community: CommunityType
}

const Community = {
  async list_user_communities() {
    return await Lib.safe_call(Api.get<CommunityType[]>, [
      Routes.Community.list_user_communities
    ])
  },
  async create(data: CommunityForm) {
    return await Lib.safe_call(Api.post<CommunityResponse>, [
      Routes.Community.create,
      data
    ])
  },
  async update(data: CommunityForm) {
    return await Lib.safe_call(Api.put<CommunityResponse>, [
      Routes.Community.update,
      data
    ])
  },
  async get(id: string) {
    return await Lib.safe_call(Api.get<CommunityResponse>, [
      Routes.Community.get(id)
    ])
  },
  async get_community_products(id: string) {
    return await Lib.safe_call(Api.get<ProductType[]>, [
      Routes.Community.get_community_products(id)
    ])
  },
  async get_community_stores(id: string) {
    return await Lib.safe_call(Api.get<StoreType[]>, [
      Routes.Community.get_community_stores(id)
    ])
  }
}

export default Community

import {
  CommunityForm,
  Community as CommunityType
} from '../../types/community'
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
      Routes.Community.get.replace(':id', id) // REVIEW
    ])
  }
}

export default Community

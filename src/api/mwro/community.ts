import {
  CommunityForm,
  Community as CommunityType
} from '../../types/community'
import Lib from '../../lib'
import Api from './api'

type CommunityResponse = {
  community: CommunityType
}

const endpoints = {}

const Community = {
  async list_user_communities() {
    return await Lib.safe_call(Api.get<CommunityType[]>, [endpoints.list])
  },
  async create(data: CommunityForm) {
    return await Lib.safe_call(Api.post<CommunityResponse>, [
      endpoints.create,
      data
    ])
  },
  async update(data: CommunityForm) {
    return await Lib.safe_call(Api.put<CommunityResponse>, [
      endpoints.update,
      data
    ])
  },
  async get(id: string) {
    return await Lib.safe_call(Api.get<CommunityResponse>, [
      endpoints.get.replace(':id', id) // REVIEW
    ])
  }
}

export default Community

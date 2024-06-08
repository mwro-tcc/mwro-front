import {
    CreateCommunityForm,
    UpdateCommunityForm,
    CommunityData,
} from '../../types/community'
import Lib from '../../lib'
import Api from './api'

type CommunityResponse = {
    community: CommunityData
}

const endpoints = {
    create: '/community',
    update: '/community/:id',
    get: '/community/:id',
}

const Community = {
    async create(data: CreateCommunityForm) {
        return await Lib.safe_call(Api.post<CommunityResponse>, [
            endpoints.create,
            data,
        ])
    },
    async update(data: UpdateCommunityForm) {
        return await Lib.safe_call(Api.put<CommunityResponse>, [
            endpoints.update,
            data,
        ])
    },
    async get(id: string) {
        return await Lib.safe_call(Api.get<CommunityResponse>, [
            endpoints.get.replace(':id', id), // REVIEW
        ])
    },
}

export default Community

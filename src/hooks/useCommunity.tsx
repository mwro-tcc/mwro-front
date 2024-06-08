import { CreateCommunityForm, UpdateCommunityForm } from '../types/community'
import Lib from '../lib'
import Mwro from '../api/mwro'
import Toast from '../ui/toast/toast'

export function useCommunity() {
    const create_community = async (data: CreateCommunityForm) => {
        const res = Lib.error_callback(
            await Mwro.Community.create(data),
            Toast.error,
        )
        if (res) return res.data.community // REVIEW DATA STRUCTURE FROM BACK
    }

    const update_community = async (data: UpdateCommunityForm) => {
        const res = Lib.error_callback(
            await Mwro.Community.update(data),
            Toast.error,
        )
        if (res) return res.data.community // REVIEW DATA STRUCTURE FROM BACK
    }

    const get_community = async (id: any) => {
        return {
            name: 'Nome',
            description: 'Descrição',
            isPrivate: false,
            latitude: -22.967392367488312,
            longitude: -43.18354482530847,
        }
    }

    return {
        create_community,
        update_community,
        get_community,
    }
}

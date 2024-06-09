import { CommunityForm } from '../types/community'
import Lib from '../lib'
import Mwro from '../api/mwro'
import Toast from '../ui/toast/toast'

export function useCommunity() {
  const create_community = async (data: CommunityForm) => {
    const res = Lib.error_callback(
      await Mwro.Community.create(data),
      Toast.error
    )
    if (res) return res.data.community
  }

  const update_community = async (data: CommunityForm) => {
    const res = Lib.error_callback(
      await Mwro.Community.update(data),
      Toast.error
    )
    if (res) return res.data.community
  }

  const get_community = async (id: any) => {
    return {
      name: 'Nome',
      description: 'Descrição',
      isPrivate: false,
      latitude: -22.967392367488312,
      longitude: -43.18354482530847
    }
  }

  return {
    create_community,
    update_community,
    get_community
  }
}

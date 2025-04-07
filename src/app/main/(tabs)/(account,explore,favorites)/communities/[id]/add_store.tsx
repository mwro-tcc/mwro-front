import Request from '@api/mwro/requests'
import Toast from '@lib/toast'
import AddStoreModal from 'components/AddStoreModal'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function AddStore() {
  const { id: communityId } = useLocalSearchParams()

  const router = useRouter()

  const handleSubmit = async (storeId: string) => {
    return Request.send_request({
      communityUuid: communityId,
      storeUuid: storeId
    })
      .catch((error) => {
        Toast.error('Não foi possível realizar a ação')
        console.log(error)
      })
      .finally(router.back)
  }

  return <AddStoreModal handleSubmit={handleSubmit} communityId={communityId} />
}

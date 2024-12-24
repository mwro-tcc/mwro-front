import Request from '@api/mwro/requests'
import AddStoreModal from 'components/AddStoreModal'
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function AddStore() {
  const { id: communityId } = useLocalSearchParams()

  const router = useRouter()

  const handleSubmit = async (storeId: string) => {
    try {
      await Request.send_request({
        communityUuid: communityId,
        storeUuid: storeId
      })
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  return <AddStoreModal handleSubmit={handleSubmit} communityId={communityId} />
}

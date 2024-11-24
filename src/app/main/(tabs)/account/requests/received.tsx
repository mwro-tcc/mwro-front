import Form from '@forms/index'
import { router, useLocalSearchParams } from 'expo-router'

export default function ReceivedRequest() {
  const { storeId, communityId } = useLocalSearchParams()

  return (
    <Form.Request
      storeId={storeId}
      communityId={communityId}
      onCancel={router.back}
      onFinish={router.back}
    />
  )
}

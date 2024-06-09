import Form from '@forms/index'
import { useRouter } from 'expo-router'

const MOCKED_COMMUNITY = {
  id: 1,
  name: 'HUEHEUE',
  description: 'SHUASHUHAS',
  isPrivate: true,
  latitude: 300,
  longitude: 300
}

export default function EditCommunity() {
  const router = useRouter()
  const handleCancel = () => router.replace('/home')

  return <Form.Community community={MOCKED_COMMUNITY} onCancel={handleCancel} />
}

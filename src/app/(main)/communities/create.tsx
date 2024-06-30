import Form from '@forms/index'
import { useRouter } from 'expo-router'

export default function CreateCommunity() {
  const router = useRouter()
  const handleCancel = () => router.replace('/home')

  return <Form.Community onCancel={handleCancel} />
}

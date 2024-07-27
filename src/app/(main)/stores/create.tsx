import Form from '@forms/index'
import { useRouter } from 'expo-router'

export default function CreateStore() {
  const router = useRouter()
  const handleCancel = () => router.replace('/stores')

  return <Form.Store onCancel={handleCancel} />
}

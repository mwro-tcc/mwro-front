import StoreForm from '@forms/StoreForm'
import { useRouter } from 'expo-router'

export default function CreateStore() {
  const router = useRouter()

  return <StoreForm onFinish={router.back} />
}

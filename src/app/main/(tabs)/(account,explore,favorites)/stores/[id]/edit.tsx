import { Store } from '@src/types/store'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import useCache from '@hooks/useCache'
import StoreForm from '@forms/StoreForm'

export default function EditStore() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { get } = useCache<Store>()
  const router = useRouter()

  const store = get(id)

  if (!id) return <Redirect href='/main' />
  if (!store) return <Redirect href='/main' />

  return <StoreForm store={store} onFinish={router.back} />
}

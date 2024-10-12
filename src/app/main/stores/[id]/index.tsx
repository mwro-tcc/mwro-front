import Store from '@pages/Store/Store'
import { Redirect, useLocalSearchParams } from 'expo-router'

export default function StoreId() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return <Redirect href='/(stores)' />

  return <Store id={id} />
}

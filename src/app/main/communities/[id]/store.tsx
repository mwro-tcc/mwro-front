import Store from '@pages/Store/Store'
import { Redirect, useLocalSearchParams } from 'expo-router'

export default function CommunityStore() {
  const { storeId } = useLocalSearchParams<{ storeId: string }>()

  if (!storeId) return <Redirect href='/(communities)' />

  return <Store id={storeId} />
}

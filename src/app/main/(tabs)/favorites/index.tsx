import useCollection from '@hooks/useCollection'
import { Routes } from '@api/mwro'
import { RefreshControl, ScrollView } from 'react-native'
import ActionList from '@ui/ActionList'
import { useRouter } from 'expo-router'
import Store from '@api/mwro/store'
import AssetList from 'components/AssetList'

export default function Favorites() {
  const router = useRouter()

  const {
    data: stores = [],
    loading,
    handleRefresh,
    error
  } = useCollection<any>({
    url: Routes.Store.get_favorites(),
    keys: [Store.COLLECTION_KEY]
  })

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      }
    >
      <AssetList
        data={stores.map((store) => ({
          ...store,
          onPress: () => router.push(`/main/favorites/stores/${store.uuid}`)
        }))}
        favoritable
      />
    </ScrollView>
  )
}

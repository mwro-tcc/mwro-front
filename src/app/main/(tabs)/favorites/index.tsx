import useCollection from '@hooks/useCollection'
import { Routes } from '@api/mwro'
import { RefreshControl, ScrollView } from 'react-native'
import ActionList from '@ui/ActionList'
import { useRouter } from 'expo-router'

export default function Favorites() {

  const router = useRouter()

  const {
    data: stores = [],
    loading,
    handleRefresh,
    error
  } = useCollection<any>({
    url: Routes.Store.get_favorites()
  })

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <ActionList
          data={stores.map((store) => ({
            title: store.name,
             onPress: () => router.push(`/main/favorites/stores/${store.uuid}`) 
            }))}
        />
    </ScrollView>
  )
}

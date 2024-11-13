import useCollection from '@hooks/useCollection'
import { Routes } from '@api/mwro'
import { ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import AssetList from 'components/AssetList'
import Show from '@ui/Show'
import VStack from '@ui/VStack'
import { Store } from '@src/types/store'

export default function Favorites() {
  const router = useRouter()

  const {
    data: stores,
    refreshing,
    loading,
    handleRefresh
  } = useCollection<Store>({
    url: Routes.Store.get_favorites()
  })

  return (
    <Show
      unless={loading}
      placeholder={
        <VStack flex={1} justify='center' items='center'>
          <ActivityIndicator />
        </VStack>
      }
    >
      <AssetList
        onRefresh={handleRefresh}
        refreshing={refreshing}
        data={stores?.map((store) => ({
          ...store,
          onPress: () => router.push(`/main/(favorites)/stores/${store.uuid}`)
        }))}
        favoritable
      />
    </Show>
  )
}

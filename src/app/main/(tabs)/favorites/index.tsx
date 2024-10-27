import Text from '@ui/Text'
import VStack from '@ui/VStack'
import useCollection from '@hooks/useCollection'
import { Routes } from '@api/mwro'
import { RefreshControl, ScrollView } from 'react-native'

export default function Favorites() {

  const {
    data: stores = [],
    loading,
    handleRefresh,
    error
  } = useCollection<any>({
    url: Routes.Store.get_favorites()
  })

  console.log(`favorites`, stores)


  return (
    <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
    <VStack>
      <Text>Favorites</Text>
    </VStack></ScrollView>
  )
}

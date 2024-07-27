import { Routes } from '@api/mwro'
import useCollection from '@hooks/useCollection'
import { Store } from '@src/types/store'
import Button from '@ui/Button'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { Stack, useRouter } from 'expo-router'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'

function StoresListItem(props: { item: Store }) {
  const { item } = props

  const router = useRouter()

  const handlePress = () => {
    router.replace(`stores/${item.uuid}`)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <HStack
        px={24}
        py={12}
        bg='#fff'
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 0.5
        }}
      >
        <Text size={16}>{item.name}</Text>
      </HStack>
    </TouchableOpacity>
  )
}

export default function Stores() {
  const router = useRouter()

  const { data, loading, handleRefresh, error } = useCollection<Store>({
    url: Routes.Store.list_user_stores
  })

  if (error) {
    console.error(error)
    router.replace('/(main)')
    return null
  }

  return (
    <VStack gap={10} flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Minhas lojas',
          title: 'Lojas'
        }}
      />
      <HStack gap={10} pt={10} px={20}>
        <Button
          variant='primary'
          onPress={() => router.replace('/stores/create/')}
        >
          Criar Loja
        </Button>
      </HStack>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        data={data}
        renderItem={({ item }) => <StoresListItem item={item} />}
      />
    </VStack>
  )
}

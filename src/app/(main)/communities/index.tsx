import { Routes } from '@api/mwro'
import useCollection from '@hooks/useCollection'
import { Community } from '@src/types/community'
import Button from '@ui/Button'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { useRouter } from 'expo-router'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native'

function CommunityListItem(props: { item: Community }) {
  const { item } = props

  const router = useRouter()

  const handlePress = () => {
    router.push(`communities/${item.id}`)
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

export default function Communities() {
  const router = useRouter()

  const { data, loading, handleRefresh, error } = useCollection<Community>({
    url: Routes.Community.list_user_communities
  })

  if (error) {
    router.replace('/(main)')
    return null
  }

  return (
    <VStack gap={10} flex={1}>
      <HStack gap={10} pt={10} px={20}>
        <Button
          variant='primary'
          onPress={() => router.push('/communities/create/')}
        >
          Criar comunidade
        </Button>
      </HStack>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        data={[
          ...(data ?? []),
          {
            id: 123,
            name: 'Test Community'
          }
        ]}
        renderItem={({ item }) => <CommunityListItem item={item} />}
      />
    </VStack>
  )
}

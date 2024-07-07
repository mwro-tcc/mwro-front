import { Routes } from '@api/mwro'
import useCollection from '@hooks/useCollection'
import { Community } from '@src/types/community'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'

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

  const { data, loading, error } = useCollection<Community>({
    url: Routes.Community.list_user_communities
  })

  if (loading) return <ActivityIndicator size='small' style={{ flex: 1 }} />

  if (error) {
    router.replace('/(main)')
    return null
  }

  return (
    <FlatList
      data={[
        ...data,
        {
          id: 123,
          name: 'Test Community'
        }
      ]}
      renderItem={({ item }) => <CommunityListItem item={item} />}
    />
  )
}

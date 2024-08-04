import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { Community } from '@src/types/community'
import colors from '@ui/config/colors'
import HStack from '@ui/HStack'
import AppleStyleSwipeableRow from '@ui/SwipeableRow'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { Redirect, Stack, useRouter } from 'expo-router'
import {
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import HeaderButton from '@ui/HeaderButton'
import ActionList, { ActionListSwipeAction, ActionType } from '@ui/ActionList'

export default function Communities() {
  const router = useRouter()

  const {
    data: communities,
    loading,
    handleRefresh,
    error
  } = useCollection<Community>({
    url: Routes.Community.list_user_communities
  })

  if (error) return <Redirect href='/(main)' />

  const data: ActionType[] = communities.map((item) => ({
    id: item.uuid,
    title: item.name,
    onPress: () => router.push(`communities/${item.uuid}`)
  }))

  const handleDelete = async (id: string) => {
    Lib.error_callback(
      await Lib.safe_call(Api.delete, [Routes.Community.delete(id)]),
      Toast.error
    )

    handleRefresh()
  }

  const swipeActions: ActionListSwipeAction = (item) => [
    {
      label: 'Excluir',
      color: colors.red_5,
      onPress: () => handleDelete(item.id as string)
    }
  ]

  return (
    <VStack gap={10} flex={1} p={16}>
      <Stack.Screen
        options={{
          headerTitle: 'Minhas Comunidades',
          headerRight: () => (
            <HeaderButton
              onPress={() => router.push('/communities/create/')}
              icon='plus'
            />
          )
        }}
      />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <ActionList data={data} swipeActions={swipeActions} keyFrom='id' />
      </ScrollView>
    </VStack>
  )
}

function CommunityListItem(props: { item: Community; onRefresh: () => void }) {
  const { item, onRefresh } = props

  const router = useRouter()

  const handlePress = () => {
    router.push(`communities/${item.uuid}`)
  }

  const handleDelete = async () => {
    Lib.error_callback(
      await Lib.safe_call(Api.delete, [Routes.Community.delete(item.uuid)]),
      Toast.error
    )
    onRefresh()
  }

  return (
    <AppleStyleSwipeableRow
      actions={[
        {
          label: 'Excluir',
          color: colors.red_5,
          onPress: handleDelete
        }
      ]}
    >
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
    </AppleStyleSwipeableRow>
  )
}

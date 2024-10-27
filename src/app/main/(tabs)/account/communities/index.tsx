import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { Community } from '@src/types/community'
import colors from '@ui/config/colors'
import VStack from '@ui/VStack'
import { useCallback } from 'react'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { RefreshControl, ScrollView } from 'react-native'
import ActionList, { ActionListSwipeAction, ActionType } from '@ui/ActionList'
import HeaderTextButton from '@ui/HeaderTextButton'

export default function Communities() {
  const router = useRouter()

  const {
    data: communities = [],
    loading,
    handleRefresh,
    error
  } = useCollection<Community>({
    url: Routes.Community.list_user_communities
  })

  if (error) {
    Toast.error(error.message)
  }

  const data: ActionType[] = communities.map((item) => ({
    id: item.uuid,
    title: item.name,
    onPress: () => router.push(`/main/account/communities/${item.uuid}`)
  }))

  useFocusEffect(useCallback(() => void handleRefresh(), []))

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
          headerBackTitle: 'Voltar',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_9
          },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              weight='600'
              color={tintColor}
              onPress={() => router.push('/main/account/communities/create')}
            >
              Criar
            </HeaderTextButton>
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

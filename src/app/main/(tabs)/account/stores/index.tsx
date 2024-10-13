import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { Store } from '@src/types/store'
import ActionList, { ActionListSwipeAction, ActionType } from '@ui/ActionList'
import IconButton from '@ui/IconButton'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import { Redirect, Stack, useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

export default function Stores() {
  const router = useRouter()

  const {
    data: stores,
    loading,
    handleRefresh,
    error
  } = useCollection<Store>({
    url: Routes.Store.list_user_stores
  })

  if (error) return <Redirect href='/main' />

  useFocusEffect(useCallback(() => void handleRefresh(), []))

  const data: ActionType[] =
    stores?.map((item) => ({
      id: item.uuid,
      title: item.name,
      onPress: () => router.push(`/main/account/stores/${item.uuid}`)
    })) || []

  const handleDelete = async (id: string) => {
    Lib.error_callback(
      await Lib.safe_call(Api.delete, [Routes.Store.delete(id)]),
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
          headerTitle: 'Minhas Lojas',
          headerRight: () => (
            <IconButton
              onPress={() => router.push('/main/account/stores/create/')}
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

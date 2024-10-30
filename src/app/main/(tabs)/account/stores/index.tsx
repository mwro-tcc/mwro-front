import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import Store from '@api/mwro/store'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { Store as StoreType } from '@src/types/store'
import { ActionListSwipeAction } from '@ui/ActionList'
import HeaderTextButton from '@ui/HeaderTextButton'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import AssetList, { AssetType } from 'components/AssetList'
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
  } = useCollection<StoreType>({
    url: Routes.Store.list_user_stores,
    keys: [Store.COLLECTION_KEY]
  })

  useFocusEffect(useCallback(() => void handleRefresh(), []))

  if (error) return <Redirect href='/main' />

  const data: AssetType[] =
    stores?.map((item) => ({
      id: item.uuid,
      title: item.name,
      description: item.description,
      image: item.image,
      rating: item.averageScore ?? 0,
      isFavorite: item.isFavorite,
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
    <VStack gap={10} flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Minhas Lojas',
          headerBackTitle: 'Voltar',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_9
          },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              weight='600'
              color={tintColor}
              onPress={() => router.push('/main/account/stores/create')}
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
        showsVerticalScrollIndicator={false}
      >
        <AssetList
          imageStyle={{ width: 59, height: 59, borderRadius: 50 }}
          favoritable={true}
          data={data}
          swipeActions={swipeActions}
          onAfterClick={handleRefresh}
        />
      </ScrollView>
    </VStack>
  )
}

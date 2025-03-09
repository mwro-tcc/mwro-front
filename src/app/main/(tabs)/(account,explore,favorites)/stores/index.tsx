import { Routes } from '@api/mwro'
import Store from '@api/mwro/store'
import useCollection from '@hooks/useCollection'
import Toast from '@lib/toast'
import { Store as StoreType } from '@src/types/store'
import { ActionListSwipeAction } from '@ui/ActionList'
import HeaderTextButton from '@ui/HeaderTextButton'
import Show from '@ui/Show'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import { AxiosError } from 'axios'
import AssetList from 'components/AssetList'
import { Redirect, Stack, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native'

export default function Stores() {
  const router = useRouter()

  const {
    refreshing,
    data: stores,
    loading,
    handleRefresh,
    error
  } = useCollection<StoreType>({
    url: Routes.Store.list_user_stores
  })

  if (error) return <Redirect href='/main' />

  const handleDelete = async (id: string) => {
    await Store.delete(id).catch((error: AxiosError) => {
      Toast.error(error?.message)
    })
    handleRefresh()
  }

  const swipeActions: ActionListSwipeAction = (item) => [
    {
      label: 'Excluir',
      color: colors.red_5,
      onPress: () => handleDelete(item.uuid as string)
    }
  ]

  return (
    <VStack flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Minhas Lojas',
          headerBackTitle: 'Voltar',
          headerTintColor: colors.primary,
          contentStyle: { backgroundColor: colors.background },
          headerTitleStyle: {
            color: colors.ui_10
          },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              weight='600'
              color={tintColor}
              onPress={() => router.push('/main/(account)/stores/create')}
            >
              Criar
            </HeaderTextButton>
          )
        }}
      />
      <Show
        unless={loading}
        placeholder={
          <VStack flex={1} items='center' justify='center'>
            <ActivityIndicator />
          </VStack>
        }
      >
        <AssetList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          favoritable={true}
          data={stores?.map((store) => ({
            ...store,
            onPress: () =>
              router.push(`./${store.uuid}`, { relativeToDirectory: true })
          }))}
          swipeActions={swipeActions}
          onAfterClick={handleRefresh}
        />
      </Show>
    </VStack>
  )
}

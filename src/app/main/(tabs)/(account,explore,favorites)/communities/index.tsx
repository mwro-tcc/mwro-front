import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { Community as CommunityType } from '@src/types/community'
import colors from '@ui/config/colors'
import VStack from '@ui/VStack'
import { Stack, useRouter } from 'expo-router'
import { ActionListSwipeAction } from '@ui/ActionList'
import HeaderTextButton from '@ui/HeaderTextButton'
import Show from '@ui/Show'
import AssetList from 'components/AssetList'
import ScreenLoading from '@ui/ScreenLoading'

export default function Communities() {
  const router = useRouter()

  const {
    data: communities,
    loading,
    handleRefresh,
    refreshing,
    error
  } = useCollection<CommunityType>({
    url: Routes.Community.list_user_communities
  })

  if (error) {
    Toast.error(error.message)
  }

  const data = communities?.map((item) => ({
    uuid: item.uuid,
    name: item.name,
    description: '',
    onPress: () => router.push(`./${item.uuid}`, { relativeToDirectory: true })
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
    <VStack flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Minhas Comunidades',
          contentStyle: { backgroundColor: colors.background },
          headerBackTitle: 'Voltar',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_10
          },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              weight='600'
              color={tintColor}
              onPress={() =>
                router.push('./create', { relativeToDirectory: true })
              }
            >
              Criar
            </HeaderTextButton>
          )
        }}
      />
      <Show unless={loading} placeholder={<ScreenLoading />}>
        <AssetList
          data={data}
          swipeActions={swipeActions}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </Show>
    </VStack>
  )
}

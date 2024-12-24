import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Community as CommunityType } from '@src/types/community'
import Show from '@ui/Show'
import useCache from '@hooks/useCache'
import Toast from '@lib/toast'
import colors from '@ui/config/colors'
import { createURL } from 'expo-linking'
import * as Clipboard from 'expo-clipboard'
import { Store } from '@src/types/store'
import AssetList from 'components/AssetList'
import useCollection from '@hooks/useCollection'
import ScreenLoading from '@ui/ScreenLoading'
import AssetHeader from 'components/AssetHeader'
import Menu from '@ui/Menu'
import { Pencil } from 'lucide-react-native'
import useAuth from '@hooks/useAuth'

export default function Community() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { add } = useCache()

  const { isCommunityOwner } = useAuth()

  const {
    data,
    loading,
    refreshing: isCommunityRefreshing,
    error,
    handleRefresh: handleCommunityRefresh
  } = useModel<CommunityType>({
    url: Routes.Community.get(id)
  })

  const {
    formattedData: stores,
    loading: isLoadingStores,
    refreshing: storesRefreshing,
    handleRefresh: handleStoresRefresh
  } = useCollection<Store>({
    url: Routes.Community.get_community_stores(id),
    dataFormatter: (data) => {
      return data?.map((store) => ({
        ...store,
        onPress: () =>
          router.push(`../../stores/${store.uuid}`, {
            relativeToDirectory: true
          })
      }))
    }
  })

  const refreshing = isCommunityRefreshing || storesRefreshing

  const handleRefresh = () => {
    handleCommunityRefresh()
    handleStoresRefresh()
  }

  const handleEdit = () => {
    if (id) {
      add(id, data)
      router.push(`./edit`, {
        relativeToDirectory: true
      })
    } else {
      Toast.error('Nenhum ID encontrado')
    }
  }

  const handleRequest = () => {
    router.push(
      {
        pathname: `./add_store`,
        params: {
          id
        }
      },
      { relativeToDirectory: true }
    )
  }

  const menuRequestLabel = isCommunityOwner(data)
    ? 'Adicionar Loja'
    : 'Solicitar para ingressar'

  const communityLink = createURL(`/main/(explore)/communities/${id}`)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(communityLink)

    Toast.success('O link foi copiado para sua área de transferência!')
  }

  if (error) return <Redirect href='/main' />

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitle: 'Voltar',
          headerTitle: '',
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerRight: ({ tintColor }) => (
            <Menu
              debug
              color={tintColor}
              items={[
                {
                  label: 'Editar',
                  onPress: handleEdit,
                  icon: <Pencil />
                },
                {
                  label: menuRequestLabel,
                  onPress: handleRequest
                },
                {
                  label: 'Copiar Link',
                  onPress: copyToClipboard
                }
              ]}
            />
          )
        }}
      />
      <Show unless={loading}>
        <AssetHeader asset={data!} childCategory='Lojas' />

        <Show unless={isLoadingStores} placeholder={<ScreenLoading />}>
          <AssetList
            data={stores}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        </Show>
      </Show>
    </>
  )
}

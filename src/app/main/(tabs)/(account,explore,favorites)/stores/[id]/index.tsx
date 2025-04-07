import { Community, Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import StoreForm from '@forms/StoreForm'
import useBoolean from '@hooks/useBoolean'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Toast from '@lib/toast'
import { ActionListSwipeAction } from '@ui/ActionList'
import colors, { ui } from '@ui/config/colors'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Rating from '@api/mwro/rating'
import { Store as StoreType } from '@src/types/store'
import { RatingModal } from 'components/RatingModal'
import AssetList from 'components/AssetList'
import AssetHeader from 'components/AssetHeader'
import FavoriteIcon from 'components/FavoriteIcon'
import { View } from 'react-native'
import HStack from '@ui/HStack'
import Menu from '@ui/Menu'
import Show from '@ui/Show'
import useCache from '@hooks/useCache'
import Store from '@api/mwro/store'
import { AxiosError } from 'axios'
import useAuth from '@hooks/useAuth'
import {
  Pencil,
  Plus,
  Star,
  Trash2,
  DoorOpen,
  CircleX
} from 'lucide-react-native'
import { useQuery } from '@tanstack/react-query'
import scope from '@lib/scope'
import returnlog from '@lib/returnlog'
import Empty from '@ui/Empty'

export default function StoreId() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { isAssetOwner, isCommunityOwner } = useAuth()

  const { add } = useCache()

  const {
    data: store,
    error: storeError,
    refetch: handleStoreRefresh,
    isRefetching: refreshingStore,
    isLoading: loadingStore
  } = useQuery<StoreType>({
    queryKey: ['store', id],
    queryFn: () => Api.get(Routes.Store.get(id)).then((res) => res.data)
  })

  const hasCommunity = store?.communityUuid !== null

  const {
    data: products,
    error: productsError,
    handleRefresh: handleProductsRefresh
  } = useCollection<any>({
    url: Routes.Store.get_store_products(id)
  })

  const router = useRouter()

  const {
    value: ratingModal,
    setTrue: openRatingModal,
    setFalse: closeRatingModal
  } = useBoolean(false)

  const submitRating = async (ratingScore: number) => {
    await Rating.submit_rating(id, ratingScore)

    handleStoreRefresh()
  }

  const createProduct = () => {
    add('storeId', id)
    return router.push(
      {
        pathname: `./products/create`
      },
      { relativeToDirectory: true }
    )
  }

  const goToProduct = (productId: any) => {
    return router.push(`./products/${productId}`, { relativeToDirectory: true })
  }

  const {
    value: edit,
    setTrue: enableEditMode,
    setFalse: disabledEditMode
  } = useBoolean(false)

  const handleDeleteStore = async () => {
    await Store.delete(id).catch((error: AxiosError) => {
      Toast.error(error?.message)
    })

    router.back()
  }

  const handleLeaveCommunity = async () => {
    const storeData = {
      ...store,
      communityUuid: null
    }

    Store.update(storeData)
      .then(() => {
        Toast.success('Sua loja saiu da comunidade')
      })
      .catch(() => {
        Toast.error('Não foi possível sair da comunidade')
      })
      .finally(() => {
        handleStoreRefresh()
      })
  }

  const handleKickStore = async () => {
    await Community.kick_store(store)
      .then(() => {
        Toast.success('Loja removida da comunidade com sucesso')
      })
      .catch(() => {
        Toast.error('Não foi possível remover da comunidade')
      })
      .finally(handleStoreRefresh)
  }

  const handleDelete = async (id: string) => {
    Lib.error_callback(
      await Lib.safe_call(Api.delete, [Routes.Product.delete(id)]),
      Toast.error
    )
    handleProductsRefresh()
  }

  const menuItems = scope(() => {
    const isOwner = isAssetOwner(store)

    return returnlog(
      [
        {
          label: 'Avaliar',
          icon: <Star />,
          onPress: openRatingModal
        },
        {
          label: 'Editar',
          icon: <Pencil />,
          onPress: enableEditMode
        },
        {
          label: 'Adicionar Produto',
          icon: <Plus />,
          onPress: createProduct
        },
        {
          label: `Sair da comunidade "${store?.community?.name}"`,
          icon: <DoorOpen />,
          onPress: handleLeaveCommunity,
          color: ui.destructive
        },
        {
          label: `Remover da comunidade "${store?.community?.name}"`,
          icon: <CircleX />,
          onPress: handleKickStore,
          color: ui.destructive
        },
        {
          label: 'Deletar Loja',
          icon: <Trash2 />,
          onPress: handleDeleteStore,
          color: ui.destructive
        }
      ].filter((_, index) => {
        switch (index) {
          case 1:
          case 2:
          case 5:
            return isOwner
          case 3:
            return hasCommunity && isAssetOwner(store)
          case 4:
            return hasCommunity && isCommunityOwner(store?.community)
          default:
            return true
        }
      })
    )
  })

  const swipeActions: ActionListSwipeAction = (item) => [
    {
      label: 'Excluir',
      color: colors.red_5,
      onPress: () => handleDelete(item.uuid as string)
    }
  ]

  const handleFinishEditing = () => {
    disabledEditMode()
    handleStoreRefresh()
  }

  if (edit) {
    return <StoreForm store={store} onFinish={handleFinishEditing} />
  }

  if (!id) return <Redirect href='/main/(account)/stores' />

  if (storeError || productsError) return <Redirect href='/main' />

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerBackTitle: 'Voltar',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_10
          },
          headerStyle: {
            backgroundColor: ui.bg
          },
          contentStyle: {
            backgroundColor: ui.bg
          },
          headerBackVisible: true,
          headerLeft: undefined,
          headerShadowVisible: false,
          headerRight: ({ tintColor }) => (
            <HStack gap={13} items='center'>
              <FavoriteIcon asset={store!} onAfterClick={handleStoreRefresh} />
              <Menu color={tintColor} items={menuItems} />
            </HStack>
          ),
          headerTitle: ''
        }}
      />
      <Show unless={loadingStore}>
        <AssetHeader
          asset={store!}
          averageScore={store?.averageScore}
          childCategory={products?.length ?? 0 > 0 ? 'Produtos' : ''}
          hasPermissionsToEdit={isAssetOwner(store)}
        />
      </Show>
      <Show
        when={products?.length ?? 0 > 0}
        placeholder={<Empty message='Sem produtos' />}
      >
        <AssetList
          onRefresh={handleStoreRefresh}
          refreshing={refreshingStore}
          data={products?.map((product) => ({
            ...product,
            onPress: () => goToProduct(product.uuid)
          }))}
          swipeActions={swipeActions}
        />
      </Show>
      <RatingModal
        visible={ratingModal}
        onClose={closeRatingModal}
        onSubmit={submitRating}
        assetLabel='Loja'
      />
    </View>
  )
}

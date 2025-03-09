import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import StoreForm from '@forms/StoreForm'
import useBoolean from '@hooks/useBoolean'
import useCollection from '@hooks/useCollection'
import useModel from '@hooks/useModel'
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

export default function StoreId() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { add } = useCache()

  const {
    data: store,
    error: storeError,
    handleRefresh: handleStoreRefresh,
    refreshing: refreshingStore,
    loading: loadingStore
  } = useModel<StoreType>({
    url: Routes.Store.get(id)
  })

  const {
    data: products,
    error: productsError,
    handleRefresh: handleProductsRefresh
  } = useCollection<any>({
    url: Routes.Store.get_store_products(id)
  })

  const router = useRouter()

  const {
    value: ratingModalIsOpen,
    setTrue: openRatingModal,
    setFalse: closeRatingModal
  } = useBoolean(false)

  const submitRating = async (ratingScore: number) => {
    return await Rating.submit_rating(id, ratingScore)
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

  const handleDelete = async (id: string) => {
    Lib.error_callback(
      await Lib.safe_call(Api.delete, [Routes.Product.delete(id)]),
      Toast.error
    )
    handleProductsRefresh()
  }

  const swipeActions: ActionListSwipeAction = (item) => [
    {
      label: 'Excluir',
      color: colors.red_5,
      onPress: () => handleDelete(item.uuid as string)
    }
  ]

  if (edit) {
    return <StoreForm store={store} onFinish={disabledEditMode} />
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
          headerShadowVisible: false,
          headerRight: ({ tintColor }) => (
            <HStack gap={13} items='center'>
              <FavoriteIcon asset={store!} onAfterClick={handleStoreRefresh} />
              <Menu
                color={tintColor}
                items={[
                  {
                    label: 'Avaliar',
                    onPress: openRatingModal
                  },
                  {
                    label: 'Adicionar Produto',
                    onPress: createProduct
                  }
                ]}
              />
            </HStack>
          ),
          contentStyle: { backgroundColor: colors.background },
          headerTitle: ''
        }}
      />
      <Show unless={loadingStore}>
        <AssetHeader
          asset={store!}
          averageScore={store?.averageScore}
          childCategory='Produtos'
        />
      </Show>
      <AssetList
        onRefresh={handleStoreRefresh}
        refreshing={refreshingStore}
        data={products?.map((product) => ({
          ...product,
          onPress: () => goToProduct(product.uuid)
        }))}
        swipeActions={swipeActions}
      />
      <RatingModal
        visible={ratingModalIsOpen}
        onClose={closeRatingModal}
        onSubmit={submitRating}
        assetLabel='Loja'
      />
    </View>
  )
}

import { Redirect, Stack, useRouter } from 'expo-router'
import { View } from 'react-native'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import useBoolean from '@hooks/useBoolean'
import AssetHeader from 'components/AssetHeader'
import FavoriteIcon from 'components/FavoriteIcon'
import StoreForm from '@forms/StoreForm'
import colors from '@ui/config/colors'
import Text from '@ui/Text'
import { RatingModal } from 'components/RatingModal'
import Rating from '@api/mwro/rating'
import AssetList from 'components/AssetList'
import useCollection from '@hooks/useCollection'
import Lib from '@lib/index'
import Api from '@api/mwro/api'
import Toast from '@lib/toast'
import { ActionListSwipeAction } from '@ui/ActionList'
import Show from '@ui/Show'
import HStack from '@ui/HStack'
import Menu from '@ui/Menu'

export default function Store(props: { id: string }) {
  const { id } = props

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
    return router.push({
      pathname: `/main/(favorites)/products/create`,
      params: {
        store: id
      }
    })
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
          onPress: () =>
            router.push(`/main/(favorites)/products/${product.uuid}`)
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

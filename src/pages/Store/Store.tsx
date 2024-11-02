import { Redirect, Stack, useFocusEffect } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import List from 'components/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import useBoolean from '@hooks/useBoolean'
import { Product } from '@src/types/product'
import AssetHeader from 'components/AssetHeader'
import FavoriteIcon from 'components/FavoriteIcon'
import StoreForm from '@forms/StoreForm'
import colors from '@ui/config/colors'
import Text from '@ui/Text'
import { RatingModal } from 'components/RatingModal'
import Rating from '@api/mwro/rating'

export default function Store(props: { id: string }) {
  const { id } = props

  const { data, error, handleRefresh } = useModel<StoreType>({
    url: Routes.Store.get(id)
  })

  const {
    value: ratingModalIsOpen,
    setTrue: openRatingModal,
    setFalse: closeRatingModal
  } = useBoolean(false)

  const submitRating = async (ratingScore: number) => {
    return await Rating.submit_rating(id, ratingScore)
  }

  const {
    value: edit,
    setTrue: enableEditMode,
    setFalse: disabledEditMode
  } = useBoolean(false)

  if (edit) {
    return <StoreForm store={data} onFinish={disabledEditMode} />
  }

  if (error) return <Redirect href='/main' />

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
          headerRight: () => (
            <FavoriteIcon asset={data!} onAfterClick={handleRefresh} />
          ),
          contentStyle: { backgroundColor: colors.background },
          headerTitle: ''
        }}
      />
      <AssetHeader
        name={data?.name}
        description={data?.description}
        image={data?.image}
        averageScore={data?.averageScore}
        childCategory='Produtos'
      />
      <TouchableOpacity onPress={openRatingModal}>
        <Text weight='600' size={17} color='#e22ee2'>
          {/* Remover depois do Picker no Header */}
          Avaliar
        </Text>
      </TouchableOpacity>
      <RatingModal
        visible={ratingModalIsOpen}
        onClose={closeRatingModal}
        onSubmit={submitRating}
        assetLabel='Loja'
      />
      <List
        getItemRoute={(product: Product) => ({
          pathname: `/communities/products/${product.uuid}`
        })}
        numOfColumns={2}
        url={Routes.Store.get_store_products(id)}
      />
    </View>
  )
}

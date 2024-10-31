import { Redirect, Stack, useFocusEffect } from 'expo-router'
import { View } from 'react-native'
import List from 'components/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import IconButton from '@ui/IconButton'
import Form from '@forms/index'
import useBoolean from '@hooks/useBoolean'
import { Product } from '@src/types/product'
import { useCallback } from 'react'
import AssetHeader from 'components/AssetHeader'

export default function Store(props: { id: string }) {
  const { id } = props

  const { data, error, handleRefresh } = useModel<StoreType>({
    url: Routes.Store.get(id)
  })

  useFocusEffect(useCallback(() => void handleRefresh(), []))

  const {
    value: edit,
    setTrue: enableEditMode,
    setFalse: disabledEditMode
  } = useBoolean(false)

  if (edit) {
    return (
      <Form.Store
        store={data}
        onCancel={disabledEditMode}
        onFinish={disabledEditMode}
      />
    )
  }

  if (error) return <Redirect href='/main' />

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <IconButton icon='pencil-outline' onPress={enableEditMode} />
          ),
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

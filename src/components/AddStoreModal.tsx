import { Routes } from '@api/mwro'
import useCollection from '@hooks/useCollection'
import { Store as StoreType } from '@src/types/store'
import colors from '@ui/config/colors'
import VStack from '@ui/VStack'
import { Stack } from 'expo-router'
import React from 'react'
import AssetList from './AssetList'

const AddStoreModal = ({ handleSubmit }: any) => {
  const {
    data: stores = [],
    refreshing,
    handleRefresh
  } = useCollection<StoreType>({
    url: Routes.Store.list_user_stores
  })

  const data: any = stores
    ? stores.map((item) => ({
        ...item,
        onPress: () => handleSubmit(item.uuid)
      }))
    : []

  return (
    <VStack flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Adicionar Loja',
          contentStyle: { backgroundColor: colors.background },
          headerBackTitle: 'Voltar',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_10
          }
        }}
      />
      <AssetList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={data}
      />
    </VStack>
  )
}

export default AddStoreModal

import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Redirect, Stack, router, useFocusEffect } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import List from 'components/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import FilterHeader, { Tab } from 'components/FilterHeader'
import IconButton from '@ui/IconButton'
import WhatsAppIcon from 'components/WhatsAppIcon'
import Form from '@forms/index'
import useBoolean from '@hooks/useBoolean'
import { Product } from '@src/types/product'
import { useCallback } from 'react'

const tabs: Tab[] = [
  {
    id: 'products',
    label: 'Produtos',
    icon: 'shopping-outline'
  }
]

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

  if (error) return <Redirect href='/(main)' />

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => null,
          headerRight: () => (
            <IconButton icon='pencil-outline' onPress={enableEditMode} />
          ),
          headerTitle: 'Loja'
        }}
      />

      <View style={styles.container}>
        <HStack justify='between' pt={20} pr={20} items='center'>
          <HStack gap={8}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              {data?.name}
            </Text>
            <WhatsAppIcon
              phoneNumber={'+5521997025550'} //data?.phoneNumber
              message='Olá, gostaria de fazer um pedido.'
            />
          </HStack>
          <HStack gap={10}>
            <IconButton
              style={styles.iconContainer}
              onPress={() =>
                router.push(`/(stores)/products/create?store=${id}`)
              }
              icon='briefcase-plus-outline'
              color='black'
            />
          </HStack>
        </HStack>
        <Text>{data?.description}</Text>
      </View>
      <FilterHeader activeTab={tabs[0].id} tabs={tabs} />
      <List
        getItemRoute={(product: Product) => ({
          pathname: `/(communities)/products/${product.uuid}`
        })}
        numOfColumns={2}
        url={Routes.Store.get_store_products(id)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  container: {
    backgroundColor: '#fff',
    height: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10
    },
    width: '100%',
    paddingLeft: 20
  }
})

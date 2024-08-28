import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import List from 'components/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import FilterHeader, { Tab } from 'components/FilterHeader'
import useCache from '@hooks/useCache'
import Toast from '@lib/toast'
import IconButton from '@ui/IconButton'
import WhatsAppIcon from 'components/WhatsAppIcon'

const tabs: Tab[] = [
  {
    id: 'products',
    label: 'Produtos',
    icon: 'shopping-outline'
  }
]

export default function Stores() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { add } = useCache()

  const { data, error } = useModel<StoreType>({
    url: Routes.Store.get(id)
  })

  const handleEdit = () => {
    if (id) {
      add(id, data)
      router.push(`/stores/${id}/edit`)
    } else {
      Toast.error('Nenhum ID encontrado')
    }
  }

  if (error) return <Redirect href='/(main)' />

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton icon='pencil-outline' onPress={handleEdit} />
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
              phoneNumber={'5521997025550'} //data?.phone
              message='Olá, gostaria de fazer um pedido.'
            />
          </HStack>
          <HStack gap={10}>
            <IconButton
              style={styles.iconContainer}
              onPress={() =>
                router.push(`/stores/${id}/products/create?store_id=${id}`)
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
        route={`stores/${id}/products`}
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

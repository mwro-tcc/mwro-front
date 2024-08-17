import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import List from 'components/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import FilterHeader from 'components/FilterHeader'
import useCache from '@hooks/useCache'
import Toast from '@lib/toast'
import IconButton from '@ui/IconButton'

const storeCategories = [
  {
    id: 1,
    name: 'Produtos',
    route: 'products',
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
      router.replace(`/stores/${id}/edit`)
    } else {
      Toast.error('Nenhum ID encontrado')
    }
  }

  if (error) return <Redirect href='/(main)' />

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/stores')}>
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <IconButton icon='pencil-outline' onPress={handleEdit} />
          ),
          headerTitle: 'Loja'
        }}
      />

      <View style={styles.container}>
        <HStack justify='between' pt={20} pr={20} items='center'>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>{data?.name}</Text>
          <HStack gap={10}>
            <IconButton
              style={styles.iconContainer}
              onPress={() => router.replace(`/products/create?store_id=${id}`)}
              icon='briefcase-plus-outline'
              color='black'
            />
          </HStack>
        </HStack>
        <Text>{data?.description}</Text>
      </View>
      <FilterHeader categories={storeCategories} />
      <List
        route={'products'}
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

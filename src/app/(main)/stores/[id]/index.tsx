import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import List from '@ui/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Store as StoreType } from '@src/types/store'
import { useStore } from '@hooks/useStore'
import FilterHeader from 'components/FilterHeader'
import { Ionicons } from '@expo/vector-icons'
import useCollection from '@hooks/useCollection'

const MOCKED_CATEGORIES = [
  {
    id: 1,
    name: 'Produtos',
    icon: 'shopping-outline'
  }
]

type StoreCategories = 'products'

export default function Stores() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, loading, error, handleRefresh } = useModel<StoreType>({
    url: Routes.Store.get(id)
  })

  const [category, setCategory] = useState<StoreCategories>('products')

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (error || !data) return <Text>{error?.message}</Text>

  return (
    <View
      style={{
        flex: 1
      }}
    >
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
            <TouchableOpacity
              onPress={() => router.replace(`/stores/${id}/edit`)}
            >
              <MaterialCommunityIcons name='pencil-outline' size={24} />
            </TouchableOpacity>
          ),
          headerTitle: 'Loja'
        }}
      />
      <View style={styles.container}>
        <HStack justify='between' pt={20} pr={20} items='center'>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 32 }}>
            {data.name}
          </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => router.replace(`/products/create?store_id=${id}`)}
          >
            <MaterialCommunityIcons name='briefcase-plus-outline' size={24} />
          </TouchableOpacity>
        </HStack>
        <Text>{data.description}</Text>
      </View>
      <FilterHeader categories={MOCKED_CATEGORIES} />
      <List
        itemCategory={category}
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

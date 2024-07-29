import { useCommunity } from '@hooks/useCommunity'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import {
  Redirect,
  Stack,
  router,
  useGlobalSearchParams,
  useLocalSearchParams
} from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import List from '@ui/List'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Community as CommunityType } from '@src/types/community'
import FilterHeader from 'components/FilterHeader'

const MOCKED_CATEGORIES = [
  {
    id: 1,
    name: 'Produtos',
    icon: 'shopping-outline'
  },
  {
    id: 2,
    name: 'Lojas',
    icon: 'storefront-outline'
  }
]

type CommunityCategories = 'products' | 'stores'

export default function Community() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, loading, error, handleRefresh } = useModel<CommunityType>({
    url: Routes.Community.get(id)
  })

  const [urlToFetch, setUrlToFetch] = useState<string>(
    Routes.Community.get_community_products(id)
  )
  const [category, setCategory] = useState<CommunityCategories>('products')

  const handleCategoryChange = async (category: CommunityCategories) => {
    setCategory(category)
  }

  useEffect(() => {
    setUrlToFetch(
      category === 'products'
        ? Routes.Community.get_community_products(id)
        : Routes.Community.get_community_stores(id)
    )
  }, [category])

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
          headerBackTitle: 'Voltar',
          headerTitle: 'Comunidade',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push(`/communities/${id}/edit`)}
            >
              <MaterialCommunityIcons name='pencil-outline' size={24} />
            </TouchableOpacity>
          )
        }}
      />
      <View style={styles.container}>
        <HStack justify='between' pt={20} pr={20} items='center'>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>{data.name}</Text>

          <HStack gap={10}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => router.push(`/communities/${id}/map`)}
            >
              <MaterialIcons name='location-on' size={24} color='black' />
            </TouchableOpacity>
          </HStack>
        </HStack>
        <Text>{data.description}</Text>
      </View>
      <FilterHeader
        handleCategoryChange={handleCategoryChange}
        categories={MOCKED_CATEGORIES}
      />
      <List itemCategory={category} numOfColumns={2} url={urlToFetch} />
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

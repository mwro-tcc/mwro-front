import { useCommunity } from '@hooks/useCommunity'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Stack, router } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import List from '@ui/List'
import MapView from '@ui/MapView'
import CommunityFilterHeader from '@forms/Community/components/CommunityFilterHeader'

type CommunityCategories = 'Produtos' | 'Lojas'

export default function Community() {
  const id = '1' // TODO: const { id } = useLocalSearchParams()

  const { get_products, get_stores } = useCommunity()

  const [category, setCategory] = useState<CommunityCategories>('Produtos')
  const [mapView, setMapView] = useState(false)
  const [listing, setListing] = useState([])

  const handleCategoryChange = async (category: CommunityCategories) => {
    setCategory(category)
  }

  useEffect(() => {
    fetchData()
  }, [category])

  const dataToFetchByCategory: Record<string, any> = {
    Produtos: get_products,
    Lojas: get_stores
  }

  const fetchData = useCallback(async () => {
    const fetchFunction = dataToFetchByCategory[category]
    const data = await fetchFunction(id)
    setListing(data)
  }, [category])

  const renderContent = useMemo(() => {
    if (mapView) {
      return (
        <MapView
          latitude={-22.954949149999997} // TODO: community.latitude
          longitude={-43.16870504551251} // TODO: community.longitude
        />
      )
    } else {
      // TODO: community.name, community.description
      return (
        <>
          <View style={styles.container}>
            <HStack justify='between' pt={20} pr={20} items='center'>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>UNIRIO</Text>

              <HStack gap={10}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setMapView(true)}
                >
                  <MaterialIcons name='location-on' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => router.push(`/community/edit/${id}`)}
                >
                  <MaterialCommunityIcons
                    name='pencil-outline'
                    size={24}
                    color='black'
                  />
                </TouchableOpacity>
              </HStack>
            </HStack>
            <Text>Vendas da UNIRIO</Text>
          </View>
          <CommunityFilterHeader handleCategoryChange={handleCategoryChange} />
          <List itemCategory={category} listing={listing} numOfColumns={2} />
        </>
      )
    }
  }, [listing, mapView])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      <Stack.Screen
        options={{
          headerLeft: () => (
            <MaterialIcons
              name='arrow-back-ios'
              size={24}
              color='black'
              onPress={mapView ? () => setMapView(false) : () => router.back()}
            />
          ),
          headerTitle: 'Comunidade'
        }}
      />
      {renderContent}
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

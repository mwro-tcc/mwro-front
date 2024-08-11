import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useModel from '@hooks/useModel'
import { Routes } from '@api/mwro'
import { Product as ProductType } from '@src/types/product'
import { priceFormatter } from 'utils'
import HeaderButton from '@ui/HeaderButton'
import useCache from '@hooks/useCache'

export default function Product() {
  const { id } = useLocalSearchParams<{
    id: string
  }>()

  const { data, loading, error, handleRefresh } = useModel<ProductType>({
    url: Routes.Product.get(id)
  })

  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const totalPrice = priceFormatter((data?.price ?? 0) * quantity)

  const { add } = useCache()

  const handleEdit = () => {
    if (!data || !id) return

    add(id, data)
    router.replace(`/products/${data.uuid}/edit`)
  }

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (error || !data) return <Text>{error?.message}</Text>

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace(`/stores/${data.storeUuid}`)}
            >
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <HeaderButton icon='pencil-outline' onPress={handleEdit} />
          ),
          headerTitle: 'Produto'
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: 'https://www.proclinic-products.com/build/static/default-product.30484205.png'
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>{`${priceFormatter(data.price)}`}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <HStack justify='between' mt={50}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={handleDecreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.totalPrice}>{`Total   ${totalPrice}`}</Text>
          </HStack>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  image: {
    width: '100%',
    height: 270,
    borderRadius: 10,
    marginBottom: 16
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 80
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  quantityButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 20
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16
  }
})

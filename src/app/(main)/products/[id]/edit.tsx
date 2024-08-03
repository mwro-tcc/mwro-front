import Form from '@forms/index'
import { Product } from '@src/types/product'
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useProduct } from '@hooks/useProduct'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import useCache from '@hooks/useCache'

export default function EditProduct() {
  const router = useRouter()
  const handleCancel = () => router.replace(`/products/${id}`)

  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return <Redirect href='/(main)' />

  const { get } = useCache<Product>()
  const product = get(id)

  const { delete_product } = useProduct()

  const handleDelete = async () => {
    await delete_product(id as string)
    router.replace(`/stores/${product?.storeUuid}`)
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'Produto',
          headerRight: () => (
            <TouchableOpacity onPress={handleDelete}>
              <MaterialCommunityIcons name='trash-can' size={24} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace(`/products/${id}`)}>
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      {!!product && <Form.Product product={product} onCancel={handleCancel} />}
    </View>
  )
}

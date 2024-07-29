import { Routes } from '@api/mwro'
import Form from '@forms/index'
import { Product } from '@src/types/product'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useProduct } from '@hooks/useProduct'
import useModel from '@hooks/useModel'
import HStack from '@ui/HStack'
import Text from '@ui/Text'

export default function EditProduct() {
  const router = useRouter()
  const handleCancel = () => router.replace(`/products/${id}`)

  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, loading, handleRefresh, error } = useModel<Product>({
    url: Routes.Product.get(id)
  })

  const { delete_product } = useProduct()

  const handleDelete = async () => {
    await delete_product(id as string)
    router.replace(`/stores/${data?.storeUuid}`)
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
            <TouchableOpacity onPress={() => handleDelete()}>
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
      <Form.Product product={data} onCancel={handleCancel} />
    </View>
  )
}

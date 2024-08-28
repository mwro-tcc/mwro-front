import { useForm } from 'react-hook-form'
import { Product, ProductForm as ProductFormType } from '@src/types/product'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import Button from '@ui/Button'
import ProductFormStep1 from './components/ProductFormStep1'
import { useProduct } from '@hooks/useProduct'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, TouchableOpacity } from 'react-native'
import HStack from '@ui/HStack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@ui/config/colors'

type Props = {
  product?: Product
}

export default function ProductForm(props: Props) {
  const { store_id } = useLocalSearchParams()
  const { product } = props
  const router = useRouter()

  const form = useForm<ProductFormType>({
    defaultValues: product,
    values: product
  })

  const { create_product, update_product, delete_product } = useProduct()

  const handleUpdate = async (productData: any) => {
    await update_product({
      ...productData,
      storeUuid: store_id as string,
      price: parseInt(productData.price),
      stock: parseInt(productData.stock)
    })
    router.replace(`/stores/${store_id}`)
  }

  const handleCreate = async (productData: any) => {
    await create_product({
      ...productData,
      storeUuid: store_id as string,
      price: parseInt(productData.price),
      stock: parseInt(productData.stock)
    })
    form.reset()
    router.replace(`/stores/${store_id}`)
  }

  const handleSubmit = form.handleSubmit(product ? handleUpdate : handleCreate)

  const handleDelete = async () => {
    if (!product) return
    await delete_product(product.uuid)
    router.back()
  }

  const body = (() => {
    return <ProductFormStep1 form={form} />
  })()

  return (
    <ScrollView
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='never'
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          headerTitle: `${product ? 'Editar' : 'Criar'} produto`,
          contentStyle: {
            backgroundColor: colors.ui_1
          },
          headerRight: () => {
            return (
              <>
                {product && (
                  <TouchableOpacity onPress={handleDelete}>
                    <MaterialCommunityIcons name='trash-can' size={24} />
                  </TouchableOpacity>
                )}
              </>
            )
          }
        }}
      />
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack items='center' gap={20}></VStack>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
        <VStack gap={10}>
          <Button
            variant='primary'
            onPress={handleSubmit}
            disabled={!form.formState.isValid}
          >
            Concluir
          </Button>
          <Button onPress={() => router.replace(`/stores/${store_id}`)}>
            Cancelar
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}

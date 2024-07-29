import { useForm } from 'react-hook-form'
import { Product, ProductForm as ProductFormType } from '@src/types/product'
import VStack from '@ui/VStack'
import Text from '@ui/Text'
import Button from '@ui/Button'
import ProductFormStep1 from './components/ProductFormStep1'
import { useProduct } from '@hooks/useProduct'
import SafeKeyboardScrollView from '@ui/SafeKeyboardScrollView'
import { useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

type Props = {
  onCancel: () => void
  product?: Product
}

export default function ProductForm(props: Props) {
  const { store_id } = useLocalSearchParams()

  const router = useRouter()

  const form = useForm<ProductFormType>({
    defaultValues: props.product
  })

  const { create_product, update_product } = useProduct()

  const product_created = props.product

  useEffect(() => {
    form.reset(props.product)
  }, [props.product])

  const handleUpdate = async (productData: any) => {
    await update_product({
      ...productData,
      storeUuid: store_id as string,
      price: parseInt(productData.price),
      stock: parseInt(productData.stock)
    })
    router.replace(`/products/${productData.uuid}`)
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

  const handleSubmit = form.handleSubmit(
    product_created ? handleUpdate : handleCreate
  )

  const body = (() => {
    return <ProductFormStep1 form={form} />
  })()

  return (
    <SafeKeyboardScrollView>
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack items='center' gap={20}>
          <Text size={28} weight='600'>
            {props.product ? 'Editar' : 'Criar'} Produto
          </Text>
        </VStack>
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
          <Button onPress={props.onCancel}>Cancelar</Button>
        </VStack>
      </VStack>
    </SafeKeyboardScrollView>
  )
}

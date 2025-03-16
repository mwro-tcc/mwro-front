import { useForm } from 'react-hook-form'
import { Product, ProductForm as ProductFormType } from '@src/types/product'
import VStack from '@ui/VStack'
import ProductFormStep1 from './components/ProductFormStep1'
import { useProduct } from '@hooks/useProduct'
import { router, Stack } from 'expo-router'
import { ScrollView } from 'react-native'
import colors from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'
import { useQuery } from '@tanstack/react-query'
import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'

type Props = {
  storeId: string
  product?: Product
}

export default function ProductForm(props: Props) {
  const { storeId, product } = props

  const { refetch } = useQuery({
    queryKey: ['product', product?.uuid],
    queryFn: () =>
      product?.uuid ? Api.get(Routes.Product.get(product?.uuid)) : null
  })

  const handleFinish = () => {
    if (product?.uuid) refetch()
    router.push('..')
  }

  const form = useForm<ProductFormType>({
    defaultValues: product,
    values: product
  })

  const { create_product, update_product } = useProduct()

  const handleUpdate = async (productData: any) => {
    await update_product({
      ...productData,
      storeUuid: storeId,
      price: parseInt(productData.price)
    })
    handleFinish()
  }

  const handleCreate = async (productData: any) => {
    await create_product({
      ...productData,
      storeUuid: storeId,
      price: parseInt(productData.price)
    })
    handleFinish()
  }

  const handleSubmit = form.handleSubmit(product ? handleUpdate : handleCreate)

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
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_10
          },
          contentStyle: {
            backgroundColor: colors.background
          },
          headerLeft: ({ tintColor }) => (
            <HeaderTextButton
              color={tintColor}
              onPress={() => router.push('..')}
              weight='600'
            >
              Cancelar
            </HeaderTextButton>
          ),
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              color={tintColor}
              onPress={handleSubmit}
              weight='600'
              disabled={!form.formState.isValid}
            >
              Salvar
            </HeaderTextButton>
          ),
          headerBackTitle: 'Voltar'
        }}
      />
      <VStack p={20} flex={1} gap={30} h={'100%'}>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
      </VStack>
    </ScrollView>
  )
}

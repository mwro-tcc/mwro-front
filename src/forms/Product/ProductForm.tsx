import { useForm } from 'react-hook-form'
import { Product, ProductForm as ProductFormType } from '@src/types/product'
import VStack from '@ui/VStack'
import Button from '@ui/Button'
import ProductFormStep1 from './components/ProductFormStep1'
import { useProduct } from '@hooks/useProduct'
import { Stack } from 'expo-router'
import { ScrollView, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'

type Props = {
  onCancel?: () => void
  onFinish: () => void
  storeId: string
  product?: Product
}

export default function ProductForm(props: Props) {
  const { storeId, product, onFinish } = props

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
    onFinish()
  }

  const handleCreate = async (productData: any) => {
    await create_product({
      ...productData,
      storeUuid: storeId,
      price: parseInt(productData.price)
    })
    onFinish()
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
          headerLeft: () => null,
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
        <VStack items='center' gap={20}></VStack>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
      </VStack>
    </ScrollView>
  )
}

import { useForm } from 'react-hook-form'
import { Product, ProductForm as ProductFormType } from '@src/types/product'
import VStack from '@ui/VStack'
import ProductFormStep1 from './components/ProductFormStep1'
import { useProduct } from '@hooks/useProduct'
import { router, Stack } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'
import colors, { ui } from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'
import useImagePicker from '@hooks/useImagePicker'
import { Routes } from '@api/mwro'
import ImageUploader from '@api/mwro/image_uploader'
import Image from '@ui/Image'
import rounded from '@ui/config/rounded'
import useAuth from '@hooks/useAuth'

type Props = {
  onCancel?: () => void
  onFinish: () => void
  storeId: string
  product?: Product
}

export default function ProductForm(props: Props) {
  const { storeId, product, onFinish } = props
  const { isAssetOwner } = useAuth()

  const isOwner = isAssetOwner(product!)

  const form = useForm<ProductFormType>({
    defaultValues: product,
    values: product
  })

  const { image, loading, pickImage } = useImagePicker({
    aspectRatio: [1, 1],
    initialImage: Routes.Image.src(product?.uuid),
    onPick: ImageUploader.createUploader(product?.uuid)
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
          headerLeft: ({ tintColor }) => (
            <HeaderTextButton
              color={tintColor}
              onPress={() => router.push('..')}
              weight='600'
              disabled={!form.formState.isValid}
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
        <VStack items='center' gap={5}>
          <Image
            loading={loading}
            src={image}
            hasAuthenticationHeaders
            w={92}
            h={92}
            rounded={rounded.circle}
            border={[StyleSheet.hairlineWidth, 'solid', ui.border]}
          />
          {isOwner && (
            <Button variant='text' onPress={pickImage}>
              Alterar
            </Button>
          )}
        </VStack>
        <VStack gap={30} flex={1}>
          {body}
        </VStack>
      </VStack>
    </ScrollView>
  )
}

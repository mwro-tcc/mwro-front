import ProductForm from '@forms/Product/ProductForm'
import { Redirect, router, useLocalSearchParams } from 'expo-router'

export default function CreateProduct() {
  const { store } = useLocalSearchParams<{
    store: string
  }>()

  if (!store) return <Redirect href='/main' />

  return (
    <ProductForm
      storeId={store}
      onFinish={router.back}
      onCancel={router.back}
    />
  )
}

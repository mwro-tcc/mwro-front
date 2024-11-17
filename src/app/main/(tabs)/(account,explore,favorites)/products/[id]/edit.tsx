import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import useCache from '@hooks/useCache'
import ProductForm from '@forms/Product'
import { Product } from '@src/types/product'

export default function EditProduct() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { get } = useCache<Product>()

  const product = get(id)

  const router = useRouter()

  if (!id) return <Redirect href='/main' />
  if (!product) return <Redirect href='/main' />

  return (
    <ProductForm
      product={product}
      storeId={product.storeUuid}
      onFinish={router.back}
    />
  )
}

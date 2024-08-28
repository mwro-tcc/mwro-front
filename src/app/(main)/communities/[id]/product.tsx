import { Product } from '@pages/Product'
import { Redirect, useLocalSearchParams } from 'expo-router'

export default function CommunityProduct() {
  const { productId } = useLocalSearchParams<{
    productId: string
  }>()

  if (!productId) return <Redirect href='/(main)' />

  return <Product id={productId} />
}

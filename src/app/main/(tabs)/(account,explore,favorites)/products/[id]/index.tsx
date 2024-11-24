import { Product } from '@pages/Product'
import { Redirect, useLocalSearchParams } from 'expo-router'

export default function ProductId() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return <Redirect href='/main/(account)/products' />

  return <Product id={id} />
}

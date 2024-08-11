import Form from '@forms/index'
import { Product } from '@src/types/product'
import { Redirect, useLocalSearchParams } from 'expo-router'
import useCache from '@hooks/useCache'

export default function EditProduct() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return <Redirect href='/(main)' />

  const { get } = useCache<Product>()
  const product = get(id)

  return <>{!!product && <Form.Product product={product} />}</>
}

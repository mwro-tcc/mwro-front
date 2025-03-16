import ProductForm from '@forms/Product/ProductForm'
import useCache from '@hooks/useCache'
import { Redirect } from 'expo-router'

export default function CreateProduct() {
  const { get } = useCache()

  const storeId = get('storeId') as string

  if (!storeId) return <Redirect href='/main' />

  return <ProductForm storeId={storeId} />
}

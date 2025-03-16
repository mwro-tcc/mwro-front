import { Redirect } from 'expo-router'
import useCache from '@hooks/useCache'
import ProductForm from '@forms/Product'
import { Product } from '@src/types/product'

export default function EditProduct() {
  const { get } = useCache<Product>()

  const product = get('product')

  if (!product) return <Redirect href='/main' />

  return <ProductForm product={product} storeId={product.storeUuid} />
}

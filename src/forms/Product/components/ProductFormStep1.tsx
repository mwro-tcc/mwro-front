import { ProductForm } from '@src/types/product'
import CurrencyInput from '@ui/CurrencyInput'
import TextInput from '@ui/TextInput'
import { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<ProductForm, any, ProductForm>
}

export default function ProductFormStep1(props: Props) {
  const { form } = props

  return (
    <>
      <TextInput
        control={form.control}
        name={'name'}
        label='Nome do Produto'
        required
      />
      <TextInput
        control={form.control}
        name={'description'}
        label='Descrição'
        required
        multiline={true}
        height={150}
      />
      <CurrencyInput
        control={form.control}
        name={'price'}
        label='Valor'
        required
      />
    </>
  )
}

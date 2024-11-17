import { ProductForm } from '@src/types/product'
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
      <TextInput
        keyboardType='numeric'
        control={form.control}
        name={'price'}
        label='Valor'
        required
      />
    </>
  )
}

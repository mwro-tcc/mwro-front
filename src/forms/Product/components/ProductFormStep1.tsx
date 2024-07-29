import { StoreForm } from '@src/types/store'
import TextInput from '@ui/TextInput'
import { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<StoreForm, any, StoreForm>
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
      <TextInput
        keyboardType='numeric'
        control={form.control}
        name={'stock'}
        label='Estoque Inicial'
        required
      />
    </>
  )
}

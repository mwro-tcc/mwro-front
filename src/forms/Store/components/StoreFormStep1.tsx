import { StoreForm } from '@src/types/store'
import Switch from '@ui/Switch'
import TextInput from '@ui/TextInput'
import { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<StoreForm, any, StoreForm>
  storeCommunity: any
}

export default function StoreFormStep1(props: Props) {
  const { form, storeCommunity } = props

  return (
    <>
      <TextInput
        control={form.control}
        name={'name'}
        label='Nome da Loja'
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
    </>
  )
}

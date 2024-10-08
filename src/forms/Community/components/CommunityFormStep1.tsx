import { CommunityForm } from '@src/types/community'
import Switch from '@ui/Switch'
import TextInput from '@ui/TextInput'
import { UseFormReturn } from 'react-hook-form'
import { ScrollView } from 'react-native'

type Props = {
  form: UseFormReturn<CommunityForm, any, CommunityForm>
}

export default function CommunityFormStep1(props: Props) {
  const { form } = props

  return (
    <ScrollView
      keyboardDismissMode='on-drag'
      contentContainerStyle={{ flex: 1, gap: 30 }}
    >
      <TextInput
        control={form.control}
        name={'name'}
        label='Nome da Comunidade'
        required
      />
      <TextInput
        control={form.control}
        name={'description'}
        label='Descrição'
        multiline
        numberOfLines={3}
        required
        height={150}
      />
      <Switch
        label='Visibilidade'
        required
        control={form.control}
        name='isPrivate'
        LeftOption='Privada'
        rightOption='Pública'
      />
    </ScrollView>
  )
}

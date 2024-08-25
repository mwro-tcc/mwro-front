import FormModal from '@ui/FormModal'
import { useLocalSearchParams } from 'expo-router'

export default function EditName() {
  const { name } = useLocalSearchParams()

  return (
    <FormModal
      actionLabel='Salvar'
      cancelLabel='Cancelar'
      initialValue={name as string}
      onSubmit={() => {}}
    />
  )
}

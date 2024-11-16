import User from '@api/mwro/user'
import FormModal from '@ui/FormModal'
import { useLocalSearchParams } from 'expo-router'

export default function EditName() {
  const { name } = useLocalSearchParams()

  const handleSubmit = async (value: string) => {
    return User.update({
      name: value
    })
  }

  return (
    <FormModal
      actionLabel='Salvar'
      cancelLabel='Cancelar'
      attributeLabel='Nome'
      initialValue={name as string}
      onSubmit={handleSubmit}
    />
  )
}

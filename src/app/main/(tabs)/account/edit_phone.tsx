import User from '@api/mwro/user'
import FormModal from '@ui/FormModal'
import { useLocalSearchParams } from 'expo-router'

export default function EditPhone() {
  const { phoneNumber } = useLocalSearchParams()

  const handleSubmit = async (value: string) => {
    return User.update({
      phoneNumber: value
    })
  }

  return (
    <FormModal
      actionLabel='Salvar'
      cancelLabel='Cancelar'
      attributeLabel='telefone'
      initialValue={phoneNumber as string}
      onSubmit={handleSubmit}
      inputType='phone'
    />
  )
}

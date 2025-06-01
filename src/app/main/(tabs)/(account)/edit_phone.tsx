import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import User from '@api/mwro/user'
import FormModal from '@ui/FormModal'
import { useLocalSearchParams } from 'expo-router'
import { User as UserType } from '@src/types/user'
import { useQuery } from '@tanstack/react-query'

export default function EditPhone() {
  const { phoneNumber } = useLocalSearchParams()

  const { refetch } = useQuery<
    UserType & {
      isSubscribed: boolean
    }
  >({
    queryKey: ['me'],
    queryFn: () => Api.get(Routes.Auth.me).then((res) => res.data)
  })

  const handleSubmit = async (value: string) => {
    User.update({
      phoneNumber: value
    }).then(() => refetch())
  }

  return (
    <FormModal
      actionLabel='Salvar'
      cancelLabel='Cancelar'
      attributeLabel='Telefone'
      initialValue={phoneNumber as string}
      onSubmit={handleSubmit}
      inputType='phone'
    />
  )
}

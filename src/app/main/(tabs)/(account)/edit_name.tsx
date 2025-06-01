import User from '@api/mwro/user'
import FormModal from '@ui/FormModal'
import { useLocalSearchParams } from 'expo-router'
import { User as UserType } from '@src/types/user'
import { useQuery } from '@tanstack/react-query'
import Api from '@api/mwro/api'
import { Routes } from '@api/mwro'

export default function EditName() {
  const { name } = useLocalSearchParams()

  const { refetch } = useQuery<
    UserType & {
      isSubscribed: boolean
    }
  >({
    queryKey: ['me'],
    queryFn: () => Api.get(Routes.Auth.me).then((res) => res.data)
  })

  const handleSubmit = async (value: string) => {
    return User.update({
      name: value
    }).then(() => refetch())
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

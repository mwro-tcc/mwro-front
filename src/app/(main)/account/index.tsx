import colors from '@ui/config/colors'
import VStack from '@ui/VStack'
import { useRouter } from 'expo-router'
import ActionList from '@ui/ActionList'
import useAuth from '@hooks/useAuth'

export default function Account() {
  const router = useRouter()
  const { sign_out } = useAuth()

  const name = 'name'

  const handleEditName = () => {
    router.push({
      pathname: '/account/edit_name',
      params: {
        name
      }
    })
  }

  return (
    <VStack p={20} gap={20}>
      <ActionList
        label='Email'
        data={[
          {
            title: 'accounts@owozsh.dev',
            disabled: true
          }
        ]}
      />
      <ActionList
        label='Nome'
        data={[
          {
            title: name,
            onPress: handleEditName
          }
        ]}
      />
      <ActionList
        data={[
          {
            title: 'Encerrar Sessão',
            onPress: sign_out
          },
          {
            title: 'Deletar Conta',
            color: colors.red_5
          }
        ]}
      />
    </VStack>
  )
}

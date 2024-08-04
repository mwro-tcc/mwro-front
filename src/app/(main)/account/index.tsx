import Button from '@ui/Button'
import colors from '@ui/config/colors'
import ActionListItem from '@ui/ActionListItem'
import ListLabel from '@ui/ListLabel'
import VStack from '@ui/VStack'
import { Stack, useRouter } from 'expo-router'
import ActionList from '@ui/ActionList'
import useAuth from '@hooks/useAuth'

export default function Account() {
  const router = useRouter()
  const { sign_out } = useAuth()

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
            title: 'Vítor Barroso',
            onPress: () => router.push('/account/edit_name')
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

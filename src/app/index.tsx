import { StatusBar } from 'expo-status-bar'
import Button from '../ui/Button'
import VStack from '../ui/VStack'
import { useRouter } from 'expo-router'
import Text from '../ui/Text'
import useAsync from '@hooks/useAsync'
import AuthSession from '@api/local/auth_session'
import Lib from '@lib/index'

export default function App() {
  const router = useRouter()

  const { data: token } = useAsync(async () =>
    Lib.error_callback(await AuthSession.get(), console.error)
  )

  if (token) router.replace('/home')

  return (
    <VStack gap={10} p={20} justify='end' flex={1}>
      <StatusBar style='auto' />
      <VStack flex={1} items='center' justify='center'>
        <Text size={28} weight='600'>
          mwro
        </Text>
      </VStack>
      <VStack gap={10}>
        <Button onPress={() => router.push('/sign_in')} variant='primary'>
          Acessar Conta
        </Button>
        <Button onPress={() => router.push('/sign_up')}>Criar Conta</Button>
      </VStack>
    </VStack>
  )
}

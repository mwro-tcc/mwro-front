import Button from '@ui/Button'
import colors from '@ui/config/colors'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Welcome() {
  const router = useRouter()

  return (
    <VStack gap={10} p={20} justify='end' flex={1} bg={colors.background}>
      <StatusBar style='auto' />
      <VStack flex={1} items='center' justify='center'>
        <Text size={72} weight='600'>
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

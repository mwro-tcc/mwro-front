import useAuth from '@hooks/useAuth'
import Button from '@ui/Button'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()
  const { sign_out } = useAuth()

  return (
    <VStack flex={1} items='center' justify='center' gap={20}>
      <Text size={28} weight='600'>
        Home
      </Text>
      <Button
        variant='primary'
        onPress={() => router.push('/community/create/')}
      >
        Criar comunidade
      </Button>
      <Button
        variant='primary'
        onPress={() => router.push('/community/edit/5')} // TODO: community.id
      >
        Editar comunidade
      </Button>
      <Button
        variant='primary'
        onPress={() => router.push('/community/1')} // TODO: community.id
      >
        Visitar comunidade
      </Button>
      <Button variant='primary' onPress={sign_out}>
        Sair
      </Button>
    </VStack>
  )
}

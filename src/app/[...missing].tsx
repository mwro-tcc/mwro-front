import Button from '@ui/Button'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'

export default function Missing() {
  const router = useRouter()
  const path = usePathname()

  console.log(path)

  return (
    <VStack flex={1} justify='center' items='center'>
      <Text>Page Not Found</Text>
      <Text style={{ marginVertical: 20 }}>Página não encontrada.</Text>
      <Button onPress={() => router.push('/main/(tabs)/explore')}>
        Voltar para a tela inicial
      </Button>
    </VStack>
  )
}

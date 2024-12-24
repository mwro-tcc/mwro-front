import Button from '@ui/Button'
import colors from '@ui/config/colors'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { usePathname, useRouter } from 'expo-router'

export default function Missing() {
  const router = useRouter()
  const path = usePathname()

  console.log(path)

  return (
    <VStack flex={1} justify='center' items='center' bg={colors.background}>
      <Text>Page Not Found</Text>
      <Text style={{ marginVertical: 20 }}>Página não encontrada.</Text>
      <Button onPress={() => router.push('/main/(tabs)/(explore)')}>
        Voltar para a tela inicial
      </Button>
    </VStack>
  )
}

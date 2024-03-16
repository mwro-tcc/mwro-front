import { StatusBar } from 'expo-status-bar'
import Button from '../ui/Button'
import VStack from '../ui/VStack'
import { useRouter } from 'expo-router'
import Text from '../ui/Text'

import '../../translations'

export default function App() {
    const router = useRouter()

    // const { is_authenticated } = useAuth();
    // if (is_authenticated) router.push("/home");

    return (
        <VStack gap={10} p={20} justify="end" flex={1}>
            <StatusBar style="auto" />
            <VStack flex={1} items="center" justify="center">
                <Text size={28} weight="600">
                    mwro
                </Text>
            </VStack>
            <VStack gap={10}>
                <Button onPress={() => router.push('/home')} variant="primary">
                    Acessar Conta
                </Button>
                <Button onPress={() => router.push('/sign_up')}>
                    Criar Conta
                </Button>
            </VStack>
        </VStack>
    )
}

import { Link, useRouter } from "expo-router";
import { Button, Text, YStack, Input, XStack} from "tamagui";

export default function AccessAcount() {

const router = useRouter();

  return (
    <YStack fullscreen justifyContent="center" alignItems="center" padding="$4" gap="$8">
        <YStack justifyContent="center" alignItems="center" flex={1} marginTop="50%" space="$10">
         <Text fontSize="$9" fontWeight="800">Acessar Conta</Text>
            <YStack justifyContent="center" alignItems="flex-start" flex={1} space="$4">
                <YStack justifyContent="center" alignItems="flex-start" space="$2">
                    <XStack>
                        <Text fontSize="$3" fontWeight="800">E-mail</Text>
                        <Text color="red"> *</Text>
                    </XStack>
                    <XStack alignItems="center">
                        <Input flex={1} w="$5" h="$5" placeholder="exemplo@email.com" />
                    </XStack>
                </YStack>
                <YStack justifyContent="center" alignItems="flex-start" space="$2">
                    <XStack>
                        <Text fontSize="$3" fontWeight="800">Senha</Text> 
                        <Text color="red"> *</Text>
                    </XStack>
                    <XStack alignItems="center">
                        <Input flex={1} w="$5" h="$5" placeholder="•••••••" />
                    </XStack>
                </YStack>
            </YStack> 
            <YStack justifyContent="flex-end" alignItems="center" flex={1} space="$4">
                <XStack>
                    <Link href="/" asChild>
                        <Button backgroundColor="#000" color="#FFF" flex={1}>
                            Próximo
                        </Button>
                    </Link>
                </XStack>
                <XStack>
                    <Button flex={1} onPress={() => router.back()}>Voltar</Button>
                </XStack>
           </YStack> 
        </YStack>
    </YStack>
  );
}
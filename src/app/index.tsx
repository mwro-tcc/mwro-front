import { StatusBar } from "expo-status-bar";
import Button from "../ui/Button";
import VStack from "../ui/VStack";
import { useRouter } from "expo-router";
import Text from "../ui/Text";

export default function App() {
  const router = useRouter();

  const go_to_signin_page = () => router.push("/sign_in");
  const go_to_signup_page = () => router.push("/sign_up");

  return (
    <VStack gap={10} p={20} justify="end" flex={1}>
      <StatusBar style="auto" />
      <VStack flex={1} items="center" justify="center">
        <Text size={28} weight="600">
          mwro
        </Text>
      </VStack>
      <VStack gap={10}>
        <Button onPress={go_to_signin_page} variant="primary">
          Acessar Conta
        </Button>
        <Button onPress={go_to_signup_page}>Criar Conta</Button>
      </VStack>
    </VStack>
  );
}

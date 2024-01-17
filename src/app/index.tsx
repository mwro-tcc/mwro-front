import { StatusBar } from "expo-status-bar";
import Button from "../ui/Button";
import VStack from "../ui/VStack";
import { Text } from "react-native";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  const go_to_signin_page = () => router.push("/auth/sign_in");
  const go_to_signup_page = () => router.push("/auth/sign_up");

  return (
    <VStack gap={10} p={20} justify="end" flex={1}>
      <StatusBar style="auto" />
      <VStack flex={1} items="center" justify="center">
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
          }}
        >
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

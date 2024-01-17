import { SafeAreaView } from "react-native-safe-area-context";
import VStack from "../../ui/VStack";
import { Slot, useRouter } from "expo-router";
import Button from "../../ui/Button";
import { Text } from "react-native";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <VStack gap={10} p={20} flex={1} justify="center">
      <VStack gap={10} flex={1} justify="center" items="center">
        <Text
          style={{
            fontSize: 28,
            fontWeight: "600",
          }}
        >
          Acessar Conta
        </Text>
      </VStack>
      <VStack gap={10} flex={1}>
        <Slot />
      </VStack>
      <Button variant="primary">Próximo</Button>
      <Button onPress={() => router.back()}>Voltar</Button>
    </VStack>
  );
}

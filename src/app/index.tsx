import { StatusBar } from "expo-status-bar";
import Button from "../ui/Button";
import VStack from "../ui/VStack";
import { Text } from "react-native";

export default function App() {
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
        <Button variant="primary">Acessar Conta</Button>
        <Button>Criar Conta</Button>
      </VStack>
    </VStack>
  );
}

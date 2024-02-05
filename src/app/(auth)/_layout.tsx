import VStack from "../../ui/VStack";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import { useAuth } from "../../hooks/useAuth";
import { ActivityIndicator } from "react-native";

type screenObject = {
  screen: string;
  name: string;
  onPress: () => Promise<void>;
};

export default function AuthLayout() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { signIn, signUp, loading, user } = useAuth();

  const authActions = [
    {
      screen: "sign_up",
      name: "Criar Conta",
      onPress: async () => await signUp(),
    },
    {
      screen: "sign_in",
      name: "Acessar Conta",
      onPress: async () => await signIn(),
    },
  ];

  const screenByParams = authActions.find(
    (screenObj: screenObject) => screenObj.screen === params.screen
  );

  async function handleOnPress() {
    try {
      await screenByParams!.onPress();
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <VStack gap={10} p={20} flex={1} justify="center">
      <VStack gap={10} flex={2} justify="center" items="center">
        <Text size={28} weight="600">
          {screenByParams!.name}
        </Text>
      </VStack>
      <VStack gap={10} flex={3}>
        <Slot />
      </VStack>
      <Button variant="primary" onPress={handleOnPress}>
        {loading ? <ActivityIndicator /> : "Próximo"}
      </Button>
      <Button onPress={() => router.back()}>Voltar</Button>
    </VStack>
  );
}

import { StatusBar } from "expo-status-bar";
import { Button, TamaguiProvider, Text, YStack } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  return loaded ? (
    <TamaguiProvider config={tamaguiConfig}>
      <StatusBar style="auto" />
      <YStack fullscreen justifyContent="flex-end" padding="$4" gap="$4">
        <YStack justifyContent="center" alignItems="center" flex={1}>
          <Text fontSize="$9">mwro</Text>
        </YStack>
        <Button backgroundColor="#000" color="#FFF">
          Acessar Conta
        </Button>
        <Button>Criar Conta</Button>
      </YStack>
    </TamaguiProvider>
  ) : null;
}

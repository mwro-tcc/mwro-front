import { Pressable, Text } from "react-native";
import { Link } from "expo-router";
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
        <Link href="/account/access" asChild>
        <Button backgroundColor="#000" color="#FFF">
          Acessar Conta
        </Button>
        </Link>
        <Link href="/account/create" asChild>
        <Button>Criar Conta</Button>
        </Link>
      </YStack>
    </TamaguiProvider>
  ) : null;
}

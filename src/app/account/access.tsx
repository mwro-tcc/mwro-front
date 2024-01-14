import { useRouter } from "expo-router";
import { View } from "react-native";
import Button from "../../ui/Button";

export default function AccessAcount() {
  const router = useRouter();

  return (
    <View>
      <Button variant="primary">Próximo</Button>
      <Button variant="secondary" onPress={() => router.back()}>
        Voltar
      </Button>
    </View>
  );
}

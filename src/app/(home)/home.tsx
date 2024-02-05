import { useAuth } from "../../hooks/useAuth";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import VStack from "../../ui/VStack";

export default function Home() {
  const { signOut } = useAuth();
  return (
    <VStack flex={1} items="center" justify="center">
      <Text size={28} weight="600">
        Home
      </Text>
      <Button variant="primary" onPress={signOut}>
        Sair
      </Button>
    </VStack>
  );
}

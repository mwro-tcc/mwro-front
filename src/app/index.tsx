import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <>
    <Link href="/account/access" asChild>
      <Pressable>
        <Text>Acessar Conta</Text>
      </Pressable>
    </Link>
    <Link href="/account/create" asChild>
    <Pressable>
      <Text>Criar Conta</Text>
    </Pressable>
  </Link>
  </>
  );
}
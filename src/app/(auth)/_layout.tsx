import VStack from "../../ui/VStack";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import Text from "../../ui/Text";
import { t } from "../../../translations";

const title = {
  sign_up: t("authentication.sign_up.title"),
  sign_in: t("authentication.sign_in.title"),
};

export default function AuthLayout() {
  const params = useLocalSearchParams<{ screen: keyof typeof title }>();

  return (
    <VStack gap={10} p={20} flex={1} h="100%">
      <VStack gap={10} justify="center" items="center" h="25%">
        <Text size={28} weight="600">
          {title[params.screen]}
        </Text>
      </VStack>
      <VStack flex={1}>
        <Slot />
      </VStack>
    </VStack>
  );
}
import { Slot } from "expo-router";
import ToastProvider from "../ui/toast/ToastProvider";
import VStack from "../ui/VStack";

export default function Root() {
  return (
    <VStack h="100%">
      <ToastProvider />
      <Slot />
    </VStack>
  );
}

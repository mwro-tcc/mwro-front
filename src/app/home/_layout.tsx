import { Slot } from "expo-router";
import AuthGuard from "../../guards/AuthGuard";

export default function HomeLayout() {
  return (
    <AuthGuard>
      <Slot />
    </AuthGuard>
  );
}

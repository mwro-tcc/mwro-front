import { Slot, router } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { useCallback, useEffect } from "react";

export default function Root() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

import { ReactNode, useEffect, useState } from "react";
import AuthSession from "../api/local/auth_session";
import useAsync from "../hooks/useAsync";
import { useRouter } from "expo-router";
import Text from "../ui/Text";
import Lib from "../lib";

export default ({ children }: { children: ReactNode }) => {
  const { loading, data: token } = useAsync(async () =>
    Lib.error_callback(await AuthSession.get(), console.error)
  );

  const router = useRouter();

  if (loading) return <Text>Loading</Text>;
  if (token) return children;
  router.replace("/");
};

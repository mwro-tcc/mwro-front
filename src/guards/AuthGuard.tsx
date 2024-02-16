import { ReactNode, useEffect, useState } from "react";
import AuthSession from "../api/local/auth_session";
import useAsync from "../hooks/useAsync";

export default ({ children }: { children: ReactNode }) => {
  const { loading, data: token } = useAsync(AuthSession.get);

  if (loading) return <p>Loading</p>;
  if (token) return children;
  return <p>Not Authenticated</p>;
};

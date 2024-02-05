import { useContext } from "react";

import { authGuard } from "../guard/AuthGuard";
import { reloadServices } from "../services/axiosServer";
import { AuthContext } from "../contexts/AuthContext";

type User = {
  uuid: string;
  name: string;
  email: string;
};

export function useAuth() {
  const authHelpers = useContext(AuthContext);

  const { setUser, setLoading } = useContext(AuthContext);

  async function signIn() {
    setLoading(true);
    try {
      const { user, token } = await authGuard.signIn("email", "password");
      await authGuard.setUserDataToLocalStorage(user, token);
      setUser(user);
      reloadServices();
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  async function signUp() {
    setLoading(true);
    try {
      const { user, token } = await authGuard.signUp(
        "name",
        "email",
        "password"
      );
      await authGuard.setUserDataToLocalStorage(user, token);
      setUser(user);
      reloadServices();
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await authGuard.signOut();
  }

  return {
    ...authHelpers,
    signIn,
    signOut,
    signUp,
  };
}

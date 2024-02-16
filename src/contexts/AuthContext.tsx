import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

import { authGuard } from "../guards/AuthGuard";
import { reloadServices } from "../api/axiosServer";
import { useRouter } from "expo-router";

type User = {
  uuid: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function loadStorageData() {
    const { user: storagedUser, token: storagedToken } =
      await authGuard.getUserDataFromLocalStorage();

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      setLoading(false);
    }
  }

  const handleUserAuth = useCallback(async () => {
    if (user.uuid) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    handleUserAuth();
  }, [handleUserAuth]);

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

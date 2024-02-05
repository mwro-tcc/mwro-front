import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  uuid: string;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class AuthGuard {
  authServerApi: AxiosInstance;

  constructor() {
    this.authServerApi = this.initApiServer();
  }

  initApiServer() {
    return (this.authServerApi = axios.create({
      baseURL: "localhost",
    }));
  }

  async signUp(name: string, email: string, password: string) {
    return new Promise<AuthResponse>((resolve) =>
      setTimeout(() => {
        resolve({
          user: {
            uuid: "123",
            name: "Nome",
            email: "email@email.com",
          },
          token: "tokentokentokentoken",
        });
      }, 2000)
    );

    //return await this.authServerApi.post<AuthResponse>("/user/sign-up", {...
  }

  async signIn(email: string, password: string) {
    return new Promise<AuthResponse>((resolve) =>
      setTimeout(() => {
        resolve({
          user: {
            uuid: "123",
            name: "Nome",
            email: "email@email.com",
          },
          token: "tokentokentokentoken",
        });
      }, 2000)
    );

    //return await this.authServerApi.post<AuthResponse>("/user/sign-in", {...
  }

  async signOut() {
    await AsyncStorage.removeItem("@App:user");
    await AsyncStorage.removeItem("@App:token");
  }

  async setUserDataToLocalStorage(user: User, token: string) {
    await this.setUserToLocalStorage(user);
    await this.setTokenToLocalStorage(token);
  }

  async getUserDataFromLocalStorage() {
    const user = await AsyncStorage.getItem("@App:user");
    const token = await AsyncStorage.getItem("@App:token");
    return { user, token };
  }

  async setUserToLocalStorage(user: User) {
    await AsyncStorage.setItem("@App:user", JSON.stringify(user));
  }

  async setTokenToLocalStorage(token: string) {
    await AsyncStorage.setItem("@App:token", token);
  }

  async getTokenFromLocalStorage() {
    return await AsyncStorage.getItem("@App:token");
  }
}

export const authGuard = new AuthGuard();

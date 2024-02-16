import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthSession = {
  async save(token: string) {
    await AsyncStorage.setItem("@App:token", token);
  },
  async get() {
    return await AsyncStorage.getItem("@App:token");
  },
  async destroy() {
    return await AsyncStorage.removeItem("@App:token");
  },
};

export default AuthSession;

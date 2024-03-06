import AsyncStorage from "@react-native-async-storage/async-storage";
import Lib from "../../lib";

const AuthSession = {
  async save(token: string) {
    return await Lib.safe_call(AsyncStorage.setItem, ["@App:token", token]);
  },
  async get() {
    return await Lib.safe_call(AsyncStorage.getItem, ["@App:token"]);
  },
  async destroy() {
    return await Lib.safe_call(AsyncStorage.removeItem, ["@App:token"]);
  },
};

export default AuthSession;

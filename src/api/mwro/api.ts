import axios, { AxiosInstance, AxiosResponse } from "axios";
import AuthSession from "../local/auth_session";

const Api = axios.create({
  baseURL: "localhost",
}) as AxiosInstance & {
  [module: string]: any;
};

Api.interceptors.request.use(async (config) => {
  await AuthSession.get()
    .then((token) => (config.headers.authorization = `Bearer ${token}`))
    .catch((e) => console.error(e));

  return config;
});

export default Api;

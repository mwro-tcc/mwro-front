import axios, { AxiosInstance } from "axios";
import { authGuard } from "../guard/AuthGuard";

export class AxiosServer {
  server: Promise<AxiosInstance>;
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.server = this.initServer();
  }

  getAuthorizationHeader = async () => {
    const token = await authGuard.getTokenFromLocalStorage();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return null;
  };

  public async initServer() {
    return axios.create({
      baseURL: this.apiUrl,
      headers: {
        "Content-Type": "application/json",
        ...(await this.getAuthorizationHeader()),
      },
    });
  }
}

export let mwroApi = new AxiosServer("localhost");

export const reloadServices = () => {
  mwroApi = new AxiosServer("localhost");
};

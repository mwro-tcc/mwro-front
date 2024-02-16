import Lib from "../../lib";
import safe_call from "../../lib/safe_call";
import AuthSession from "../local/auth_session";
import Api from "./api";

type AuthResponse = {
  user: User;
  token: string;
};

type User = {
  uuid: string;
  name: string;
  email: string;
};

const endpoints = {
  sign_up: "/user/sign-up",
  sign_in: "/user/sign-in",
};

const Auth = {
  async sign_up(data: { name: string; email: string; password: string }) {
    const res = await Lib.safe_call(Api.post<AuthResponse>, [
      endpoints.sign_up,
      data,
    ]);

    return Lib.handle_error(res, console.error)?.data;
  },
  async sign_in(data: { email: string; password: string }) {
    const res = await Lib.safe_call(Api.post<AuthResponse>, [
      endpoints.sign_up,
      data,
    ]);

    return Lib.handle_error(res, console.error)?.data;
  },
  async sign_out() {
    Lib.handle_error(
      await Lib.safe_call(AuthSession.destroy, []),
      console.error
    );
  },
};

export default Auth;

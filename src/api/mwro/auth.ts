import { SignInForm, SignUpForm, User } from '../../types/user'
import Lib from '../../lib'
import AuthSession from '../local/auth_session'
import Api from './api'
import Routes from './routes'

type AuthResponse = {
  user: User
  token: string
}

const Auth = {
  async sign_up(data: SignUpForm) {
    return await Lib.safe_call(Api.post<AuthResponse>, [
      Routes.Auth.sign_up,
      data
    ])
  },
  async sign_in(data: SignInForm) {
    return await Lib.safe_call(Api.post<AuthResponse>, [
      Routes.Auth.sign_in,
      data
    ])
  },
  async sign_out() {
    return await Lib.safe_call(AuthSession.destroy, [])
  }
}

export default Auth

import Local from '../api/local'
import Lib from '../lib'
import { SignInForm, SignUpForm } from '../types/user'
import { useRouter } from 'expo-router'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Toast from '../lib/toast'
import { Auth } from '@api/mwro'

export default () => {
  const router = useRouter()

  const { getItem } = useAsyncStorage('@App:token')

  const on_success = async (token: string) => {
    const [_, err] = await Local.AuthSession.save(token)
    if (err) console.error(err)
    else router.replace('/(main)')
  }

  const sign_in = async (data: SignInForm) => {
    // console.log('chamando')
    const [res, err] = await Auth.sign_in(data)
    //console.log('AQUI sign_in')
    // if (err?.response.status === 400) {
    //   Toast.error('Credenciais Inválidas')
    // } else if (err) {
    //   console.error(err)
    //   Toast.error(err?.message)
    // }

    if (res) on_success(res.data.token)
  }

  const sign_up = async (data: SignUpForm) => {
    if (data.password !== data.confirm_password) {
      Toast.error('A senha utilizada deve ser a mesma nos dois campos')
      return
    }

    const res = Lib.error_callback(await Auth.sign_up(data), Toast.error)

    if (res) on_success(res.data.token)
  }

  const sign_out = async () => {
    Lib.error_callback(
      await Lib.safe_call(Local.AuthSession.destroy, []),
      console.error
    )
    router.replace('/welcome')
  }

  return {
    sign_in,
    sign_up,
    sign_out,
    is_authenticated: !!getItem()
  }
}

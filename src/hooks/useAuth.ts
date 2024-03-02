import Local from '../api/local'
import Mwro from '../api/mwro'
import Lib from '../lib'
import { SignInForm, SignUpForm } from '../types/user'
import { useRouter } from 'expo-router'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import Toast from '../ui/toast/toast'
import { t } from '../../translations'

export default () => {
    const router = useRouter()

    const { getItem } = useAsyncStorage('@App:token')

    const on_success = async (token: string) => {
        const [_, err] = await Local.AuthSession.save(token)
        if (err) console.error(err)
        else router.replace('/home')
    }

    const sign_in = async (data: SignInForm) => {
        const res = Lib.error_callback(
            await Mwro.Auth.sign_in(data),
            Toast.error,
        )
        if (res) on_success(res.data.jwt)
    }

    const sign_up = async (data: SignUpForm) => {
        if (data.password !== data.confirm_password)
            Toast.error(t('authentication.errors.passwords_dont_match'))

        const res = Lib.error_callback(
            await Mwro.Auth.sign_up(data),
            Toast.error,
        )

        if (res) on_success(res.data.jwt)
    }

    const sign_out = async () => {
        Lib.error_callback(
            await Lib.safe_call(Local.AuthSession.destroy, []),
            console.error,
        )
    }

    return {
        sign_in,
        sign_up,
        sign_out,
        is_authenticated: !!getItem(),
    }
}

import VStack from '@ui/VStack'
import { Redirect, Slot, useLocalSearchParams } from 'expo-router'
import Text from '@ui/Text'
import SafeKeyboardScrollView from '@ui/SafeKeyboardScrollView'
import error_callback from '@lib/error_callback'
import AuthSession from '@api/local/auth_session'
import useAsync from '@hooks/useAsync'
import { ActivityIndicator, SafeAreaView } from 'react-native'

const title = {
  sign_up: 'Criar Conta',
  sign_in: 'Acessar Conta'
}

export default function AuthLayout() {
  const { data: token, loading } = useAsync(async () =>
    error_callback(await AuthSession.get(), console.error)
  )

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />

  if (token) return <Redirect href='/(main)' />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  )
}

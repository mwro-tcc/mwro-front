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

  const params = useLocalSearchParams<{ screen: keyof typeof title }>()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />

  if (token) return <Redirect href='/(main)' />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeKeyboardScrollView>
        <VStack gap={10} p={20} flex={1} h='100%'>
          <VStack gap={10} justify='center' items='center' h='25%'>
            <Text size={28} weight='600'>
              {title[params.screen]}
            </Text>
          </VStack>
          <VStack flex={1}>
            <Slot />
          </VStack>
        </VStack>
      </SafeKeyboardScrollView>
    </SafeAreaView>
  )
}

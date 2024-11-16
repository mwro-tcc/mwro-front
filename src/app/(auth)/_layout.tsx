import useAuth from '@hooks/useAuth'
import colors from '@ui/config/colors'
import { Redirect, Slot } from 'expo-router'
import { ActivityIndicator, SafeAreaView } from 'react-native'

export default function AuthLayout() {
  const { token, loading } = useAuth()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (token) return <Redirect href='/main/(explore)' />

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Slot />
    </SafeAreaView>
  )
}

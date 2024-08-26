import useAuth from '@hooks/useAuth'
import { Slot, router } from 'expo-router'
import { ActivityIndicator, SafeAreaView } from 'react-native'

export default function AuthLayout() {
  const { token, loading } = useAuth()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (token) router.replace('/(main)')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot />
    </SafeAreaView>
  )
}

import { Redirect, Tabs, useRouter } from 'expo-router'
import useAsync from '@hooks/useAsync'
import AuthSession from '@api/local/auth_session'
import { ActivityIndicator } from 'react-native'
import error_callback from '@lib/error_callback'
import IconButton from '@ui/IconButton'

export default function MainLayout() {
  const { data: token, loading } = useAsync(async () =>
    error_callback(await AuthSession.get(), console.error)
  )

  const router = useRouter()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />

  if (!token) return <Redirect href='/welcome' />

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <IconButton
              icon='home'
              size={size}
              color={color}
              onPress={() => router.replace('/')}
            />
          )
        }}
      />
      <Tabs.Screen
        name='communities'
        options={{
          title: 'Comunidades',
          tabBarIcon: ({ size, color }) => (
            <IconButton
              icon='people-alt'
              size={size}
              fromCommunity={false}
              color={color}
              onPress={() => router.replace('/communities')}
            />
          )
        }}
      />
      <Tabs.Screen
        name='stores'
        options={{
          title: 'Lojas',
          tabBarIcon: ({ size, color }) => (
            <IconButton
              icon='store'
              size={size}
              color={color}
              onPress={() => router.replace('/stores')}
            />
          )
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Conta',
          tabBarIcon: ({ size, color }) => (
            <IconButton
              icon='person'
              size={size}
              fromCommunity={false}
              color={color}
              onPress={() => router.replace('/account')}
            />
          )
        }}
      />
      <Tabs.Screen
        name='products'
        options={{
          href: null
        }}
      />
    </Tabs>
  )
}

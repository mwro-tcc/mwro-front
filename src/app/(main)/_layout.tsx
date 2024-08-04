import { Redirect, Tabs } from 'expo-router'
import useAsync from '@hooks/useAsync'
import AuthSession from '@api/local/auth_session'
import { ActivityIndicator } from 'react-native'
import error_callback from '@lib/error_callback'
import { MaterialIcons } from '@expo/vector-icons'

export default function MainLayout() {
  const { data: token, loading } = useAsync(async () =>
    error_callback(await AuthSession.get(), console.error)
  )

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
            <MaterialIcons name='home' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='communities'
        options={{
          title: 'Comunidades',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='people-alt' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='stores'
        options={{
          title: 'Lojas',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='store' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Conta',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='person' size={size} color={color} />
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

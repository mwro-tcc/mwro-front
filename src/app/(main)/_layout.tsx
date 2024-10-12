import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import useAuth from '@hooks/useAuth'

export default function MainLayout() {
  const { token, loading } = useAuth()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (!token) {
    return <Redirect href='/(auth)/welcome' />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explorar',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='person' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='favorites'
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='person' size={size} color={color} />
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
    </Tabs>
  )
}

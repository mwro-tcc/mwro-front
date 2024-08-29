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
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='home' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='(communities)'
        options={{
          title: 'Comunidades',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='people-alt' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='(stores)'
        options={{
          title: 'Lojas',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name='store' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='(account)'
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

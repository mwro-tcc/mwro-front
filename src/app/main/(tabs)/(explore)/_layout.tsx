import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='stores/[id]/products/[id]/index'
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack>
  )
}

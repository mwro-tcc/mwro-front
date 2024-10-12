import { Stack } from 'expo-router'

export default function CommunitiesLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='create' />
      <Stack.Screen name='[id]/index' />
      <Stack.Screen
        name='products/[id]'
        options={{
          presentation: 'modal'
        }}
      />
    </Stack>
  )
}

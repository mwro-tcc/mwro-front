import Text from '@ui/Text'
import { Stack } from 'expo-router'

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Minha Conta'
        }}
      />
    </Stack>
  )
}

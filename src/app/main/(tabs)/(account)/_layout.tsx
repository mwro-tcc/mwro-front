import colors, { ui } from '@ui/config/colors'
import { Stack } from 'expo-router'

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Minha Conta',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: ui.fg
          }
        }}
      />
      <Stack.Screen
        name='edit_name'
        options={{
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name='edit_phone'
        options={{
          presentation: 'modal'
        }}
      />

      <Stack.Screen
        name='stores/[id]/products/[id]/index'
        options={{ presentation: 'modal' }}
      />
    </Stack>
  )
}

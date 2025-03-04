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
    </Stack>
  )
}

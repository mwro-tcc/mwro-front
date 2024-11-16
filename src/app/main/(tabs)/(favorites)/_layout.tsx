import colors from '@ui/config/colors'
import { Stack } from 'expo-router'

export default function FavoritesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'Favoritos',
          contentStyle: { backgroundColor: colors.background }
        }}
      />
    </Stack>
  )
}

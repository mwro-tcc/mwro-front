import { Stack, router } from 'expo-router'
import HeaderTextButton from './HeaderTextButton'
import colors from './config/colors'
import { useState } from 'react'
import VStack from './VStack'
import { TextInput } from 'react-native'

export default function FormModal(props: {
  initialValue: string
  actionLabel: string
  cancelLabel: string
  onSubmit?: (value: string) => void
}) {
  const { initialValue, actionLabel, cancelLabel, onSubmit } = props

  const [value, setValue] = useState<string>(initialValue)

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    onSubmit?.(value)
  }

  return (
    <VStack p={16} flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Editar nome',
          headerLeft: () => (
            <HeaderTextButton
              onPress={() => {
                router.back()
              }}
            >
              {cancelLabel}
            </HeaderTextButton>
          ),
          headerRight: () => (
            <HeaderTextButton
              onPress={handleSubmit}
              style={{
                fontWeight: 600
              }}
            >
              {actionLabel}
            </HeaderTextButton>
          )
        }}
      />
      <TextInput
        autoFocus
        multiline
        style={{
          padding: 12,
          fontSize: 16,
          backgroundColor: colors.ui_1,
          flex: 1,
          borderRadius: 8
        }}
        value={value}
        onChange={handleChange}
      />
    </VStack>
  )
}

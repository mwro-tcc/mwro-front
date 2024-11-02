import { Stack, router } from 'expo-router'
import HeaderTextButton from './HeaderTextButton'
import colors from './config/colors'
import { useState } from 'react'
import VStack from './VStack'
import { TextInput } from 'react-native'
import { formatPhoneNumber } from './PhoneInput'

import { MaskedTextInput } from 'react-native-mask-text'

export default function FormModal(props: {
  initialValue: string
  actionLabel: string
  cancelLabel: string
  attributeLabel: string
  onSubmit?: (value: string) => Promise<any>
  inputType?: 'phone'
}) {
  const {
    initialValue,
    actionLabel,
    cancelLabel,
    onSubmit,
    attributeLabel,
    inputType
  } = props

  const [value, setValue] = useState<string>(initialValue)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (_value: any) => {
    setValue(_value)
  }

  const handleSubmit = async () => {
    setLoading(true)
    onSubmit?.(value)
      .then(() => {
        router.back()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const commonInputProps = {
    autoFocus: true,
    multiline: true,
    style: {
      padding: 12,
      fontSize: 16,
      backgroundColor: colors.ui_1,
      flex: 1,
      borderRadius: 8
    },
    defaultValue: value
  }

  const renderInput = () => {
    switch (inputType) {
      case 'phone':
        return (
          <MaskedTextInput
            onChangeText={(text) => {
              const formattedPhone = formatPhoneNumber(text)
              handleChange(formattedPhone)
            }}
            mask='+99 (99) 99999-9999'
            keyboardType='numeric'
            {...commonInputProps}
          />
        )
      default:
        return <TextInput onChangeText={handleChange} {...commonInputProps} />
    }
  }

  return (
    <VStack p={16} flex={1}>
      <Stack.Screen
        options={{
          headerTitle: `Editar ${attributeLabel}`,
          contentStyle: { backgroundColor: colors.background },
          headerLeft: () => (
            <HeaderTextButton
              disabled={loading}
              onPress={() => {
                router.back()
              }}
            >
              {cancelLabel}
            </HeaderTextButton>
          ),
          headerRight: () => (
            <HeaderTextButton
              disabled={loading}
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
      {renderInput()}
    </VStack>
  )
}

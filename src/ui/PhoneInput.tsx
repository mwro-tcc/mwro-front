/* eslint-disable react/display-name */
import React from 'react'
import { StyleSheet, TextInputProps, View, ViewStyle } from 'react-native'
import Text from './Text'
import colors from './config/colors'
import HStack from './HStack'
import Show from './Show'
import VStack from './VStack'
import { MaskedTextInput } from 'react-native-mask-text'
import { Control, useController } from 'react-hook-form'
import rounded from './config/rounded'
import spacings from './config/spacings'

type Variants = {
  default: ViewStyle
}

const base_form_variant: ViewStyle = {
  borderRadius: rounded.sm,
  padding: spacings.md,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const input_variants = StyleSheet.create<Variants>({
  default: {
    ...base_form_variant,
    backgroundColor: colors.ui_1,
    borderRadius: rounded.sm
  }
})

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/[^\d+]/g, '')
}

export default ({
  variant = 'default',
  label,
  required = false,
  style,
  name,
  control,
  ...props
}: TextInputProps & {
  name: string
  control: Control<any, any>
  variant?: keyof Variants
  label?: string
  required?: boolean
  height?: number
}) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
    rules: { required }
  })

  return (
    <>
      <Show when={label}>
        <VStack gap={3}>
          <HStack px={8} gap={3}>
            <Text weight='600' size={12}>
              {label}
            </Text>
            <Show when={required}>
              <Text weight='600' size={12} color={colors.red_6}>
                *
              </Text>
            </Show>
          </HStack>
          <View>
            <MaskedTextInput
              value={field.value.toString()}
              onChangeText={(text) => {
                // Aplica a formatação e atualiza o valor
                const formattedPhone = formatPhoneNumber(text)
                field.onChange(formattedPhone)
              }}
              mask='+99 (99) 99999-9999'
              keyboardType='numeric'
              {...props}
              style={{
                ...input_variants[variant],
                ...(style as ViewStyle)
              }}
            />
          </View>
        </VStack>
      </Show>
      <Show when={!label}>
        <MaskedTextInput
          value={field.value.toString()}
          onChangeText={(text) => {
            // Aplica a formatação e atualiza o valor
            const formattedPhone = formatPhoneNumber(text)
            field.onChange(formattedPhone)
          }}
          mask='+99 (99) 99999-9999'
          keyboardType='numeric'
          {...props}
          style={{
            ...input_variants[variant],
            ...(style as ViewStyle)
          }}
        />
      </Show>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10
  }
})

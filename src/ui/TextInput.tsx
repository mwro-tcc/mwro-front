import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native'
import rounded from './config/rounded'
import shadows from './config/shadows'
import spacings from './config/spacings'
import colors from './config/colors'
import VStack from './VStack'
import Show from './Show'
import HStack from './HStack'
import Text from './Text'
import { Control, useController } from 'react-hook-form'

type Variants = {
  default: ViewStyle
}

const base_form_variant: ViewStyle = {
  borderRadius: rounded.sm,
  padding: spacings.md,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...shadows.sm
}

const input_variants = StyleSheet.create<Variants>({
  default: {
    ...base_form_variant,
    backgroundColor: colors.ui_1,
    borderColor: colors.ui_5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: rounded.sm
  }
})

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
          <HStack px={5} gap={3}>
            <Text weight='600' size={12}>
              {label}
            </Text>
            <Show when={required}>
              <Text weight='600' size={12} color={colors.red_6}>
                *
              </Text>
            </Show>
          </HStack>
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            {...props}
            style={{
              ...input_variants[variant],
              ...(style as ViewStyle)
            }}
          />
        </VStack>
      </Show>
      <Show when={!label}>
        <TextInput
          value={field.value}
          onChangeText={field.onChange}
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

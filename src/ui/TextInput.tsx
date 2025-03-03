/* eslint-disable react/display-name */
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle
} from 'react-native'
import rounded from './config/rounded'
import spacings from './config/spacings'
import colors from './config/colors'
import VStack from './VStack'
import Show from './Show'
import HStack from './HStack'
import Text from './Text'
import { Control, useController, useForm } from 'react-hook-form'
import {
  StyleShorthands,
  parse_style_shorthands
} from './types/style_shorthands'
import { forwardRef } from 'react'

type Variants = {
  default: ViewStyle
}

const base_form_variant: ViewStyle = {
  borderRadius: rounded.sm,
  padding: spacings.md,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#0000001A',
  borderStyle: 'solid'
}

const input_variants = StyleSheet.create<Variants>({
  default: {
    ...base_form_variant,
    backgroundColor: colors.ui_1
  }
})

type Props = TextInputProps &
  StyleShorthands &
  Partial<{
    name: string
    control: Control<any, any>
    variant: keyof Variants
    label: string
    required: boolean
    height: number
  }>

const TextInput = forwardRef((props: Props, ref) => {
  const {
    variant = 'default',
    label,
    required = false,
    style,
    name,
    control,
    value,
    onChangeText
  } = props

  const { control: placeholderControl } = useForm()

  const { field } = useController({
    control: control ?? placeholderControl,
    defaultValue: '',
    name: name ?? '',
    rules: { required }
  })

  return (
    <>
      <Show when={label}>
        <VStack gap={3}>
          <HStack px={7} gap={2} items='center'>
            <Text weight='600' size={11}>
              {label}
            </Text>
            <Show when={required}>
              <Text weight='700' size={13} color={colors.red_5}>
                *
              </Text>
            </Show>
          </HStack>
          <RNTextInput
            value={value ?? field.value.toString()}
            onChangeText={onChangeText ?? field.onChange}
            {...props}
            style={{
              ...input_variants[variant],
              ...(style as ViewStyle)
            }}
          />
        </VStack>
      </Show>
      <Show when={!label}>
        <RNTextInput
          value={value ?? field.value.toString()}
          onChangeText={onChangeText ?? field.onChange}
          {...props}
          style={{
            ...input_variants[variant],
            ...(style as ViewStyle),
            ...parse_style_shorthands(props)
          }}
        />
      </Show>
    </>
  )
})

export default TextInput

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import colors from './config/colors'
import shadows from './config/shadows'
import rounded from './config/rounded'
import spacings from './config/spacings'

type Variants = {
  primary: ViewStyle
  default: ViewStyle
  disabled: ViewStyle
  destructive: ViewStyle
}

const base_button_variant: ViewStyle = {
  borderRadius: rounded.sm,
  padding: spacings.md,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const button_variants = StyleSheet.create<Variants>({
  primary: {
    ...base_button_variant,
    backgroundColor: colors.ui_9
  },
  default: {
    ...base_button_variant,
    backgroundColor: colors.ui_2,
    borderRadius: rounded.sm
  },
  disabled: {
    ...base_button_variant,
    backgroundColor: colors.ui_6,
    borderColor: colors.ui_5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: rounded.sm
  },
  destructive: {
    ...base_button_variant,
    backgroundColor: colors.red_6
  }
})

const text_variants = StyleSheet.create<Variants>({
  primary: {
    fontWeight: '700',
    color: colors.ui_1
  },
  destructive: {
    fontWeight: '700',
    color: colors.ui_1
  },
  default: {
    fontWeight: '700',
    color: colors.ui_8
  },
  disabled: {
    fontWeight: '700',
    color: colors.ui_1
  }
})

export default ({
  children,
  variant = 'default',
  style,
  disabled = false,
  ...props
}: TouchableOpacityProps & {
  children: React.ReactNode
  variant?: keyof Variants
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={{
        ...button_variants[disabled ? 'disabled' : variant],
        ...(style as ViewStyle)
      }}
    >
      {typeof children === 'string' ? (
        <Text style={text_variants[disabled ? 'disabled' : variant]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import colors from './config/colors'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import rounded from './config/rounded'
import spacings from './config/spacings'

type Variants = {
  primary: ViewStyle
  text: ViewStyle
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
    backgroundColor: colors.primary
  },
  text: {
    fontWeight: '700',
    color: colors.ui_1
  },
  default: {
    ...base_button_variant,
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
  text: {
    fontWeight: '400',
    fontSize: 17,
    color: colors.primary
  },
  destructive: {
    fontWeight: '700',
    color: colors.ui_1
  },
  default: {
    fontWeight: '700',
    color: colors.primary
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
  icon,
  disabled = false,
  ...props
}: TouchableOpacityProps & {
  children: React.ReactNode
  variant?: keyof Variants
  icon?: string
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
      {icon && (
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={colors.ui_1}
        />
      )}
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

import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import Text from './Text'
import colors from './config/colors'
import { MaterialIcons } from '@expo/vector-icons'

const base_style: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: 8,
  paddingHorizontal: 16,
  height: 48,
  paddingVertical: 10
}

function ActionListItem({
  hasArrow = true,
  color = colors.ui_9,
  children,
  style,
  disabled = false,
  ...props
}: TouchableOpacityProps & {
  hasArrow?: boolean
  children: React.ReactNode
  color?: string
}) {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={{
        ...base_style,
        ...(style as ViewStyle)
      }}
    >
      {typeof children === 'string' ? (
        <Text size={16} color={color}>
          {children}
        </Text>
      ) : (
        children
      )}
      {hasArrow && !disabled && (
        <MaterialIcons
          name='keyboard-arrow-right'
          size={24}
          color={colors.ui_6}
        />
      )}
    </TouchableOpacity>
  )
}

export default ActionListItem

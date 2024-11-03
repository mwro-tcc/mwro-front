import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import Text from './Text'
import colors from './config/colors'
import { MaterialIcons } from '@expo/vector-icons'
import VStack from './VStack'
import HStack from './HStack'

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
  textSize = 16,
  ...props
}: TouchableOpacityProps & {
  hasArrow?: boolean
  children: React.ReactNode
  color?: string
  textSize?: number
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
        <HStack flex={1}>
          <Text
            size={textSize}
            color={color}
            componentProps={{
              numberOfLines: 1,
              ellipsizeMode: 'tail'
            }}
          >
            {children}
          </Text>
        </HStack>
      ) : (
        children
      )}
      {hasArrow && !disabled && (
        <VStack>
          <MaterialIcons
            name='keyboard-arrow-right'
            size={24}
            color={colors.ui_6}
            style={{ marginLeft: 24 }}
          />
        </VStack>
      )}
    </TouchableOpacity>
  )
}

export default ActionListItem

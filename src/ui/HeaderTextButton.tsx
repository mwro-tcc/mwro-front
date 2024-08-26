import { TouchableOpacity } from 'react-native-gesture-handler'
import Text from './Text'
import colors from './config/colors'
import { TextStyle } from 'react-native'

type Props = {
  onPress?: () => void
  color?: string
  style?: TextStyle
  size?: number
  children?: string
  disabled?: boolean
}

export default function HeaderTextButton(props: Props) {
  const {
    color = colors.blue_7,
    onPress,
    style,
    size = 16,
    disabled = false,
    children
  } = props

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style}>
      <Text color={disabled ? colors.ui_6 : color} size={size} style={style}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

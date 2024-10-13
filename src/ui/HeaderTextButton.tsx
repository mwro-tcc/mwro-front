import { TouchableOpacity } from 'react-native-gesture-handler'
import Text from './Text'
import colors from './config/colors'
import { TextStyle } from 'react-native'
import { FontWeight } from './types/style_shorthands'

type Props = {
  onPress?: (...args: any) => void
  color?: string
  weight?: FontWeight
  style?: TextStyle
  size?: number
  children?: string
  disabled?: boolean
}

export default function HeaderTextButton(props: Props) {
  const {
    color = colors.blue_7,
    weight = '400',
    onPress,
    style,
    size = 17,
    disabled = false,
    children
  } = props

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style}>
      <Text
        color={disabled ? colors.ui_6 : color}
        weight={weight}
        size={size}
        style={style}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

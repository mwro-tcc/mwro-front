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
}

export default function HeaderTextButton(props: Props) {
  const { color = colors.blue_7, onPress, style, size = 16, children } = props

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text color={color} size={size} style={style}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

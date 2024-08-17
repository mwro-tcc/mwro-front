import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import colors from './config/colors'

type Props = {
  onPress: () => void
  icon: string
  color?: string
  style?: any
  size?: number
  fromCommunity?: boolean
}

export default function IconButton(props: Props) {
  const {
    color = colors.blue_7,
    onPress,
    icon,
    style,
    size = 24,
    fromCommunity = true
  } = props

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {fromCommunity ? (
        <MaterialCommunityIcons color={color} name={icon as any} size={size} />
      ) : (
        <MaterialIcons color={color} name={icon as any} size={size} />
      )}
    </TouchableOpacity>
  )
}

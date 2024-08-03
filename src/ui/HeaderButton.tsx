import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from './config/colors'

type Props = {
  onPress: () => void
  icon: string
  color?: string
}

export default function HeaderButton(props: Props) {
  const { color = colors.blue_7, onPress, icon } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons color={color} name={icon as any} size={24} />
    </TouchableOpacity>
  )
}

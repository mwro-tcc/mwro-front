import { ToastTypes } from './types'
import Text from '../Text'
import VStack from '../VStack'
import colors from '../config/colors'

type ToastProps = {
  type: ToastTypes
  message: string
  duration_in_ms?: number
}

const toast_color = (type: ToastTypes) => {
  switch (type) {
    case 'success':
      return colors.green_5
    case 'warning':
      return colors.yellow_5
    case 'error':
      return colors.ui_10
  }
}

export default ({ type, message }: ToastProps) => {
  return (
    <VStack
      w='100%'
      px={10}
      py={12}
      bg={toast_color(type)}
      items='center'
      rounded={12}
      border={[toast_color(type)]}
      shadow={[0, 3, 10, colors.ui_10, 0.3]}
    >
      <Text size={16} color={colors.ui_1}>
        {message}
      </Text>
    </VStack>
  )
}

import { ToastTypes } from './types'
import Text from '../Text'
import VStack from '../VStack'
import colors from '../config/colors'

type ToastProps = {
    type: ToastTypes
    message: string
}

const toast_color = (type: ToastTypes) => {
    switch (type) {
        case 'success':
            return colors.red_6
        case 'warning':
            return colors.red_6
        case 'error':
            return colors.red_6
    }
}

export default ({ type, message }: ToastProps) => {
    return (
        <VStack
            w="100%"
            px={10}
            py={12}
            bg={toast_color(type)}
            rounded={7}
            border={[colors.red_7]}
            shadow={[0, 3, 10, colors.ui_9, 0.3]}
        >
            <Text size={16} color={colors.ui_1}>
                {message}
            </Text>
        </VStack>
    )
}

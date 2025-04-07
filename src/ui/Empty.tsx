import { Squirrel } from 'lucide-react-native'
import VStack from './VStack'
import Text from './Text'
import { ui } from './config/colors'

type Props = {
  message: string
}

function Empty(props: Props) {
  return (
    <VStack flex={1} items='center' py={80} gap={10}>
      <Squirrel color={ui.subtle} size={50} strokeWidth={1.2} />
      <Text color={ui.subtle} weight='bold'>
        {props.message}
      </Text>
    </VStack>
  )
}

export default Empty

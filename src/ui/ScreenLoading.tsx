import { ActivityIndicator } from 'react-native'
import VStack from './VStack'

function ScreenLoading() {
  return (
    <VStack flex={1} items='center' justify='center'>
      <ActivityIndicator />
    </VStack>
  )
}

export default ScreenLoading

import HeaderButton from '@ui/HeaderButton'
import VStack from '@ui/VStack'
import { Stack, useLocalSearchParams } from 'expo-router'
import { TextInput } from 'react-native'

export default function EditName() {
  const { name } = useLocalSearchParams()

  return (
    <VStack p={16}>
      <TextInput value='abc' />
    </VStack>
  )
}

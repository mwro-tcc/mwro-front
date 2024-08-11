import Form from '@forms/index'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function CreateStore() {
  const router = useRouter()

  return <Form.Store />
}

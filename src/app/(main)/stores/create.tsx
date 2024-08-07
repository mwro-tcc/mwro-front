import Form from '@forms/index'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function CreateStore() {
  const router = useRouter()
  const handleCancel = () => router.replace('/stores')

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Loja',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace(`/stores`)}>
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      <Form.Store onCancel={handleCancel} />
    </>
  )
}

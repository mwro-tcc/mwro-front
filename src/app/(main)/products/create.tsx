import Form from '@forms/index'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function CreateProduct() {
  const { store_id } = useLocalSearchParams()
  const router = useRouter()
  const handleCancel = () => router.replace(`/stores/${store_id}`)

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Produto',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace(`/stores/${store_id}`)}
            >
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      <Form.Product onCancel={handleCancel} />
    </>
  )
}

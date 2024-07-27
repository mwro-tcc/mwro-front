import { Routes } from '@api/mwro'
import Form from '@forms/index'
import { Store } from '@src/types/store'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useStore } from '@hooks/useStore'
import useModel from '@hooks/useModel'
import HStack from '@ui/HStack'
import Text from '@ui/Text'

export default function EditStore() {
  const router = useRouter()
  const handleCancel = () => router.replace(`/stores/${id}`)

  const { id } = useLocalSearchParams<{ id: string }>()

  const { data, loading, handleRefresh, error } = useModel<Store>({
    url: Routes.Store.get(id)
  })

  const { delete_store } = useStore()

  const handleDelete = async () => {
    await delete_store(id as string)
    router.replace('/stores')
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Comunidade',
          headerRight: () => (
            <TouchableOpacity onPress={() => handleDelete()}>
              <MaterialCommunityIcons name='trash-can' size={24} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace(`/stores/${id}`)}>
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
                <Text size={16}>Voltar</Text>
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      <Form.Store store={data} onCancel={handleCancel} />
    </>
  )
}

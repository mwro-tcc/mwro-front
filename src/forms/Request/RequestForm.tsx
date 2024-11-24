import Text from '@ui/Text'
import VStack from '@ui/VStack'
import { Stack } from 'expo-router'

export default function RequestForm(props: any) {
  const { storeId, communityId, onCancel, onFinish } = props

  return (
    <VStack p={20} flex={1} gap={30}>
      <Stack.Screen
        options={{
          headerTitle: 'Solicitações Recebidas'
        }}
      />
      <Text>
        A loja {storeId} deseja participar da comunidade {communityId}
      </Text>
    </VStack>
  )
}

import Request from '@api/mwro/requests'
import useCache from '@hooks/useCache'
import Button from '@ui/Button'
import colors from '@ui/config/colors'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import AssetList from 'components/AssetList'
import { Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function RequestId() {
  const { get } = useCache()

  const request = get('request') as any

  const router = useRouter()

  const storeRequestedFormatted = [
    {
      ...request?.store,
      onPress: () =>
        router.push(
          {
            pathname: `../../../stores/${request.store.uuid}`
          },
          { relativeToDirectory: true }
        )
    }
  ]

  const handleApprove = async () => {
    await Request.update_request(request.uuid, { status: 'approved' })
    router.back()
  }

  const handleReject = async () => {
    await Request.update_request(request.uuid, { status: 'denied' })
    router.back()
  }

  const message = `A loja "${request?.store?.name}" deseja participar da comunidade ${request?.community?.name}`

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTintColor: colors.primary
        }}
      />
      <VStack flex={1} bg={colors.background} mt={35}>
        <VStack flex={1} gap={20}>
          <Text
            weight='600'
            color={colors.ui_8}
            size={17}
            style={{
              textAlign: 'center',
              paddingHorizontal: 19
            }}
          >
            {message}
          </Text>
          <AssetList data={storeRequestedFormatted} />
        </VStack>

        <HStack gap={10} p={19} justify='evenly'>
          <Button
            onPress={handleReject}
            variant='destructive'
            style={{
              flex: 1
            }}
          >
            Rejeitar
          </Button>
          <Button
            onPress={handleApprove}
            variant='primary'
            style={{
              flex: 1
            }}
          >
            Aprovar
          </Button>
        </HStack>
      </VStack>
    </>
  )
}

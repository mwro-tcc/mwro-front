import Request from '@api/mwro/requests'
import useCache from '@hooks/useCache'
import Button from '@ui/Button'
import colors from '@ui/config/colors'
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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: ''
        }}
      />
      <VStack flex={1} justify='start' bg={colors.background} mt={35}>
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
            A loja {request?.store?.name} deseja participar da comunidade
            {request?.community?.name}
          </Text>
          <AssetList data={storeRequestedFormatted} />
        </VStack>

        <VStack gap={10} p={19}>
          <Button
            onPress={handleApprove}
            style={styles.acceptButton}
            variant='primary'
          >
            Aprovar
          </Button>
          <Button onPress={handleReject} variant='destructive'>
            Rejeitar
          </Button>
        </VStack>
      </VStack>
    </>
  )
}

const styles = StyleSheet.create({
  acceptButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    color: colors.ui_3,
    backgroundColor: colors.primary
  },
  rejectButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    color: colors.red_3,
    backgroundColor: colors.primary
  }
})

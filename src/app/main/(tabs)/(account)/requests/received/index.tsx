import { Routes } from '@api/mwro'
import useCache from '@hooks/useCache'
import useCollection from '@hooks/useCollection'
import colors, { ui } from '@ui/config/colors'
import AssetList from 'components/AssetList'
import { Stack, useRouter } from 'expo-router'

export default function ReceivedRequests() {
  const router = useRouter()

  const { data } = useCollection<any>({
    url: Routes.Requests.received_requests
  })

  const { add } = useCache()

  const handleOnPress = (request: any) => {
    add('request', request)
    return router.push(
      {
        pathname: `./${request.uuid}`
      },
      { relativeToDirectory: true }
    )
  }

  const requests = data?.map((request) => ({
    ...request,
    uuid: request.storeUuid,
    name: request.store.name,
    description: request.community.name,
    onPress: () => handleOnPress(request)
  }))

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Solicitações Recebidas',
          headerTintColor: colors.primary,
          headerBackTitle: 'Voltar',
          headerTitleStyle: {
            color: colors.ui_10
          },
          contentStyle: {
            backgroundColor: ui.bg
          }
        }}
      />
      <AssetList data={requests} />
    </>
  )
}

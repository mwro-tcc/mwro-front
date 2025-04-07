import { Routes } from '@api/mwro'
import useCollection from '@hooks/useCollection'
import colors, { ui } from '@ui/config/colors'
import AssetList from 'components/AssetList'
import { Stack } from 'expo-router'

export default function PendingRequests() {
  const { data } = useCollection<any>({
    url: Routes.Requests.pending_requests
  })

  const requests = data?.map((request) => ({
    ...request,
    uuid: request.communityUuid,
    name: request.community.name,
    description: request.store.name
  }))

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Solicitações Enviadas`,
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

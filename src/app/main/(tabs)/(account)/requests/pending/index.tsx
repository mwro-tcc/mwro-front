import { Routes } from '@api/mwro'
import useCollection from '@hooks/useCollection'
import AssetList from 'components/AssetList'
import { Stack } from 'expo-router'

export default function PendingRequests() {
  const { data } = useCollection<any>({
    url: Routes.Requests.pending_requests
  })

  const requests = data?.map((request) => ({
    ...request,
    name: `Comunidade ${request.community.name}`,
    description: `Loja > ${request.store.name}`
  }))

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Solicitações pendentes`
        }}
      />
      <AssetList data={requests} />
    </>
  )
}

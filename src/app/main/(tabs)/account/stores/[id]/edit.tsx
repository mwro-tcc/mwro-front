import { Routes } from '@api/mwro'
import Form from '@forms/index'
import { Store } from '@src/types/store'
import { Redirect, useLocalSearchParams } from 'expo-router'
import useModel from '@hooks/useModel'
import useCache from '@hooks/useCache'

export default function EditStore() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return <Redirect href='/main' />

  const { get } = useCache<Store>()

  const store = get(id)

  const { data: community } = useModel<any>({
    url: Routes.Community.get(store?.communityUuid)
  })

  if (!store) return <Redirect href='/main' />

  return <Form.Store store={store} community={community} />
}

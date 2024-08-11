import { Routes } from '@api/mwro'
import Form from '@forms/index'
import { Store } from '@src/types/store'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import useModel from '@hooks/useModel'
import useCache from '@hooks/useCache'

export default function EditStore() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const { data } = useModel<Store>({
    url: Routes.Store.get(id)
  })

  if (!id) return <Redirect href='/(main)' />

  const { get } = useCache<Store>()

  const store = get(id)

  if (!store) return <Redirect href='/(main)' />

  return <Form.Store store={data} />
}

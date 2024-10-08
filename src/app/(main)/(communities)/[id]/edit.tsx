import Form from '@forms/index'
import useCache from '@hooks/useCache'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import { Community } from '@src/types/community'

export default function EditCommunity() {
  const { id } = useLocalSearchParams<{ id: string }>()

  if (!id) return <Redirect href='/(main)' />

  const { get } = useCache<Community>()

  const community = get(id)

  if (!community) return <Redirect href='/(main)' />

  return <Form.Community community={community} />
}

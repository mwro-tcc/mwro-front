import useCache from '@hooks/useCache'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { Community } from '@src/types/community'
import CommunityForm from '@forms/Community/CommunityForm'

export default function EditCommunity() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { get } = useCache<Community>()

  if (!id) return <Redirect href='/main' />

  const community = get(id)

  if (!community) return <Redirect href='/main' />

  return <CommunityForm debug community={community} />
}

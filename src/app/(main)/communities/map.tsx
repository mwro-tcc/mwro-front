import { Routes } from '@api/mwro'
import CommunitiesMap from '@forms/Community/components/CommunitiesMap'
import useCollection from '@hooks/useCollection'
import { Community } from '@src/types/community'
import HStack from '@ui/HStack'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function CommunitiesMapView() {
  const router = useRouter()

  const { lat, long } = useLocalSearchParams()

  const { data: communities = [] } = useCollection<Community>({
    url: Routes.Community.list
  })

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Mapa de Comunidades',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace(`/communities/`)}>
              <HStack items='center' gap={2}>
                <MaterialCommunityIcons name='arrow-left' size={22} />
              </HStack>
            </TouchableOpacity>
          )
        }}
      />
      <CommunitiesMap
        communities={communities}
        latitude={parseFloat(lat as string)}
        longitude={parseFloat(long as string)}
      />
    </>
  )
}

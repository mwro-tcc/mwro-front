import CommunitiesMap from '@forms/Community/components/CommunitiesMap'
import VStack from '@ui/VStack'
import { Stack } from 'expo-router'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import Text from '@ui/Text'
import useCollection from '@hooks/useCollection'
import { Community, Routes } from '@api/mwro'
import scope from '@lib/scope'
import { Community as CommunityType } from '@src/types/community'

type LocationValues = null | {
  latitude: number
  longitude: number
}

async function getLocationPermission(): Promise<LocationValues> {
  const { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    return null
  }

  const location = await Location.getCurrentPositionAsync({})

  if (!location) return null

  const { latitude, longitude } = location.coords

  return {
    latitude,
    longitude
  }
}

export default function Explore() {
  const [location, setLocation] = useState<LocationValues>(null)

  useEffect(() => void getLocationPermission().then(setLocation), [])

  const { data, error, loading } = useCollection<CommunityType>({
    url: Routes.Community.list,
    keys: [Community.COLLECTION_KEY]
  })

  console.log(data)

  const content = scope(() => {
    if (location === null) {
      return (
        <Text>
          Atualize suas permissões de localização para visualizar o mapa de
          comunidades
        </Text>
      )
    }

    if (data) {
      return <CommunitiesMap communities={data} {...location} fullscreen />
    }
  })

  return (
    <VStack flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Explorar',
          headerSearchBarOptions: {}
        }}
      />
      {content}
    </VStack>
  )
}

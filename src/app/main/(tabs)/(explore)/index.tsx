/* eslint-disable react-hooks/exhaustive-deps */
import CommunitiesMap from '@forms/Community/components/CommunitiesMap'
import VStack from '@ui/VStack'
import { Stack, router } from 'expo-router'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import Text from '@ui/Text'
import useCollection from '@hooks/useCollection'
import { Routes } from '@api/mwro'
import scope from '@lib/scope'
import { Community } from '@src/types/community'
import AssetList from 'components/AssetList'
import { ActivityIndicator, SafeAreaView } from 'react-native'
import Show from '@ui/Show'
import ScreenLoading from '@ui/ScreenLoading'
import colors, { ui } from '@ui/config/colors'

type LocationValues = null | {
  latitude: number
  longitude: number
}

async function getLocationPermission(): Promise<LocationValues> {
  const { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    return null
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced
  })

  if (!location) return null

  const { latitude, longitude } = location.coords

  return {
    latitude,
    longitude
  }
}

export default function Explore() {
  const [location, setLocation] = useState<LocationValues>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => void getLocationPermission().then(setLocation), [])

  const {
    data: communities,
    loading,
    handleRefresh,
    refreshing,
    error
  } = useCollection<Community>({
    url: Routes.Community.list,
    params: {
      term: `%${searchTerm}%`
    }
  })

  const content = scope(() => {
    if (location === null) {
      return (
        <Text>
          Atualize suas permissões de localização para visualizar o mapa de
          comunidades
        </Text>
      )
    }

    if (loading) {
      return <ScreenLoading />
    }

    if (error) {
      return (
        <VStack flex={1} justify='center' items='center'>
          <Text>{error.message}</Text>
        </VStack>
      )
    }

    const assets =
      communities?.map(({ uuid, name, description }) => ({
        uuid,
        name,
        description,
        onPress: () => router.push(`/main/(explore)/communities/${uuid}`)
      })) ?? []

    if (assets.length === 0)
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <VStack items='center' justify='center' flex={1}>
            <Text>Sem resultados</Text>
          </VStack>
        </SafeAreaView>
      )

    if (searchTerm) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <AssetList
            data={assets}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        </SafeAreaView>
      )
    }

    return (
      <CommunitiesMap communities={communities!} {...location} fullscreen />
    )
  })

  return (
    <VStack flex={1}>
      <Stack.Screen
        options={{
          headerTitle: 'Explorar',
          headerSearchBarOptions: {
            onChangeText: (event) => setSearchTerm(event?.nativeEvent?.text),
            tintColor: colors.primary
          },
          contentStyle: { backgroundColor: colors.background }
        }}
      />
      <Show
        when={!loading}
        placeholder={
          <VStack flex={1} justify='center' items='center'>
            <ActivityIndicator />
          </VStack>
        }
      >
        {content}
      </Show>
    </VStack>
  )
}

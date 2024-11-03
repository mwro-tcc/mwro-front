import { Routes } from '@api/mwro'
import { Community } from '@src/types/community'
import HStack from '@ui/HStack'
import Image from '@ui/Image'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import rounded from '@ui/config/rounded'
import { useRouter } from 'expo-router'
import React from 'react'
import MapViewComponent, { Marker } from 'react-native-maps'

type MapViewProps = {
  communities: Community[]
  latitude: number
  longitude: number
  fullscreen?: boolean
}

const CommunitiesMap = ({
  communities,
  latitude,
  longitude,
  fullscreen = false
}: MapViewProps) => {
  const router = useRouter()
  return (
    <MapViewComponent
      style={{
        flex: 1,
        ...(fullscreen
          ? {}
          : {
              borderRadius: 6,
              borderColor: '#00000030',
              borderWidth: 1
            })
      }}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      {communities.map((community: any, index: any) => (
        <Marker
          key={index}
          coordinate={{
            latitude: community.latitude,
            longitude: community.longitude
          }}
          title={community.name}
          onCalloutPress={() =>
            router.push(`/main/account/communities/${community.uuid}`)
          }
        >
          <VStack items='center' shadow={[0, 2, 5, colors.ui_9, 0.3]}>
            <VStack p={2} bg={colors.ui_1} rounded={50}>
              <Image
                src={Routes.Image.src(community.uuid)}
                hasAuthenticationHeaders
                w={30}
                h={30}
                rounded={50}
              />
            </VStack>
            <VStack
              w={2}
              h={6}
              bg={colors.ui_1}
              style={{
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10
              }}
            />
          </VStack>
        </Marker>
      ))}
    </MapViewComponent>
  )
}

export default CommunitiesMap

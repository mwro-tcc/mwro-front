import { Routes } from '@api/mwro'
import { Community } from '@src/types/community'
import Image from '@ui/Image'
import Show from '@ui/Show'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import MapViewComponent, { Marker } from 'react-native-maps'

type MapViewProps = {
  communities: Community[]
  latitude: number
  longitude: number
  fullscreen?: boolean
}

const PIN_IMAGE_SIZES = {
  default: {
    w: 30,
    h: 30
  },
  selected: {
    w: 50,
    h: 50
  }
}

function getPinImageSize(options: { selected: boolean }) {
  return options.selected ? PIN_IMAGE_SIZES.selected : PIN_IMAGE_SIZES.default
}

const CommunitiesMap = ({
  communities,
  latitude,
  longitude,
  fullscreen = false
}: MapViewProps) => {
  const router = useRouter()
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null
  )

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
      {communities.map((community: Community, index: number) => (
        <Marker
          key={index}
          coordinate={{
            latitude: community.latitude,
            longitude: community.longitude
          }}
          title={community.name}
          onSelect={() => setSelectedCommunity(community)}
          onDeselect={() => setSelectedCommunity(null)}
          onCalloutPress={() =>
            router.push(`/main/account/communities/${community.uuid}`)
          }
          calloutOffset={{ x: 10, y: -5 }}
        >
          <VStack items='center' shadow={[0, 2, 5, colors.ui_9, 0.3]}>
            <VStack p={2} bg={colors.ui_1} rounded={50}>
              <Image
                src={Routes.Image.src(community.uuid)}
                hasAuthenticationHeaders
                {...getPinImageSize({
                  selected: selectedCommunity?.uuid === community.uuid
                })}
                rounded={50}
              />
            </VStack>
            <Show unless={selectedCommunity?.uuid === community.uuid}>
              <VStack
                w={2}
                h={6}
                bg={colors.ui_1}
                style={{
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10
                }}
              />
            </Show>
          </VStack>
        </Marker>
      ))}
    </MapViewComponent>
  )
}

export default CommunitiesMap

import { Community } from '@src/types/community'
import React from 'react'
import MapViewComponent, { Marker } from 'react-native-maps'

type MapViewProps = {
  communities: Community[]
  latitude: number
  longitude: number
}

const CommunitiesMap = ({ communities, latitude, longitude }: MapViewProps) => {
  return (
    <MapViewComponent
      style={{
        flex: 1,
        borderRadius: 6,
        borderColor: '#00000030',
        borderWidth: 1
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
        />
      ))}
    </MapViewComponent>
  )
}

export default CommunitiesMap

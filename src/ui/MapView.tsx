import React from 'react'
import MapViewComponent, {
  Marker,
  MarkerDragStartEndEvent
} from 'react-native-maps'
import rounded from './config/rounded'

type MapViewProps = {
  latitude: number
  longitude: number
  onMarkerDragEnd: (e: MarkerDragStartEndEvent) => void
}

const MapView = ({ latitude, longitude, onMarkerDragEnd }: MapViewProps) => {
  return (
    <MapViewComponent
      style={{
        height: '100%',
        width: '100%',
        borderRadius: rounded.sm,
        borderColor: '#00000030',
        borderWidth: 1
      }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015
      }}
    >
      <Marker
        coordinate={{
          latitude,
          longitude
        }}
        draggable
        title='Você está aqui?'
        onDragEnd={onMarkerDragEnd}
      />
    </MapViewComponent>
  )
}

export default MapView

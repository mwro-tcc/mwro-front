import React from 'react'
import MapViewComponent, {
  Marker,
  MarkerDragStartEndEvent
} from 'react-native-maps'
import {
  StyleShorthands,
  parse_style_shorthands
} from './types/style_shorthands'

type MapViewProps = StyleShorthands & {
  latitude: number
  longitude: number
  onMarkerDragEnd?: (e: MarkerDragStartEndEvent) => void
}

function MapView(props: MapViewProps) {
  const { latitude, longitude, onMarkerDragEnd, ...shorthands } = props

  return (
    <MapViewComponent
      userInterfaceStyle='light'
      style={{ ...parse_style_shorthands(shorthands), flex: 1 }}
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
        draggable={onMarkerDragEnd ? true : false}
        title={onMarkerDragEnd ? 'Você está aqui?' : undefined}
        onDragEnd={onMarkerDragEnd ?? undefined}
      />
    </MapViewComponent>
  )
}

export default MapView

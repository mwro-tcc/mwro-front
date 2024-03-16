import React from "react";
import MapViewComponent, { Marker } from "react-native-maps";

type MapViewProps = {
  latitude: number;
  longitude: number;
  onMarkerDragEnd: (e: any) => void;
};

const MapView = ({ latitude, longitude, onMarkerDragEnd }: MapViewProps) => {
  return (
    <MapViewComponent
      style={{
        width: "100%",
        height: "100%",
      }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015,
      }}
    >
      <Marker
        coordinate={{
          latitude,
          longitude,
        }}
        draggable
        title="Você está aqui?"
        onDragEnd={onMarkerDragEnd}
      />
    </MapViewComponent>
  );
};

export default MapView;

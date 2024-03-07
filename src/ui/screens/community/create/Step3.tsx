import MapView from "../../../components/MapView";

type Step3Props = {
  latitude: number;
  longitude: number;
  setValue: any;
};

export const Step3 = ({ latitude, longitude, setValue }: Step3Props) => {
  const onMarkerDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  return (
    <MapView
      latitude={latitude}
      longitude={longitude}
      onMarkerDragEnd={onMarkerDragEnd}
    />
  );
};

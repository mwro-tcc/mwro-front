import { Control } from "react-hook-form";
import { t } from "../../../../../translations";
import LocationAutoComplete from "../../../components/LocationInput";

type Step2Props = {
  control: Control<any>;
  location: string;
  setLocation: (location: string) => void;
  latitude: number;
  longitude: number;
};

export const Step2 = ({
  control,
  location,
  setLocation,
  latitude,
  longitude,
}: Step2Props) => {
  return (
    <LocationAutoComplete
      label={t("community.location")}
      required
      control={control}
      location={location}
      setLocation={setLocation}
      latitude={latitude}
      longitude={longitude}
    />
  );
};

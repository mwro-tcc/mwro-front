import { UseFormReturn } from 'react-hook-form'
import { MarkerDragStartEndEvent } from 'react-native-maps'
import { CommunityForm } from '@src/types/community'
import MapView from '@ui/MapView'
import VStack from '@ui/VStack'
import colors from '@ui/config/colors'
import rounded from '@ui/config/rounded'

type Props = {
  form: UseFormReturn<CommunityForm, any, CommunityForm>
}

export default function CommunityFormStep3(props: Props) {
  const { form } = props

  const { longitude, latitude } = form.getValues()

  const handleMarkerDragEnd = (event: MarkerDragStartEndEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    form.setValue('latitude', latitude)
    form.setValue('longitude', longitude)
  }

  return (
    <VStack flex={1}>
      <MapView
        latitude={latitude ?? 0}
        longitude={longitude ?? 0}
        onMarkerDragEnd={handleMarkerDragEnd}
      />
    </VStack>
  )
}

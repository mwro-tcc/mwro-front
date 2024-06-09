import { UseFormReturn } from 'react-hook-form'
import LocationAutoComplete from '../../../ui/components/LocationInput'
import { CommunityForm } from '@src/types/community'
import { useState } from 'react'

type Props = {
  form: UseFormReturn<CommunityForm, any, CommunityForm>
}

export default function CommunityFormStep2(props: Props) {
  const { form } = props
  const { latitude, longitude } = form.getValues()
  const [location, setLocation] = useState('')

  return (
    <LocationAutoComplete
      label='Localização'
      required
      control={form.control}
      location={location}
      setLocation={setLocation}
      latitude={latitude ?? 0}
      longitude={longitude ?? 0}
    />
  )
}

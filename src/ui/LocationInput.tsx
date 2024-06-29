import React, { useEffect } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import {
  GooglePlacesAutocomplete,
  GooglePlaceData,
  GooglePlaceDetail
} from 'react-native-google-places-autocomplete'
import HStack from './HStack'
import Text from './Text'
import colors from './config/colors'
import rounded from './config/rounded'
import spacings from './config/spacings'
import shadows from './config/shadows'
import { Control, useController } from 'react-hook-form'

type Variants = {
  default: ViewStyle
}

type LocationInputProps = {
  label?: string
  required?: boolean
  control: Control<any>
  location: string
  setLocation: (location: string) => void
  latitude: number
  longitude: number
}

const base_form_variant: ViewStyle = {
  borderRadius: rounded.sm,
  padding: spacings.md,
  height: 47, // default height of DS TextInput
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...shadows.sm
}

const input_variants = StyleSheet.create<Variants>({
  default: {
    ...base_form_variant,
    backgroundColor: colors.ui_1,
    borderColor: colors.ui_5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: rounded.sm
  }
})

const LocationAutoComplete = ({
  label,
  required,
  control,
  location,
  setLocation,
  latitude,
  longitude
}: LocationInputProps) => {
  const { field: latitudeField } = useController({
    control,
    defaultValue: '',
    name: 'latitude',
    rules: { required }
  })

  const { field: longitudeField } = useController({
    control,
    defaultValue: '',
    name: 'longitude',
    rules: { required }
  })

  useEffect(() => {
    latitudeField.onChange(latitude)
    longitudeField.onChange(longitude)
  }, [])

  return (
    <>
      <HStack gap={3} mb={-27} ml={5}>
        {label && (
          <Text size={12} weight='600'>
            {label}
          </Text>
        )}
        {required && (
          <Text weight='600' size={12} color={colors.red_6}>
            *
          </Text>
        )}
      </HStack>
      <GooglePlacesAutocomplete
        placeholder=''
        fetchDetails={true}
        onPress={(
          data: GooglePlaceData,
          details: GooglePlaceDetail | null = null
        ) => {
          setLocation(data.description)
          latitudeField.onChange(details?.geometry.location.lat)
          longitudeField.onChange(details?.geometry.location.lng)
        }}
        query={{
          key: '***', // TODO: ADD .env
          language: 'pt-BR',
          components: 'country:br'
        }}
        styles={{
          textInput: {
            ...input_variants['default']
          }
        }}
        textInputProps={{
          placeholder: location
        }}
        debounce={300}
      />
    </>
  )
}

export default LocationAutoComplete

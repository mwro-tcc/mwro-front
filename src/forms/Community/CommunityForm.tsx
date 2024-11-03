import { useForm } from 'react-hook-form'
import {
  Community as CommunityType,
  CommunityForm as CommunityFormType
} from '@src/types/community'
import VStack from '@ui/VStack'
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import colors from '@ui/config/colors'
import HeaderTextButton from '@ui/HeaderTextButton'
import TextInput from '@ui/TextInput'
import ActionList from '@ui/ActionList'
import CommunityImagePicker from './components/CommunityImagePicker'
import Show from '@ui/Show'
import { Community } from '@api/mwro'
import Text from '@ui/Text'
import {
  useGoogleAutocomplete,
  GoogleLocationResult,
  GoogleLocationDetailResult
} from '@appandflow/react-native-google-autocomplete'
import Button from '@ui/Button'
import HStack from '@ui/HStack'
import Spacer from '@ui/Spacer'
import { ChevronLeft, MapPin } from 'lucide-react-native'
import { useReducer, useState } from 'react'
import MapView from '@ui/MapView'

const PLACE_LIST_SIZE = 6

type Props = {
  debug?: boolean
  community?: CommunityType
}

type LocationModalState = {
  location: GoogleLocationDetailResult | null
  locationModalIsOpen: boolean
  locationModalView: LocationModalView
  mapIsLoading: boolean
}

enum LocationModalView {
  SEARCH = 'SEARCH',
  MAP = 'MAP'
}

enum LocationModalStateActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  SET_VIEW = 'SET_VIEW',
  SET_LOCATION = 'SET_LOCATION',
  LOADING_MAP = 'LOADING_MAP'
}

type LocationModalStateAction =
  | { type: LocationModalStateActionType.OPEN }
  | { type: LocationModalStateActionType.CLOSE }
  | {
      type: LocationModalStateActionType.SET_VIEW
      payload: LocationModalView
    }
  | {
      type: LocationModalStateActionType.SET_LOCATION
      payload: GoogleLocationDetailResult
    }
  | {
      type: LocationModalStateActionType.LOADING_MAP
      payload: boolean
    }

function locationModalReducer(
  state: LocationModalState,
  action: LocationModalStateAction
) {
  switch (action.type) {
    case LocationModalStateActionType.OPEN:
      return { ...state, locationModalIsOpen: true }
    case LocationModalStateActionType.CLOSE:
      return { ...state, locationModalIsOpen: false }
    case LocationModalStateActionType.SET_VIEW:
      return { ...state, locationModalView: action.payload }
    case LocationModalStateActionType.SET_LOCATION:
      return { ...state, location: action.payload }
    case LocationModalStateActionType.LOADING_MAP:
      return { ...state, mapIsLoading: action.payload }
    default:
      return state
  }
}

function getLocationProps(location: GoogleLocationDetailResult | null) {
  if (!location) {
    return {
      latitude: 0,
      longitude: 0
    }
  }

  return {
    latitude: location.geometry.location.lat,
    longitude: location.geometry.location.lng
  }
}

export default function CommunityForm(props: Props) {
  const { community, debug } = props
  const router = useRouter()
  const form = useForm<CommunityFormType>({
    defaultValues: community,
    reValidateMode: 'onChange'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [locationModal, dispatchLocationModalEvent] = useReducer(
    locationModalReducer,
    {
      locationModalIsOpen: false,
      locationModalView: LocationModalView.SEARCH,
      location: null,
      mapIsLoading: false
    }
  )

  const handleSubmit = async (value: any) => {
    setIsSubmitting(true)
    form
      .handleSubmit(community ? Community.update : Community.create)(value)
      .then(() => {
        router.back()
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const { locationResults, setTerm, clearSearch, searchDetails, term } =
    useGoogleAutocomplete(process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY!, {
      language: 'pt-BR',
      debounce: 300,
      components: 'country:br'
    })

  const handleCloseLocationModal = () => {
    clearSearch()
    setTerm('')
    dispatchLocationModalEvent({
      type: LocationModalStateActionType.CLOSE
    })
  }

  const handleOpenLocationModal = () => {
    dispatchLocationModalEvent({
      type: LocationModalStateActionType.OPEN
    })
  }

  const handleBackLocationModal = () => {
    dispatchLocationModalEvent({
      type: LocationModalStateActionType.SET_VIEW,
      payload: LocationModalView.SEARCH
    })
  }

  const handleSetLocation = () => {
    const { latitude, longitude } = getLocationProps(locationModal.location)

    form.setValue('latitude', latitude)
    form.setValue('longitude', longitude)

    clearSearch()
    setTerm('')
    dispatchLocationModalEvent({
      type: LocationModalStateActionType.CLOSE
    })
  }

  const createSelectLocationHandler = (place: GoogleLocationResult) => () => {
    dispatchLocationModalEvent({
      type: LocationModalStateActionType.LOADING_MAP,
      payload: true
    })
    searchDetails(place.place_id)
      .then((details) => {
        dispatchLocationModalEvent({
          type: LocationModalStateActionType.SET_LOCATION,
          payload: details
        })
        dispatchLocationModalEvent({
          type: LocationModalStateActionType.SET_VIEW,
          payload: LocationModalView.MAP
        })
      })
      .finally(() => {
        dispatchLocationModalEvent({
          type: LocationModalStateActionType.LOADING_MAP,
          payload: false
        })
      })
  }

  if (debug) {
    console.log('FORM_ERRORS:', form.formState.errors)
    console.log('FORM_IS_VALID:', form.formState.isValid)
  }

  return (
    <VStack p={20} flex={1} gap={30}>
      <Stack.Screen
        options={{
          headerTitle: `${community?.uuid ? 'Editar' : 'Criar'} Comunidade`,
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.ui_9
          },
          headerRight: ({ tintColor }) => (
            <HeaderTextButton
              color={tintColor}
              onPress={handleSubmit}
              weight='600'
              disabled={!form.formState.isValid}
            >
              Salvar
            </HeaderTextButton>
          ),
          headerBackTitle: 'Voltar'
        }}
      />
      <Show
        when={!isSubmitting}
        placeholder={
          <VStack flex={1} items='center' justify='center'>
            <ActivityIndicator />
          </VStack>
        }
      >
        <VStack gap={30} flex={1}>
          <ScrollView
            keyboardDismissMode='on-drag'
            contentContainerStyle={{ flex: 1, gap: 30 }}
          >
            <Show when={community?.uuid}>
              <CommunityImagePicker community={community!} />
            </Show>
            <TextInput
              control={form.control}
              name={'name'}
              label='Nome da Comunidade'
              required
            />
            <TextInput
              control={form.control}
              name={'description'}
              label='Descrição'
              multiline
              numberOfLines={3}
              height={100}
              required
            />
            <ActionList
              label='Localização'
              data={[
                {
                  title: locationModal.location?.formatted_address ?? 'Definir',
                  onPress: handleOpenLocationModal
                }
              ]}
            />
            <Modal
              visible={locationModal.locationModalIsOpen}
              onRequestClose={handleCloseLocationModal}
              onDismiss={handleCloseLocationModal}
              animationType='slide'
              presentationStyle='formSheet'
            >
              <VStack flex={1} bg={colors.ui_2}>
                <VStack
                  bg={colors.ui_1}
                  style={{
                    borderBottomColor: colors.ui_3,
                    borderBottomWidth: StyleSheet.hairlineWidth
                  }}
                  justify='center'
                  px={16}
                  pt={6}
                >
                  <HStack items='center' h={44}>
                    {locationModal.locationModalView ===
                    LocationModalView.SEARCH ? (
                      <Button
                        variant='text'
                        onPress={handleCloseLocationModal}
                        style={{ flex: 1 }}
                      >
                        Cancelar
                      </Button>
                    ) : (
                      <TouchableOpacity
                        onPress={handleBackLocationModal}
                        style={{ flex: 1 }}
                      >
                        <HStack items='center'>
                          <ChevronLeft size={28} color={colors.primary} />
                          <Text size={17} color={colors.primary}>
                            Voltar
                          </Text>
                        </HStack>
                      </TouchableOpacity>
                    )}
                    <HStack flex={1} justify='center' items='center'>
                      <Text size={17} weight='700'>
                        Localização
                      </Text>
                    </HStack>
                    <Show
                      when={
                        locationModal.locationModalView ===
                        LocationModalView.MAP
                      }
                      placeholder={<Spacer />}
                    >
                      <Button
                        variant='text'
                        style={{ flex: 1, alignItems: 'flex-end' }}
                        onPress={handleSetLocation}
                      >
                        Definir
                      </Button>
                    </Show>
                  </HStack>
                  <VStack h={52}>
                    <HStack
                      rounded={10}
                      h={36}
                      bg={colors.ui_2}
                      items='center'
                      px={8}
                      gap={5}
                    >
                      <MapPin size={22} color={colors.ui_6} />
                      <TextInput
                        value={term}
                        onChangeText={setTerm}
                        placeholderTextColor={colors.ui_6}
                        size={17}
                        flex={1}
                        placeholder='Buscar'
                      />
                    </HStack>
                  </VStack>
                </VStack>
                <Show
                  when={
                    locationModal.locationModalView === LocationModalView.SEARCH
                  }
                  unless={locationModal.mapIsLoading}
                >
                  <VStack>
                    {locationResults.slice(0, PLACE_LIST_SIZE).map((place) => (
                      <TouchableOpacity
                        key={place.place_id}
                        onPress={createSelectLocationHandler(place)}
                      >
                        <VStack
                          px={16}
                          py={6}
                          bg={colors.ui_1}
                          style={{
                            borderBottomColor: colors.ui_3,
                            borderBottomWidth: StyleSheet.hairlineWidth
                          }}
                        >
                          <Text>{place.structured_formatting.main_text}</Text>
                          <Text>
                            {place.structured_formatting.secondary_text}
                          </Text>
                        </VStack>
                      </TouchableOpacity>
                    ))}
                  </VStack>
                </Show>
                <Show when={locationModal.mapIsLoading}>
                  <VStack flex={1} items='center' justify='center'>
                    <ActivityIndicator />
                  </VStack>
                </Show>
                <Show
                  when={
                    locationModal.locationModalView === LocationModalView.MAP
                  }
                  unless={locationModal.mapIsLoading}
                >
                  <MapView {...getLocationProps(locationModal.location)} />
                </Show>
              </VStack>
            </Modal>
          </ScrollView>
        </VStack>
      </Show>
    </VStack>
  )
}

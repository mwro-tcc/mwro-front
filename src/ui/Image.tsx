import {
  ActivityIndicator,
  ImageErrorEventData,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent
} from 'react-native'
import { Image as ExpoImage } from 'expo-image'
import { ImageProps, ViewStyle } from 'react-native'
import {
  StyleShorthands,
  parse_style_shorthands
} from './types/style_shorthands'
import useAuth from '@hooks/useAuth'
import scope from '@lib/scope'
import HStack from './HStack'
import colors, { ui } from './config/colors'
import { useEffect, useState } from 'react'
import placeholderImage from '../assets/placeholder.png'

type Props = StyleShorthands & {
  src?: string | null
  style?: ViewStyle
  componentProps?: ImageProps
  hasAuthenticationHeaders?: boolean
  loading?: boolean
}

const PLACEHOLDER_IMAGE = placeholderImage

export default function Image(props: Props) {
  const {
    style,
    hasAuthenticationHeaders = false,
    loading = false,
    src,
    ...shorthands
  } = props

  const [error, setError] =
    useState<NativeSyntheticEvent<ImageErrorEventData> | null>(null)

  useEffect(() => {
    if (loading && error) {
      setError(null)
    }
  }, [error, loading])

  const { token, loading: isLoadingToken } = useAuth()

  if (loading || (hasAuthenticationHeaders && isLoadingToken)) {
    return (
      <HStack {...shorthands} bg={colors.ui_1} items='center' justify='center'>
        <ActivityIndicator />
      </HStack>
    )
  }

  const source = scope((): ImageSourcePropType => {
    if (!src || error) {
      return PLACEHOLDER_IMAGE
    }

    if (hasAuthenticationHeaders && token) {
      return {
        uri: src,
        cache: 'reload',
        headers: {
          authorization: token
        }
      }
    }

    return {
      uri: src,
      cache: 'reload'
    }
  })

  return (
    <ExpoImage
      onError={setError}
      source={source}
      cachePolicy='none'
      style={{
        ...(style as ImageStyle),
        ...(parse_style_shorthands(shorthands) as ImageStyle)
      }}
    />
  )
}

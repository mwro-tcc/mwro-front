import {
  ActivityIndicator,
  ImageStyle,
  Image as ReactNativeImage,
  StyleProp
} from 'react-native'
import { ImageProps, ViewStyle } from 'react-native'
import {
  StyleShorthands,
  parse_style_shorthands
} from './types/style_shorthands'
import useAuth from '@hooks/useAuth'
import scope from '@lib/scope'
import HStack from './HStack'
import colors from './config/colors'

type Props = StyleShorthands & {
  src?: string | null
  style?: ViewStyle
  componentProps?: ImageProps
  hasAuthenticationHeaders?: boolean
  loading?: boolean
}

export default function Image(props: Props) {
  const {
    style,
    hasAuthenticationHeaders = false,
    loading = false,
    src = 'https://www.proclinic-products.com/build/static/default-product.30484205.png',
    ...shorthands
  } = props

  const { token, loading: isLoadingToken } = useAuth()

  if (loading || (hasAuthenticationHeaders && isLoadingToken)) {
    return (
      <HStack {...shorthands} bg={colors.ui_1} items='center' justify='center'>
        <ActivityIndicator />
      </HStack>
    )
  }

  const source = scope(() => {
    const uri = src ?? undefined

    if (hasAuthenticationHeaders && token) {
      return {
        uri,
        headers: {
          authorization: token
        }
      }
    }

    return {
      uri
    }
  })

  return (
    <ReactNativeImage
      source={source}
      style={{
        ...(style as ImageStyle),
        ...(parse_style_shorthands(shorthands) as ImageStyle)
      }}
    />
  )
}

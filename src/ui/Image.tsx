import { ImageStyle, Image as ReactNativeImage, StyleProp } from 'react-native'
import { ImageProps, ViewStyle } from 'react-native'
import {
  StyleShorthands,
  parse_style_shorthands
} from './types/style_shorthands'

type Props = StyleShorthands & {
  src?: string
  style?: ViewStyle
  componentProps?: ImageProps
}

export default function Image(props: Props) {
  const {
    style,
    src = 'https://www.proclinic-products.com/build/static/default-product.30484205.png',
    ...shorthands
  } = props

  return (
    <ReactNativeImage
      source={{
        uri: src
      }}
      style={{
        ...(style as ImageStyle),
        ...(parse_style_shorthands(shorthands) as ImageStyle)
      }}
    />
  )
}

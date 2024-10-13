import { View, ViewProps, ViewStyle } from 'react-native'
import {
  StyleShorthands,
  parse_style_shorthands
} from './types/style_shorthands'
import { ReactNode } from 'react'

type Props = StyleShorthands & {
  children?: ReactNode
  style?: ViewStyle
  componentProps?: ViewProps
}

export default function VStack(props: Props) {
  const { style, componentProps, children, ...shorthands } = props

  return (
    <View
      {...componentProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...(style as ViewStyle),
        ...parse_style_shorthands(shorthands)
      }}
    >
      {children}
    </View>
  )
}

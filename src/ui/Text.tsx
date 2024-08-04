import {
  Text,
  TextProps as ReactNativeTextProps,
  TextStyle
} from 'react-native'
import {
  TextShorthands,
  parse_text_style_shorthands
} from './types/style_shorthands'
import { ReactNode } from 'react'

export type TextProps = TextShorthands &
  Partial<{
    children: ReactNode
    variant: string
    style: TextStyle
    componentProps: ReactNativeTextProps
  }>

export default ({
  variant = 'default',
  style,
  children,
  componentProps,
  ...shorthands
}: TextProps) => {
  return (
    <Text
      {...componentProps}
      style={{
        ...parse_text_style_shorthands(shorthands),
        ...(style as TextStyle)
      }}
    >
      {children}
    </Text>
  )
}

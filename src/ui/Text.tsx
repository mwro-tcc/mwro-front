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
import { ui } from './config/colors'

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
        color: ui.fg,
        ...parse_text_style_shorthands(shorthands),
        ...(style as TextStyle)
      }}
    >
      {children}
    </Text>
  )
}

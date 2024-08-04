import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import Text, { TextProps } from './Text'
import colors from './config/colors'

const base_style: TextStyle = {
  marginLeft: 16,
  fontWeight: '700',
  color: colors.ui_7,
  marginTop: 8
}

export default function ListLabel({
  children,
  ...props
}: TextProps & { children: React.ReactNode }) {
  return (
    <Text
      {...props}
      style={{
        ...base_style
      }}
    >
      {children}
    </Text>
  )
}

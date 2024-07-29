import { ReactNode } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {
  children: ReactNode
}

export default function SafeKeyboardScrollView(props: Props) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps='handled'
    >
      {props.children}
    </KeyboardAwareScrollView>
  )
}

import { ReactNode } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {
  children: ReactNode
}

export default function SafeScrollView(props: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        {props.children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

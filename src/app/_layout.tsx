import { Slot } from 'expo-router'
import ToastProvider from '../ui/toast/ToastProvider'
import { SafeAreaView } from 'react-native'

export default function Root() {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <ToastProvider />
      <Slot />
    </SafeAreaView>
  )
}

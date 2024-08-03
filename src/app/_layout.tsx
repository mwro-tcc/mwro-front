import { Slot } from 'expo-router'
import ToastProvider from '../ui/toast/ToastProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Root() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider />
      <Slot />
    </GestureHandlerRootView>
  )
}

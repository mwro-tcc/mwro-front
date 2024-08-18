import { Slot, useRouter } from 'expo-router'
import ToastProvider from '../ui/toast/ToastProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useURL } from 'expo-linking'

export default function Root() {
  const redirectUrl = useURL()

  const router = useRouter()

  let redirectTo = redirectUrl?.split('--')[1]

  if (redirectTo !== undefined) {
    setTimeout(() => {
      router.replace(`${redirectTo}`)
      redirectTo = undefined
    }, 500)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider />
      <Slot />
    </GestureHandlerRootView>
  )
}

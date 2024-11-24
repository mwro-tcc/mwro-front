import { Slot, useRouter } from 'expo-router'
import ToastProvider from '../ui/toast/ToastProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useURL } from 'expo-linking'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Root() {
  const redirectUrl = useURL()

  const router = useRouter()

  let redirectTo = redirectUrl?.split('--')[1]

  if (redirectTo !== undefined) {
    setTimeout(() => {
      router.push(`${redirectTo}`)
      redirectTo = undefined
    }, 500)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider />
        <Slot />
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

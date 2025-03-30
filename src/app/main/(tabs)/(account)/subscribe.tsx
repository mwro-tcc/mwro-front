import { Routes } from '@api/mwro'
import Api from '@api/mwro/api'
import Toast from '@lib/toast'
import { useQuery } from '@tanstack/react-query'
import ScreenLoading from '@ui/ScreenLoading'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { WebView, WebViewNavigation } from 'react-native-webview'

function Subscribe() {
  const [checkoutUrl, setCheckoutUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  const { refetch } = useQuery({
    queryKey: ['me'],
    queryFn: () => Api.get(Routes.Auth.me).then((res) => res.data)
  })

  useEffect(() => {
    Api.post(Routes.Subscription.session)
      .then((response) => {
        setCheckoutUrl(response.data.url)
        setLoading(false)
      })
      .catch((error) => {
        Toast.error('Serviço de pagamento indisponível')
        console.error('Error creating checkout session:', error)
        router.push('..')
      })
  }, [])

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url.includes('google')) {
      refetch()
      router.push('..')
    }
  }

  if (loading) return <ScreenLoading />

  return (
    <WebView
      source={{ uri: checkoutUrl }}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState={true}
      style={{ flex: 1 }}
    />
  )
}

export default Subscribe

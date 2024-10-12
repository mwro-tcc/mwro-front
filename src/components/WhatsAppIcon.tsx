import React from 'react'
import { Alert } from 'react-native'
import * as Linking from 'expo-linking'
import IconButton from '@ui/IconButton'
import createConsoleErrorHandler from '@lib/create_console_error_handler'

type OpenWhatsappOptions = {
  phoneNumber?: string
  message: string
}

async function openWhatsApp(options: OpenWhatsappOptions): Promise<void> {
  const { phoneNumber, message } = options

  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

  const canOpenWhatsapp = await Linking.canOpenURL(url).catch(
    createConsoleErrorHandler('Erro ao abrir o WhatsApp:')
  )

  if (!canOpenWhatsapp) {
    return Alert.alert('Erro', 'O WhatsApp não está instalado no dispositivo.')
  }

  Linking.openURL(url)
}

type Props = {
  phoneNumber?: string
  message: string
}

export default function WhatsAppIcon(props: Props) {
  const { phoneNumber, message } = props

  const handleClick = () => openWhatsApp({ phoneNumber, message })

  return (
    <IconButton
      fromCommunity
      onPress={handleClick}
      icon='whatsapp'
      color='#91df6d'
    />
  )
}

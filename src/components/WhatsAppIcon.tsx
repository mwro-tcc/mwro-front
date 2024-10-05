import React from 'react'
import { Alert } from 'react-native'
import * as Linking from 'expo-linking'
import IconButton from '@ui/IconButton'

const openWhatsApp = async (
  phoneNumber: string,
  message: string
): Promise<true | void> => {
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

  return Linking.canOpenURL(url)
    .then((isSupported: boolean) => {
      switch (isSupported) {
        case true:
          return Linking.openURL(url)
        default:
          return Alert.alert(
            'Erro',
            'O WhatsApp não está instalado no dispositivo.'
          )
      }
    })
    .catch((err) => console.error('Erro ao abrir o WhatsApp:', err))
}

export default function WhatsAppIcon(options: {
  phoneNumber: string
  message: string
}) {
  const { phoneNumber, message } = options

  return (
    <IconButton
      fromCommunity
      onPress={() => openWhatsApp(phoneNumber, message)}
      icon='whatsapp'
      color='#91df6d'
    />
  )
}

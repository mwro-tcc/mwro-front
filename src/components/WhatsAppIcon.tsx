import React from 'react'
import { Alert } from 'react-native'
import * as Linking from 'expo-linking'
import IconButton from '@ui/IconButton'

type WhatsAppIconProps = {
  phoneNumber: string
}

export default function WhatsAppIcon({ phoneNumber }: WhatsAppIconProps) {
  const message =
    'Olá, gostaria de mais informações sobre os produtos da sua loja.'

  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

    Linking.canOpenURL(url)
      .then((supported: any) => {
        if (supported) {
          return Linking.openURL(url)
        } else {
          Alert.alert('Erro', 'O WhatsApp não está instalado no dispositivo.')
        }
      })
      .catch((err) => console.error('Erro ao abrir o WhatsApp:', err))
  }

  return (
    <IconButton
      fromCommunity
      onPress={openWhatsApp}
      icon='whatsapp'
      color='#91df6d'
    />
  )
}

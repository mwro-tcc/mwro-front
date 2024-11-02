import Button from '@ui/Button'
import colors from '@ui/config/colors'
import HStack from '@ui/HStack'
import Text from '@ui/Text'
import VStack from '@ui/VStack'
import React, { useState } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { Rating } from 'react-native-ratings'

type RatingModalProps = {
  visible: boolean
  onClose: () => void
  onSubmit: (rating: number) => void
  assetLabel: string
}

export const RatingModal = ({
  visible,
  onClose,
  onSubmit,
  assetLabel
}: RatingModalProps) => {
  const [rating, setRating] = useState(0)

  const handleFinishRating = (value: number) => {
    setRating(value)
  }

  const handleSubmit = () => {
    onSubmit(rating)
    onClose()
  }

  return (
    <Modal
      transparent
      animationType='fade'
      visible={visible}
      onRequestClose={onClose}
    >
      <VStack flex={1} bg={colors.overlay} justify='center' items='center'>
        <VStack
          w={280}
          bg={colors.ui_5}
          rounded={14}
          shadow={[0, 5, 10, colors.ui_10, 0.2]}
        >
          <Text
            size={18}
            weight='600'
            style={{ textAlign: 'center', paddingTop: 20 }}
          >
            Avaliação de {assetLabel}
          </Text>
          <Rating
            onFinishRating={handleFinishRating}
            style={{ paddingVertical: 23 }}
            imageSize={30}
            tintColor={colors.ui_5}
            ratingCount={5}
            startingValue={5}
          />
          <HStack
            style={{
              borderTopWidth: StyleSheet.hairlineWidth,
              borderTopColor: colors.ui_8
            }}
          >
            <Button
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingBottom: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={onClose}
            >
              <Text size={17} weight='400' color={colors.blue_8}>
                Cancelar
              </Text>
            </Button>
            <VStack bg={colors.ui_8} w={StyleSheet.hairlineWidth} />
            <Button
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingBottom: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={handleSubmit}
            >
              <Text size={17} weight='600' color={colors.blue_8}>
                Enviar
              </Text>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Modal>
  )
}

import LottieView from 'lottie-react-native'
import Button from '../ui/Button'
import Text from '../ui/Text'
import VStack from '../ui/VStack'
import { StyleSheet } from 'react-native'

type CongratsScreenProps = {
  title: string
  buttonTitle: string
  onClick: () => void
}

const styles = StyleSheet.create({
  lottie: {
    position: 'absolute',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  }
})

export const CongratsScreen = ({
  title,
  buttonTitle,
  onClick
}: CongratsScreenProps) => {
  return (
    <>
      <VStack p={20} flex={1} justify='between'>
        <VStack items='center' flex={2} gap={20} mt={'25%'}>
          <></>
        </VStack>
        <VStack flex={3} gap={30}>
          <Text size={30} weight='600' style={{ textAlign: 'center' }}>
            {title}
          </Text>
        </VStack>
        <VStack gap={10} flex={1} justify='around'>
          <Button variant='primary' onPress={onClick}>
            {buttonTitle}
          </Button>
        </VStack>
      </VStack>
      <LottieView
        source={require('../../../../assets/confetti.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
        resizeMode='cover'
      />
    </>
  )
}

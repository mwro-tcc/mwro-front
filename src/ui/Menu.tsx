import { Ellipsis } from 'lucide-react-native'
import { ReactElement, cloneElement, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import colors from './config/colors'
import HStack from './HStack'
import Text from './Text'
import VStack from './VStack'
import useBoolean from '@hooks/useBoolean'
import Show from './Show'
import { BlurView } from 'expo-blur'
import {
  parse_style_shorthands,
  StyleShorthands
} from './types/style_shorthands'

export type MenuItemProps = {
  label: string
  icon?: ReactElement
  color?: string
  onPress?: () => void
  condition?: boolean
}

type Props = Omit<StyleShorthands, 'items'> & {
  color?: string
  items?: MenuItemProps[]
  debug?: boolean
  containerStyle?: StyleShorthands
}

function MenuItem(props: MenuItemProps) {
  const icon = props.icon
    ? cloneElement(props.icon!, {
        color: props.color ?? colors.primary,
        size: 17
      })
    : null

  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation()
    props.onPress?.()
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <HStack justify='between' items='center' px={16} py={10}>
        <Text color={props.color ?? colors.ui_10} size={17}>
          {props.label}
        </Text>
        {icon}
      </HStack>
    </TouchableOpacity>
  )
}

function Menu(props: Props) {
  const { color = colors.primary, debug = false } = props

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const menuRef = useRef<View>(null)
  const scale = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current

  const calculatePosition = () => {
    if (menuRef.current) {
      menuRef.current.measure((x, y) => {
        setPosition({ x, y })
      })
    }
  }

  const {
    setFalse: hide,
    setTrue: open,
    value: isMenuVisible
  } = useBoolean(debug)

  const handleOpen = () => {
    calculatePosition()
    open()

    scale.setValue(0)
    opacity.setValue(0)

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start()
  }

  const handleHide = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(() => {
      hide()
    })
  }

  const items = props.items?.map((item, index) => {
    const handlePress = () => {
      handleHide()
      setTimeout(() => {
        item.onPress?.()
      }, 300)
    }

    const shouldRender = item.condition ?? true

    return (
      <VStack key={index}>
        {shouldRender && <MenuItem {...item} onPress={handlePress} />}
        <Show unless={index === props.items!.length - 1}>
          <HStack bg={colors.ui_7} h={StyleSheet.hairlineWidth} />
        </Show>
      </VStack>
    )
  })

  return (
    <>
      <TouchableOpacity
        onPress={handleOpen}
        style={{
          ...parse_style_shorthands(props.containerStyle ?? {})
        }}
      >
        <Ellipsis
          ref={menuRef}
          color={color}
          style={{
            backgroundColor: `${color}28`,
            borderRadius: 50,
            ...parse_style_shorthands(props)
          }}
        />
      </TouchableOpacity>
      <Modal visible={isMenuVisible} transparent onRequestClose={handleHide}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleHide}
          style={{
            flex: 1
          }}
        >
          <Animated.View
            style={{
              backgroundColor: `${colors.ui_1}a0`,
              borderRadius: 12,
              shadowColor: colors.ui_10,
              shadowOpacity: 0.2,
              shadowRadius: 32,
              shadowOffset: {
                width: 0,
                height: 0
              },
              position: 'absolute',
              top: position.y + 100,
              right: position.x + 20,
              width: 200,
              opacity,
              transformOrigin: 'top right',
              transform: [
                {
                  scale
                }
              ]
            }}
          >
            <VStack
              rounded={12}
              style={{
                overflow: 'hidden'
              }}
            >
              <BlurView intensity={50} tint='extraLight'>
                {items}
              </BlurView>
            </VStack>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

export default Menu

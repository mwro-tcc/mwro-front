import VStack from '@ui/VStack'

type TabIconProps = {
  icon: React.ReactNode
  focused: boolean
  fill: string
}

const ACTIVE_TAB_DOT_SIZE = 4

export default function TabIcon(props: TabIconProps) {
  const { icon, focused, fill } = props

  const activeDotBackground = focused ? fill : 'transparent'

  return (
    <VStack items='center' gap={3} flex={1}>
      {icon}
      <VStack
        rounded={50}
        bg={activeDotBackground}
        w={ACTIVE_TAB_DOT_SIZE}
        h={ACTIVE_TAB_DOT_SIZE}
      />
    </VStack>
  )
}

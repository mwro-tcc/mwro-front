import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import useAuth from '@hooks/useAuth'
import { CircleUserRound, Globe, Heart } from 'lucide-react-native'
import colors from '@ui/config/colors'
import VStack from '@ui/VStack'

type TabColorProperties = {
  fill: string
  stroke: string
}

enum Tab {
  EXPLORE = 'explore',
  FAVORITES = 'favorites',
  ACCOUNT = 'account'
}

const UNFOCUSED_TAB: TabColorProperties = {
  fill: 'transparent',
  stroke: colors.ui_9
}

const TAB_COLORS: Record<Tab, TabColorProperties> = {
  explore: {
    fill: 'transparent',
    stroke: '#12B8FF'
  },
  favorites: {
    fill: '#FF4E7A',
    stroke: '#FF4E7A'
  },
  account: {
    fill: 'transparent',
    stroke: '#F2D21B'
  }
}

const TAB_BAR_HEIGHT = 92
const ACTIVE_TAB_DOT_SIZE = 4

function getTabColor(tab: Tab, focused: boolean): TabColorProperties {
  return focused ? TAB_COLORS[tab] : UNFOCUSED_TAB
}

// This is a private component that should be only available on this screen

type TabIconProps = {
  icon: React.ReactNode
  focused: boolean
  fill: string
}

function TabIcon(props: TabIconProps) {
  const { icon, focused, fill } = props

  const activeDotBackground = focused ? fill : 'transparent'

  return (
    <VStack items='center' gap={3}>
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

export default function MainLayout() {
  const { token, loading } = useAuth()

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />
  if (!token) {
    return <Redirect href='/(auth)/welcome' />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          borderColor: 'transparent'
        }
      }}
    >
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explorar',
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              fill={getTabColor(Tab.EXPLORE, focused).stroke}
              focused={focused}
              icon={
                <Globe
                  size={size}
                  fill={getTabColor(Tab.EXPLORE, focused).fill}
                  stroke={getTabColor(Tab.EXPLORE, focused).stroke}
                />
              }
            />
          )
        }}
      />
      <Tabs.Screen
        name='favorites/index'
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              fill={getTabColor(Tab.FAVORITES, focused).stroke}
              focused={focused}
              icon={
                <Heart
                  size={size}
                  fill={getTabColor(Tab.FAVORITES, focused).fill}
                  stroke={getTabColor(Tab.FAVORITES, focused).stroke}
                />
              }
            />
          )
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          title: 'Conta',
          tabBarIcon: ({ size, focused }) => (
            <TabIcon
              fill={getTabColor(Tab.ACCOUNT, focused).stroke}
              focused={focused}
              icon={
                <CircleUserRound
                  size={size}
                  fill={getTabColor(Tab.ACCOUNT, focused).fill}
                  stroke={getTabColor(Tab.ACCOUNT, focused).stroke}
                />
              }
            />
          )
        }}
      />
    </Tabs>
  )
}

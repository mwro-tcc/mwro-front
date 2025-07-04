import { Redirect, Tabs } from 'expo-router'
import { ActivityIndicator, StyleSheet } from 'react-native'
import useAuth from '@hooks/useAuth'
import { CircleUserRound, Globe, Heart } from 'lucide-react-native'
import colors, { ui } from '@ui/config/colors'
import TabIcon from 'components/TabIcon'
import { parse_style_shorthands } from '@ui/types/style_shorthands'

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
  stroke: colors.ui_10
}

const TAB_COLORS: Record<Tab, TabColorProperties> = {
  explore: {
    fill: 'transparent',
    stroke: '#5185C4'
  },
  favorites: {
    fill: '#DE4439',
    stroke: '#DE4439'
  },
  account: {
    fill: 'transparent',
    stroke: '#CA8817'
  }
}

const TAB_BAR_HEIGHT = 92

function getTabColor(tab: Tab, focused: boolean): TabColorProperties {
  return focused ? TAB_COLORS[tab] : UNFOCUSED_TAB
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
        tabBarItemStyle: {
          flexDirection: 'row',
          alignItems: 'center'
        },
        tabBarStyle: {
          ...parse_style_shorthands({
            border: [StyleSheet.hairlineWidth, 'solid', ui.border]
          }),
          alignItems: 'center',
          height: TAB_BAR_HEIGHT
        }
      }}
    >
      <Tabs.Screen
        name='(explore)'
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
        name='(favorites)'
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
        name='(account)'
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

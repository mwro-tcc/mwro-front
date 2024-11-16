import HStack from '@ui/HStack'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Text from '@ui/Text'
import colors from '@ui/config/colors'

export type Tab = {
  id: string
  label: string
  icon?: string
}

type FilterHeaderProps = {
  activeTab: string
  onTabChange?: (tab: string) => void
  tabs: Tab[]
}

export default function FilterHeader({
  activeTab,
  onTabChange,
  tabs
}: FilterHeaderProps) {
  return (
    <View style={styles.container}>
      <HStack style={styles.categoryRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={
              activeTab === tab.id
                ? styles.categoriesBtnActive
                : styles.categoriesBtn
            }
            onPress={() => onTabChange?.(tab.id)}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.id ? '#000' : '#c2c2c2'}
            />
            <Text
              style={
                activeTab === tab.id
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ui_1,
    paddingTop: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10
    },
    width: '100%'
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    height: 400
  },
  locationBtn: {
    backgroundColor: colors.ui_1,
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: colors.ui_10,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  categoryText: {
    fontSize: 14,
    color: '#c2c2c2'
  },
  categoryTextActive: {
    fontSize: 14,
    color: colors.ui_10
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.ui_10,
    borderBottomWidth: 2,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  }
})

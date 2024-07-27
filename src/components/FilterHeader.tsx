import HStack from '@ui/HStack'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Text from '@ui/Text'

interface Category {
  id: number
  name: string
  icon: string
}

type FilterHeaderProps = {
  handleCategoryChange?: (category: any) => Promise<void>
  categories: Category[]
}

export default function FilterHeader({
  handleCategoryChange,
  categories
}: FilterHeaderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSelectCategory = (index: number) => {
    setActiveIndex(index)
    if (handleCategoryChange) handleCategoryChange(categories[index].name)
  }

  return (
    <View style={styles.container}>
      <HStack style={styles.categoryRow}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={
              activeIndex === index
                ? styles.categoriesBtnActive
                : styles.categoriesBtn
            }
            onPress={() => handleSelectCategory(index)}
          >
            <MaterialCommunityIcons
              name={category.icon as any}
              size={24}
              color={activeIndex === index ? '#000' : '#c2c2c2'}
            />
            <Text
              style={
                activeIndex === index
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
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
    color: '#000'
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
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  }
})

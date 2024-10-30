import { useRef } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { priceFormatter } from 'utils'
import HStack from '@ui/HStack'
import FavoriteIcon from './FavoriteIcon'
import colors from '@ui/config/colors'
import AppleStyleSwipeableRow, { Action } from '../ui/SwipeableRow'

type AssetListProps = {
  imageStyle?: any
  favoritable?: boolean
  data: AssetType[]
  swipeActions?: (item: any) => Action[]
  onAfterClick?: () => void
}

export type AssetType = {
  id: string
  title: string
  description: string
  image?: string
  rating?: number
  isFavorite?: boolean
  price?: number
  onPress?: () => void
}

export default function AssetList({
  imageStyle,
  favoritable,
  data,
  swipeActions = () => [],
  onAfterClick
}: Readonly<AssetListProps>) {
  const listRef = useRef<FlatList>(null)

  const renderRow = ({ item }: any) => {
    return (
      <AppleStyleSwipeableRow actions={swipeActions(item)}>
        <TouchableOpacity onPress={item.onPress} style={styles.listItem}>
          <View style={styles.imageAndInfo}>
            <Image
              source={{
                uri:
                  item.image ??
                  'https://www.proclinic-products.com/build/static/default-product.30484205.png'
              }}
              resizeMode='cover'
              style={imageStyle}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              {item?.price && <Text>{priceFormatter(item.price)} </Text>}
              <View style={styles.ratingAndDescription}>
                {item?.rating > 0 && (
                  <Text style={styles.rating}>⭐ {item.rating} </Text>
                )}
                {item?.rating === 0 && (
                  <Text style={styles.rating}>Novidade!</Text>
                )}
                {item?.description && (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={styles.description}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            </View>
          </View>
          {favoritable && (
            <View style={styles.favoriteIcon}>
              <FavoriteIcon asset={item} onAfterClick={onAfterClick} />
            </View>
          )}
        </TouchableOpacity>
      </AppleStyleSwipeableRow>
    )
  }

  return (
    <FlatList
      renderItem={renderRow}
      scrollEnabled={false}
      ItemSeparatorComponent={() => (
        <HStack border={[0.5, 'solid', colors.ui_3]} />
      )}
      contentContainerStyle={{
        backgroundColor: colors.ui_1,
        borderRadius: 8,
        display: 'flex'
      }}
      ref={listRef}
      data={data}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    />
  )
}

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 83,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23
  },
  imageAndInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 17,
    alignItems: 'center'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  ratingAndDescription: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },

  title: {
    fontWeight: 'bold',
    color: colors.ui_8
  },
  rating: {
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.yellow_6
  },
  description: {
    color: colors.ui_6,
    fontSize: 13,
    width: 141
  },
  favoriteIcon: {
    marginBottom: 20
  }
})

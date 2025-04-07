import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { priceFormatter } from 'utils'
import HStack from '@ui/HStack'
import FavoriteIcon from './FavoriteIcon'
import colors, { ui } from '@ui/config/colors'
import AppleStyleSwipeableRow, { Action } from '../ui/SwipeableRow'
import { Routes } from '@api/mwro'
import Image from '@ui/Image'
import rounded from '@ui/config/rounded'
import { parse_style_shorthands } from '@ui/types/style_shorthands'

type Props = Readonly<{
  favoritable?: boolean
  data?: AssetType[] | null
  swipeActions?: (item: any) => Action[]
  onAfterClick?: () => void
  refreshing?: boolean
  onRefresh?: () => void
}>

export type AssetType = {
  uuid: string
  name: string
  description: string
  image?: string
  averageScore?: number
  isFavorite?: boolean
  price?: number
  onPress?: () => void
}

function AssetList(props: Props) {
  const {
    favoritable,
    data,
    swipeActions = () => [],
    onAfterClick,
    refreshing = false,
    onRefresh
  } = props

  if (!data || data.length === 0) return null

  const renderRow = ({ item }: any) => {
    return (
      <AppleStyleSwipeableRow actions={swipeActions(item)}>
        <TouchableOpacity
          onPress={item.onPress}
          style={styles.listItem}
          disabled={!item.onPress}
        >
          <View style={styles.imageAndInfo}>
            <Image
              src={Routes.Image.src(item.uuid)}
              hasAuthenticationHeaders
              w={63}
              h={63}
              rounded={rounded.sm}
              bg={ui.bg}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              {item?.price && <Text>{priceFormatter(item.price)} </Text>}
              <View style={styles.scoreAndDescription}>
                {item?.averageScore > 0 && (
                  <Text style={styles.averageScore}>
                    ⭐ {item.averageScore}
                  </Text>
                )}
                {item?.averageScore === null && (
                  <Text style={styles.averageScore}>Novidade!</Text>
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
      keyboardDismissMode='on-drag'
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      renderItem={renderRow}
      ItemSeparatorComponent={() => (
        <HStack
          border={[StyleSheet.hairlineWidth, 'solid', `${ui.border}c0`]}
        />
      )}
      contentContainerStyle={{
        ...parse_style_shorthands({
          border: [StyleSheet.hairlineWidth, 'solid', ui.border]
        }),
        margin: 10,
        backgroundColor: colors.ui_1,
        borderRadius: rounded.sm,
        display: 'flex'
      }}
      data={data ?? []}
      keyExtractor={(item) => item.uuid}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1
      }}
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
    paddingHorizontal: 13
  },
  imageAndInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 17,
    alignItems: 'center'
  },
  image: {
    width: 59,
    height: 59,
    borderRadius: 4
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  scoreAndDescription: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  title: {
    fontWeight: 'bold',
    color: colors.ui_9,
    alignItems: 'center'
  },
  averageScore: {
    fontWeight: 'bold',
    fontSize: 13,
    color: ui.yellow
  },
  description: {
    color: colors.ui_7,
    fontSize: 13,
    width: 160
  },
  favoriteIcon: {
    marginBottom: 20
  }
})

export default AssetList

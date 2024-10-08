import { Link } from 'expo-router'
import { useRef } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import VStack from '../ui/VStack'
import Text from '../ui/Text'
import useCollection from '@hooks/useCollection'
import { priceFormatter } from 'utils'
import colors from '@ui/config/colors'

type ListProps = {
  numOfColumns: number
  url: string
  route?: string
  getItemRoute?: (item: any) => {
    pathname: string
    params?: Record<string, string>
  }
}

export default function List({
  route,
  numOfColumns,
  url,
  getItemRoute = undefined
}: ListProps) {
  const listRef = useRef<FlatList>(null)

  const { data, refreshing, loading, handleRefresh } = useCollection<any>({
    url: url
  })

  const renderRow = ({ item }: any) => {
    return (
      <Link
        href={
          getItemRoute?.(item) ?? {
            pathname: `/${route}/${item.uuid}`
          }
        }
        asChild
      >
        <TouchableOpacity style={styles.listing}>
          <Image
            source={{
              uri:
                item.image ??
                'https://www.proclinic-products.com/build/static/default-product.30484205.png'
            }}
            resizeMode='cover'
            style={styles.image}
          />
          <VStack ml={5}>
            <Text weight='600'>{item.name}</Text>
            {item?.price && <Text>{priceFormatter(item.price)} </Text>}
          </VStack>
        </TouchableOpacity>
      </Link>
    )
  }

  return (
    <VStack flex={1}>
      {loading ? (
        <ActivityIndicator size='large' style={{ marginTop: '60%' }} />
      ) : (
        <FlatList
          renderItem={renderRow}
          ref={listRef}
          data={data}
          keyExtractor={(item) => item.uuid}
          numColumns={numOfColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
            paddingHorizontal: 10
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={{ flex: 1 }}
        />
      )}
    </VStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listing: {
    width: '48%',
    height: 240,
    marginBottom: 10,
    gap: 10,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: 'lightgrey',
    backgroundColor: colors.ui_1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2
  },
  image: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  lottie: {
    marginTop: 500
  }
})

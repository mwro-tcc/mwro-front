import { Link } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import VStack from './VStack'
import Text from './Text'
import useCollection from '@hooks/useCollection'
import { priceFormatter } from 'utils'

type ListProps = {
  itemCategory: string
  numOfColumns: number
  url: string
}

export default function List({ itemCategory, numOfColumns, url }: ListProps) {
  const listRef = useRef<FlatList>(null)

  const { data, loading, error, handleRefresh } = useCollection<any>({
    url: url
  })

  const renderRow = ({ item }: any) => {
    return (
      <Link
        href={{
          pathname: `/${itemCategory}/${item.uuid}`
        }}
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
            <Text>{priceFormatter(item.price)} </Text>
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
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
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

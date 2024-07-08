import { Link } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import VStack from './VStack'
import Text from './Text'

type ListProps = {
  listing: any
  itemCategory: string
  numOfColumns: number
}

export default function List({
  listing,
  itemCategory,
  numOfColumns
}: ListProps) {
  const [loading, setLoading] = useState(false)

  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      // TODO: Backend call
      setLoading(false)
    }, 200)
  }, [itemCategory])

  const renderRow = ({ item }: any) => {
    return (
      <Link href={'/(main)'} asChild>
        <TouchableOpacity style={styles.listing}>
          <Image
            source={{ uri: item.image }}
            resizeMode='cover'
            style={styles.image}
          />
          <VStack ml={5}>
            <Text weight='600'>{item.title}</Text>
            <Text>{item.price}</Text>
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
          data={listing}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numOfColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
            paddingHorizontal: 10
          }}
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
    borderTopLeftRadius: 10, // TODO
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  lottie: {
    marginTop: 500
  }
})
